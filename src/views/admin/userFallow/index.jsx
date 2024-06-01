import DevelopmentTable from "./components/DevelopmentTable";
import PieChartCard from "./components/PieChartCard";
import { useEffect, useState } from "react";
import TotalSpent from "./components/TotalSpent";
import { appAxios } from "helper/appAxios";

const Tables = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedClientName, setSelectedClientName] = useState(null);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

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

  const changeUserSelect = (event) => {
    setSelectedClient(event.target.value);
    const selectedUser = users.find(
      (u) => u.user_id === parseInt(event.target.value)
    );
    setUser(selectedUser);
    setSelectedClientName(selectedUser.ad + " " + selectedUser.soyad);
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
              <DevelopmentTable selectedClient={selectedClient} />
            </div>
            <div className="mt-5 grid h-full grid-cols-3 gap-5">
              <PieChartCard selectedClient={selectedClient} />
              <div className="col-span-2">
                <TotalSpent selectedClient={selectedClient} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tables;
