import React, { useEffect, useState } from "react";
import DevelopmentTable from "./components/DevelopmentTable";
import PieChartCard from "./components/PieChartCard";
import TotalSpent from "./components/TotalSpent";
import { appAxios } from "helper/appAxios";
import { showLoad, swalClose } from "helper/swal";

const Tables = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [beslenmes, setBeslenmes] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [table, setTable] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    appAxios
      .post("user/user-get", {})
      .then((response) => {
        if (response.data.status) {
          setUsers(response.data.data);
        } else {
          setError("Kullanıcı verileri alınamadı.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Kullanıcı verileri alınamadı.");
      });
  }, []);

  useEffect(() => {
    if (selectedClient) {
      appAxios
        .post("home/home-get", { user_id: selectedClient })
        .then((response) => {
          if (response.data.status) {
            setTable(response.data.data);
          } else {
            setError("Tablo verileri alınamadı.");
          }
        })
        .catch((err) => {
          console.error(err);
          setError("Tablo verileri alınamadı.");
        });
    }
  }, [selectedClient]);

  useEffect(() => {
    if (selectedClient) {
      appAxios
        .post("beslenme/beslenme-get", { user_id: selectedClient })
        .then((response) => {
          if (response.data.status) {
            setBeslenmes(response.data.data);
          } else {
            setError("Beslenme verileri alınamadı.");
          }
        })
        .catch((err) => {
          console.error(err);
          setError("Beslenme verileri alınamadı.");
        });
    }
  }, [selectedClient]);

  const Ekle = (measurement) => {
    showLoad();
    appAxios
      .post("home/home-add", {
        user_id: selectedClient,
        ...measurement,
      })
      .then((response) => {
        if (response.data.status) {
          setTable(response.data.data);
          swalClose();
        } else {
          setError("Veri eklenemedi.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Veri eklenemedi.");
        swalClose();
      });
  };

  const changeUserSelect = (event) => {
    const selectedUserId = parseInt(event.target.value);
    setSelectedClient(selectedUserId);
    const selectedUser = users.find((u) => u.user_id === selectedUserId);
    setUser(selectedUser);
  };

  return (
    <div className="mt-4">
      <h1 className="text-3xl font-bold dark:text-white">Danışan Takip</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-3">
        <label
          htmlFor="clientSelect"
          className="block p-1 font-semibold dark:text-white"
        >
          Danışan Seç:
        </label>
        <select
          id="clientSelect"
          placeholder="Danışan Seç"
          onChange={changeUserSelect}
          className="rounded-md border border-gray-300 p-2"
          value={selectedClient || ""}
        >
          <option value="" disabled>
            Danışan Seç
          </option>
          {users.length > 0 &&
            users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.ad} {user.soyad}
              </option>
            ))}
        </select>
      </div>
      {selectedClient && (
        <div className="dark:!bg-navy-900 dark:text-white">
          <div className="mt-5 grid h-full grid-cols-1">
            <DevelopmentTable
              selectedClient={selectedClient}
              table={table}
              Ekle={Ekle}
            />
          </div>
          <div className="mt-5 grid h-full gap-5 md:grid-cols-3">
            <PieChartCard user={user} beslenmes={beslenmes} />
            <div className="md:col-span-2">
              <TotalSpent selectedClient={selectedClient} table={table} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;
