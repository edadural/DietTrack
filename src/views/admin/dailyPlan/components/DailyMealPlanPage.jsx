import React, { useState } from 'react';

const DailyMealPlanPage = () => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [weeklyMealPlan, setWeeklyMealPlan] = useState(
        Array(7).fill().map(() => ({ breakfast: [], lunch: [], dinner: [], snacks: [] }))
    );

    const handleClientSelect = (clientId) => {
        setSelectedClient(clientId);
        // api istek - user.id gitcek
    };

    const handleMealChange = (dayIndex, mealType, e) => {
        const updatedWeeklyMealPlan = weeklyMealPlan.map((day, index) => {
            if (index === dayIndex) {
                return { ...day, [mealType]: e.target.value.split(',') };
            }
            return day;
        });
        setWeeklyMealPlan(updatedWeeklyMealPlan);
    };

    const handleSaveMealPlan = () => {
        console.log("Haftalık beslenme planı kaydedildi:", weeklyMealPlan);
        // Save the weekly meal plan here if needed
    };

    const daysOfWeek = ['1. Gün', '2. Gün', '3. Gün', '4. Gün', '5. Gün', '6. Gün', '7. Gün'];

    return (
        <div className="mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Haftalık Beslenme Programı Oluştur</h1>
            <div className="mb-4">
                <label htmlFor="clientSelect" className="block font-semibold">Danışan Seç:</label>
                <select id="clientSelect" onChange={(e) => handleClientSelect(e.target.value)} className="p-2 border border-gray-300 rounded-md">
                    <option value="">Danışan Seçiniz</option>
                    <option value="1">Danışan 1</option>
                    <option value="2">Danışan 2</option>
                </select>
            </div>
            {selectedClient && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Danışan {selectedClient} için Haftalık Beslenme Planı</h2>
                    <button onClick={handleSaveMealPlan} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">Kaydet</button>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2"></th>
                                    {daysOfWeek.map((day, index) => (
                                        <th key={index} className="border px-4 py-2">{day}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {['breakfast', 'lunch', 'dinner', 'snacks'].map((mealType) => (
                                    <tr key={mealType}>
                                        <td className="border px-4 py-2 font-semibold">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</td>
                                        {daysOfWeek.map((day, index) => (
                                            <td key={index} className="border px-4 py-2">
                                                <MealInput
                                                    value={weeklyMealPlan[index][mealType]}
                                                    onChange={(e) => handleMealChange(index, mealType, e)}
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
    return (
        <input
            type="text"
            value={value.join(',')}
            onChange={onChange}
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
    );
};

export default DailyMealPlanPage;
