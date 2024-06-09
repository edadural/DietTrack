import React, { useState, useEffect, useRef } from "react";
import { addDays, format } from "date-fns";

const DailyMealPlanPage = ({
  users,
  setUser,
  beslenmes,
  weeklyMealPlan,
  setWeeklyMealPlan,
  Ekle,
  Guncelle,
}) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedClientName, setSelectedClientName] = useState(null);

  const changeUserSelect = (event) => {
    setSelectedClient(event.target.value);
    const selectedUser = users.find(
      (u) => u.user_id === parseInt(event.target.value)
    );
    setUser(selectedUser);
    setSelectedClientName(selectedUser.ad + " " + selectedUser.soyad);
  };

  useEffect(() => {
    if (beslenmes) {
      const newMealPlan = beslenmes.map((beslenme) => ({
        beslenme_id: beslenme.id,
        tarih: beslenme.tarih,
        kahvalti: beslenme.kahvalti,
        ogle: beslenme.ogle,
        aksam: beslenme.aksam,
        atistirma: beslenme.atistirma,
      }));
      if (newMealPlan?.length > 0) {
        setWeeklyMealPlan(newMealPlan);
      } else {
        const date = new Date();
        setWeeklyMealPlan(
          Array(7)
            .fill()
            .map((_, index) => ({
              tarih: format(addDays(date, index), "yyyy.MM.dd 00:00:00"),
              kahvalti: "",
              ogle: "",
              aksam: "",
              atistirma: "",
            }))
        );
      }
    } else {
      const date = new Date();
      setWeeklyMealPlan(
        Array(7)
          .fill()
          .map((_, index) => ({
            tarih: format(addDays(date, index), "yyyy.MM.dd 00:00:00"),
            kahvalti: "",
            ogle: "",
            aksam: "",
            atistirma: "",
          }))
      );
    }
  }, [beslenmes]);

  const handleMealChange = (dayIndex, mealType, e) => {
    const updatedWeeklyMealPlan = weeklyMealPlan.map((day, index) => {
      if (index === dayIndex) {
        return { ...day, [mealType]: e.target.value };
      }
      return day;
    });
    setWeeklyMealPlan(updatedWeeklyMealPlan);
  };

  const handleSaveMealPlan = () => {
    const aa = weeklyMealPlan.filter((el) => el.beslenme_id);
    if (aa.length > 0) {
      Guncelle();
    } else {
      Ekle();
    }
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

  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold ">
        Haftalık Beslenme Programı Oluştur
      </h1>
      <div className="mb-3">
        <label htmlFor="clientSelect" className="block p-1 font-semibold">
          Danışan Seç:
        </label>
        <select
          id="clientSelect"
          placeholder="Danışan Seç"
          onChange={changeUserSelect}
          className="rounded-md border border-gray-300 p-2"
          value={selectedClient || ""}
        >
          <option value="" disabled>
            Danışan Seç
          </option>
          {users.map((user) => (
            <option key={user.user_id} value={user.user_id}>
              {user.ad} {user.soyad}
            </option>
          ))}
        </select>
      </div>
      {selectedClient && (
        <div className="rounded-2xl bg-white p-4 dark:!bg-navy-800 dark:text-white">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Danışan {selectedClientName} için Haftalık Beslenme Planı
            </h2>
            <button
              onClick={handleSaveMealPlan}
              className="rounded-lg bg-navy-600 p-2 font-bold text-white transition duration-200 hover:cursor-pointer hover:bg-navy-400 dark:bg-navy-600 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 md:text-xl"
            >
              Kaydet
            </button>
          </div>
          <div className="overflow-x-auto">
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
                {weeklyMealPlan.length === 7 &&
                  mealTypes.map((mealType) => (
                    <tr key={mealType.key}>
                      <td className="border px-4 py-2 font-semibold">
                        {mealType.label}
                      </td>
                      {daysOfWeek.map((day, index) => (
                        <td key={index} className="border px-4 py-2">
                          <MealInput
                            value={weeklyMealPlan[index][mealType.key]}
                            onChange={(e) =>
                              handleMealChange(index, mealType.key, e)
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const MealInput = ({ value, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  const handleInput = (e) => {
    onChange(e);
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleInput}
      className="w-full resize-none overflow-hidden rounded-md border border-gray-300 px-2 py-1"
      rows={1}
    />
  );
};

export default DailyMealPlanPage;
