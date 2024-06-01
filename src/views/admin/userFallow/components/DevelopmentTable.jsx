import React, { useState, useEffect } from "react";

const DevelopmentTable = ({ selectedClient }) => {
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const weeklyData = [
      {
        date: "2.05.2024",
        agirlik: "77,1",
        yag: "2",
        yagsiz: "1",
        sivi: "0,3",
      },
      {
        date: "12.05.2024",
        agirlik: "77,2",
        yag: "1.5",
        yagsiz: "1",
        sivi: "0,3",
      },
      {
        date: "2.05.2024",
        agirlik: "77,3",
        yag: "3",
        yagsiz: "1",
        sivi: "0,3",
      },
    ];

    setClientData(selectedClient ? weeklyData : null);
  }, [selectedClient]);

  return (
    clientData && (
      <div className="rounded-2xl bg-white p-4 dark:!bg-navy-800 dark:text-white">
        <h2 className="mb-2 text-xl font-semibold">Genel Bilgiler</h2>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200 dark:!bg-navy-900 dark:text-white">
              <th className="border border-gray-400 px-4 py-2">Ölçüm Tarihi</th>
              <th className="border border-gray-400 px-4 py-2">Ağırlık</th>
              <th className="border border-gray-400 px-4 py-2">Yağ</th>
              <th className="border border-gray-400 px-4 py-2">Yağsız</th>
              <th className="border border-gray-400 px-4 py-2">Sıvı</th>
            </tr>
          </thead>
          <tbody>
            {clientData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {item.date}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {item.agirlik}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {item.yag}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {item.yagsiz}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {item.sivi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default DevelopmentTable;
