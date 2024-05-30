import DevelopmentTable from "./components/DevelopmentTable";
import PieChartCard from "./components/PieChartCard";
import { useState } from "react";
import TotalSpent from "./components/TotalSpent";

const Tables = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const clients = [
    { id: 1, name: 'Danışan 1' },
    { id: 2, name: 'Danışan 2' }
  ];

  const handleClientSelect = (clientId) => {
    setSelectedClient(clientId);
  };

  return (
    <div className="mt-4">
      <h1 className="text-3xl font-bold dark:text-white">Danışan Takip</h1>
      <div className="mb-3">
        <label htmlFor="clientSelect" className="block p-1 dark:text-white font-semibold">Danışan Seç:</label>
        <select
          id="clientSelect"
          onChange={(e) => handleClientSelect(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          value={selectedClient || ""}
        >
          <option value="">Danışan Seçiniz</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
      </div>
      <div className="dark:!bg-navy-900 dark:text-white">
        {selectedClient && (
          <>
            <div className="mt-5 grid h-full grid-cols-1">
              <DevelopmentTable
                selectedClient={selectedClient}
              />
            </div>
            <div className="mt-5 gap-5 grid h-full grid-cols-3">
              <PieChartCard
                selectedClient={selectedClient}
              />
              <div className="col-span-2">
                <TotalSpent
                  selectedClient={selectedClient}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tables;
