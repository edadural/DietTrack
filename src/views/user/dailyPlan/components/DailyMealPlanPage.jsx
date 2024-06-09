import React, { useState, useEffect, useRef } from "react";

const DailyMealPlanPage = ({
  beslenmes,
  weeklyMealPlan,
  setWeeklyMealPlan,
  Guncelle,
}) => {
  const [compliance, setCompliance] = useState(
    Array(7)
      .fill()
      .map(() => ({
        kahvalti: false,
        ogle: false,
        aksam: false,
        atistirma: false,
      }))
  );

  useEffect(() => {
    if (beslenmes !== null) {
      const sortedBeslenmes = beslenmes.sort(
        (a, b) => new Date(a.tarih) - new Date(b.tarih)
      );
      const newMealPlan = sortedBeslenmes.map((beslenme) => ({
        beslenme_id: beslenme.id,
        tarih: beslenme.tarih,
        kahvalti: beslenme.kahvalti,
        ogle: beslenme.ogle,
        aksam: beslenme.aksam,
        atistirma: beslenme.atistirma,
        kahvalti_tik: beslenme.kahvalti_tik,
        ogle_tik: beslenme.ogle_tik,
        aksam_tik: beslenme.aksam_tik,
        atistirma_tik: beslenme.atistirma_tik,
      }));
      setWeeklyMealPlan(newMealPlan);

      const newCompliance = sortedBeslenmes.map((beslenme) => ({
        kahvalti: beslenme.kahvalti_tik,
        ogle: beslenme.ogle_tik,
        aksam: beslenme.aksam_tik,
        atistirma: beslenme.atistirma_tik,
      }));
      setCompliance(newCompliance);
    }
  }, [beslenmes, setWeeklyMealPlan]);

  const handleComplianceChange = (dayIndex, mealType) => {
    const updatedCompliance = compliance.map((day, index) => {
      if (index === dayIndex) {
        return { ...day, [mealType]: !day[mealType] };
      }
      return day;
    });
    setCompliance(updatedCompliance);

    const updatedWeeklyMealPlan = weeklyMealPlan.map((day, index) => {
      if (index === dayIndex) {
        return { ...day, [`${mealType}_tik`]: !day[`${mealType}_tik`] };
      }
      return day;
    });
    setWeeklyMealPlan(updatedWeeklyMealPlan);
  };

  const calculateProgress = () => {
    const totalMeals = 7 * 4;
    const followedMeals = compliance.reduce((count, day) => {
      return count + Object.values(day).filter(Boolean).length;
    }, 0);
    return Math.round((followedMeals / totalMeals) * 100);
  };

  const daysOfWeek = [
    "1. Gün",
    "2. Gün",
    "3. Gün",
    "4. Gün",
    "5. Gün",
    "6. Gün",
    "7. Gün",
  ];

  const mealTypes = [
    { key: "kahvalti", label: "Kahvaltı" },
    { key: "ogle", label: "Öğlen" },
    { key: "aksam", label: "Akşam" },
    { key: "atistirma", label: "Atıştırmalık" },
  ];

  const handleSaveMealPlan = () => {
    Guncelle(weeklyMealPlan);
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Haftalık Beslenme Planı</h1>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="mb-2 text-xl font-semibold">
            Haftalık Beslenme Planınız
          </h2>
          <button
            onClick={handleSaveMealPlan}
            className="rounded-lg bg-navy-600 p-2 font-bold text-white transition duration-200 hover:cursor-pointer hover:bg-navy-400 dark:bg-navy-600 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 md:text-xl"
          >
            Kaydet
          </button>
        </div>
        <div className="overflow-x-auto">
          {weeklyMealPlan.length === 7 ? (
            <table className="w-full table-auto bg-gray-50">
              <thead>
                <tr>
                  <th className="border px-4 py-2"></th>
                  {daysOfWeek.map((day, index) => (
                    <th key={index} className="border px-4 py-2">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mealTypes.map((mealType) => (
                  <tr key={mealType.key}>
                    <td className="border px-4 py-2 font-semibold">
                      {mealType.label}
                    </td>
                    {weeklyMealPlan.map((day, index) => (
                      <td key={index} className="border px-4 py-2">
                        <div className="flex items-center">
                          <MealInput value={day[mealType.key]} />
                          <input
                            type="checkbox"
                            checked={compliance[index][mealType.key]}
                            onChange={() =>
                              handleComplianceChange(index, mealType.key)
                            }
                            className="ml-2"
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "Yeni Planınız için lütfen hekiminize danışınız."
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Tamamlama: {calculateProgress()}%
          </h3>
        </div>
      </div>
    </div>
  );
};

const MealInput = ({ value }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      readOnly
      disabled
      className="w-full resize-none overflow-hidden rounded-md border border-gray-300 bg-gray-100 px-2 py-1"
      style={{ height: "auto" }}
      rows={1}
    />
  );
};

export default DailyMealPlanPage;
