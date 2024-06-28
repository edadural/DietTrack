import React, { useState } from "react";
import Card from "components/card";

const BodyMassIndex = ({ tableDataDevelopment }) => {
  const [height, setHeight] = useState(160);

  const latestWeight =
    tableDataDevelopment[tableDataDevelopment.length - 1]?.agirlik || 0;

  const calculateBMI = (latestWeight, height) => {
    const heightInMeters = height / 100;
    const bmi = latestWeight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Düşük Kilo";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal Kilo";
    if (bmi >= 25 && bmi < 29.9) return "Fazla Kilo";
    return "Obezite";
  };

  const bmi = calculateBMI(latestWeight, height);
  const category = getBMICategory(bmi);
console.log(latestWeight);
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="px-3 py-2 text-center">
        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
          Vücut Kitle İndeksi
        </h4>
      </div>

      <div className="flex flex-col items-center justify-center py-4">
        <div className="w-full px-4">
          <label className="block text-center text-lg font-semibold">
            Kilo (kg): {latestWeight}
          </label>
          <input
            type="range"
            min="40"
            max="150"
            step={0.1}
            className="mt-2 w-full"
            value={85.5}
            onChange={()=>{}}
          />
        </div>
        <div className="mt-4 w-full px-4">
          <label className="block text-center text-lg font-semibold">
            Boy (cm): {height}
          </label>
          <input
            type="range"
            min="140"
            max="220"
            className="mt-2 w-full"
            defaultValue={height}
          />
        </div>
        <div className="mt-6 text-center">
          <h4 className="text-xl font-semibold text-navy-700 dark:text-white">
            VKI: {bmi}
          </h4>
          <h5 className="text-lg font-normal text-gray-600 dark:text-white">
            {category}
          </h5>
        </div>
      </div>
    </Card>
  );
};

export default BodyMassIndex;
