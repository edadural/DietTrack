import React, { useState, useEffect } from "react";
import AddMeasurementModal from "./AddMeasurementModal";

const DevelopmentTable = ({ selectedClient, table, Ekle }) => {
  const [clientData, setClientData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedClient && Array.isArray(table)) {
      const formattedData = table.map((item) => ({
        ...item,
        tarih: new Date(item.olcum_tarihi).toLocaleDateString(),
      }));

      const sortedData = formattedData.sort(
        (a, b) => new Date(a.olcum_tarihi) - new Date(b.olcum_tarihi)
      );

      setClientData(sortedData);
    } else {
      setClientData([]);
    }
  }, [selectedClient, table]);

  const handleClick = () => {
    setShowModal(true);
  };

  const tableHeaders = [
    { key: "tarih", label: "Ölçüm Tarihi" },
    { key: "agirlik", label: "Ağırlık" },
    { key: "yag", label: "Yağ" },
    { key: "yagfark", label: "Yağ Fark" },
    { key: "yagsiz", label: "Yağsız" },
    { key: "yagsizfark", label: "Yağsız Fark" },
    { key: "sivi", label: "Sıvı" },
    { key: "sivifark", label: "Sıvı Fark" },
  ];

  return (
    <div>
      <div className="rounded-2xl bg-white p-4 dark:!bg-navy-800 dark:text-white">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Genel Bilgiler</h2>
          <button
            className="rounded-lg bg-navy-600 p-2 px-5 font-bold text-white transition duration-200 hover:cursor-pointer hover:bg-navy-400 dark:bg-navy-600 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 md:text-lg"
            onClick={handleClick}
          >
            Ekle
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200 dark:!bg-navy-900 dark:text-white">
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  className="border border-gray-400 px-4 py-2"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clientData.length > 0 ? (
              clientData.map((item, index) => (
                <tr key={index}>
                  {tableHeaders.map((header) => (
                    <td
                      key={header.key}
                      className="border border-gray-400 px-4 py-2 text-center"
                    >
                      {item[header.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={tableHeaders.length}
                  className="border border-gray-400 px-4 py-2 text-center"
                >
                  Veri yok
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AddMeasurementModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={Ekle}
      />
    </div>
  );
};

export default DevelopmentTable;
