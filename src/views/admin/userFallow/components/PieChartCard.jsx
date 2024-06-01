import React, { useEffect, useState } from "react";
import PieChart from "components/charts/PieChart";
import { pieChartOptions } from "variables/charts";
import Card from "components/card";

const PieChartCard = ({ user }) => {
  const series = [20, 80];

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
