import React, { useState } from "react";
import Card from "components/card";

const BodyMassIndex = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(160);

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Düşük Kilo";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal Kilo";
    if (bmi >= 25 && bmi < 29.9) return "Fazla Kilo";
    return "Obezite";
  };

  const bmi = calculateBMI(weight, height);
  const category = getBMICategory(bmi);

  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Vücut Kitle İndeksi
          </h4>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-4">
        <div className="w-full px-4">
          <label className="block text-center text-lg font-semibold">
            Kilo (kg): {weight}
          </label>
          <input
            type="range"
            min="40"
            max="150"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="mt-2 w-full"
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
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="mt-2 w-full"
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
