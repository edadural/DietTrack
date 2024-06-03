import React from "react";
import PieChart from "components/charts/PieChart";
import { pieChartOptions } from "variables/charts";
import Card from "components/card";

const PieChartCard = ({ beslenmes }) => {
  console.log("beslenmes", beslenmes);
  const completionPercentage = calculateCompletionPercentage(beslenmes);
  const series = [
    parseInt(completionPercentage),
    100 - parseInt(completionPercentage),
  ];
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 py-2">
        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
          Haftalık Tamamlama
        </h4>
      </div>

      <div className="m-auto flex h-[220px] w-full items-center justify-center">
        <PieChart options={pieChartOptions} series={series} />
      </div>
    </Card>
  );
};

export default PieChartCard;

const calculateCompletionPercentage = (beslenmes) => {
  if (!beslenmes) {
    return 0;
  }
  let totalTrueTikCount = 0;
  let totalNullTikCount = 0;
  const lastSevenDays = beslenmes.slice(-7);
  console.log("son7", beslenmes.slice(-7));

  lastSevenDays?.forEach((beslenme) => {
    totalTrueTikCount += Object.values(beslenme).filter(
      (value) => value === true
    ).length;

    totalNullTikCount += Object.values(beslenme).filter(
      (value) => value === false
    ).length;
  });

  const totalTikCount = totalTrueTikCount + totalNullTikCount;
  const completionPercentage =
    (totalTrueTikCount / totalTikCount) * 100 > 0
      ? (totalTrueTikCount / totalTikCount) * 100
      : 0;

  console.log(
    "true:",
    totalTrueTikCount,
    "null:",
    totalNullTikCount,
    "%:",
    completionPercentage.toFixed()
  );

  return completionPercentage.toFixed();
};
