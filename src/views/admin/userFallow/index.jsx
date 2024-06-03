import React, { useEffect, useState } from "react";
import DevelopmentTable from "./components/DevelopmentTable";
import PieChartCard from "./components/PieChartCard";
import TotalSpent from "./components/TotalSpent";
import { appAxios } from "helper/appAxios";
import { showLoad } from "helper/swal";
import { swalClose } from "helper/swal";

const Tables = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [beslenmes, setBeslenmes] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [table, setTable] = useState([]);

  useEffect(() => {
    appAxios
      .post("user/user-get", {})
      .then(async (response) => {
        if (response.data.status) {
          setUsers(response.data.data);
        }
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (selectedClient) {
      appAxios
        .post("home/home-get", { user_id: selectedClient })
        .then(async (response) => {
          if (response.data.status) {
            setTable(response.data.data);
          }
        })
        .catch((err) => {});
    }
  }, [selectedClient]);

  useEffect(() => {
    appAxios
      .post("beslenme/beslenme-get", { user_id: selectedClient })
      .then((response) => {
        if (response.data.status) {
          setBeslenmes(response.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedClient]);

  const Ekle = (measurement) => {
    showLoad();
    appAxios
      .post("home/home-add", {
        user_id: selectedClient,
        ...measurement,
      })
      .then(async (response) => {
        if (response.data.status) {
          console.log(response.data.data);
          setTable(response.data.data);
          swalClose();
        }
      })
      .catch((err) => {});
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
          {users.map((user) => (
            <option key={user.user_id} value={user.user_id}>
              {user.ad} {user.soyad}
            </option>
          ))}
        </select>
      </div>
      <div className="dark:!bg-navy-900 dark:text-white">
        {selectedClient && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Tables;
