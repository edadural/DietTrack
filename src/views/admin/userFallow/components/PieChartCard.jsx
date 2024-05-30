import React, { useEffect, useState } from "react";
import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import Card from "components/card";

const PieChartCard = ({ selectedClient }) => {
  const [selectedOption, setSelectedOption] = useState("weekly");

  useEffect(() => {
    // Danışan seçimine göre bir işlem yapılabilir, örneğin API'den veri alınabilir.
    // Bu örnekte sabit veriler kullanıldığı için herhangi bir değişiklik yapmıyoruz.
  }, [selectedClient]);

  return (
    <>
      {selectedClient && (
        <Card extra="rounded-[20px] p-3">
          <div className="flex flex-row justify-between px-3 pt-2">
            <div>
              <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                Haftalık Tamamlama
              </h4>
            </div>

            <div className="mb-6 flex items-center justify-center">
              <select
                className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>

          <div className="mb-auto flex h-[220px] w-full items-center justify-center">
            {/* Burada danışan seçimi ve seçilen seçeneklere göre PieChart bileşenini güncelleyebilirsiniz */}
            {/* Örneğin, pieChartOptions ve pieChartData state'lerini değiştirebilirsiniz */}
            <PieChart options={pieChartOptions} series={pieChartData} />
          </div>
        </Card>
      )}
    </>
  );
};

export default PieChartCard;
