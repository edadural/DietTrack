import React, { useEffect } from "react";
import { MdOutlineCalendarToday } from "react-icons/md";
import Card from "components/card";
import { lineChartOptionsTotalSpent } from "variables/charts";
import LineChart from "components/charts/LineChart";

const TotalSpent = ({ selectedClient, table }) => {
  // console.log("sele111", table);

  const lineChartDataTotalSpent = [
    {
      name: "Kilo",
      data: table.map((item) => item.agirlik), // Ağırlık verilerini kullan
      color: "#4318FF",
    },
    {
      name: "Yağ Kaybı",
      data: table.map((item) => item.yag), // Yağ verilerini kullan
      color: "#6AD2FF",
    },
    {
      name: "Sıvı Kaybı",
      data: table.map((item) => item.sivi), // Sıvı verilerini kullan
      color: "#EDAEDA",
    },
  ];

  // Tablodaki hafta sayısını al
  const weekCount = table.length;

  // Hafta sayısına göre categories dizisini oluştur
  const categories = Array.from(
    { length: weekCount },
    (_, i) => `${i + 1}.hafta`
  );

  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="h-full w-full">
          <LineChart
            options={{
              ...lineChartOptionsTotalSpent,
              xaxis: { ...lineChartOptionsTotalSpent.xaxis, categories },
            }}
            series={lineChartDataTotalSpent}
          />
        </div>
      </div>
    </Card>
  );
};

export default TotalSpent;
