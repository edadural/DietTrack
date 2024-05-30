import React, { useEffect } from "react";
import {
  MdOutlineCalendarToday,
} from "react-icons/md";
import Card from "components/card";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";
import LineChart from "components/charts/LineChart";

const TotalSpent = ({ selectedClient }) => {

  useEffect(() => {
    // Danışan seçimine göre bir işlem yapılabilir, örneğin API'den veri alınabilir.
    // Bu örnekte sabit veriler kullanıldığı için herhangi bir değişiklik yapmıyoruz.
  }, [selectedClient]);

  return (
    <>
      {selectedClient && (
        <Card extra="!p-[20px] text-center">
          <div className="flex justify-between">
            <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
              <MdOutlineCalendarToday />
              <span className="text-sm font-medium text-gray-600">Takip</span>
            </button>
          </div>

          <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
            <div className="h-full w-full">
              <LineChart
                options={lineChartOptionsTotalSpent}
                series={lineChartDataTotalSpent}
              />
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default TotalSpent;
