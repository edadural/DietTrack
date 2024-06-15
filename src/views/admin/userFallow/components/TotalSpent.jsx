import React from "react";
import Card from "components/card";
import { lineChartOptionsTotalSpent } from "variables/charts";
import LineChart from "components/charts/LineChart";

const TotalSpent = ({ table }) => {
  // console.log("sele111", table);

  const lineChartDataTotalSpent = [
    {
      name: "Kilo",
      data: table.map((item) => item.agirlik),
      color: "#4318FF",
    },
    {
      name: "Yağ",
      data: table.map((item) => item.yag),
      color: "#6AD2FF",
    },
    {
      name: "Sıvı",
      data: table.map((item) => item.sivi),
      color: "#EDAEDA",
    },
    {
      name: "Yağsız",
      data: table.map((item) => item.yagsiz),
      color: "#CCCCCC",
    },
  ];

  const weekCount = table.length;

  const categories = Array.from(
    { length: weekCount },
    (_, i) => `${i + 1}.hafta`
  );

  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex pb-10 h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap">
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
