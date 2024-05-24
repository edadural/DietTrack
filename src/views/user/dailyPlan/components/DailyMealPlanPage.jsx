import React, { useState } from 'react';

const DailyMealPlanPage = () => {
    const [weeklyMealPlan] = useState(
        Array(7).fill().map(() => ({ breakfast: ['Eggs', 'Toast'], lunch: ['Chicken Salad'], dinner: ['Steak', 'Vegetables'], snacks: ['Fruit', 'Yogurt'] }))
    );
    const [compliance, setCompliance] = useState(
        Array(7).fill().map(() => ({ breakfast: false, lunch: false, dinner: false, snacks: false }))
    );

    const handleComplianceChange = (dayIndex, mealType) => {
        const updatedCompliance = compliance.map((day, index) => {
            if (index === dayIndex) {
                return { ...day, [mealType]: !day[mealType] };
            }
            return day;
        });
        setCompliance(updatedCompliance);
    };

    const calculateProgress = () => {
        const totalMeals = 7 * 4;
        const followedMeals = compliance.reduce((count, day) => {
            return count + Object.values(day).filter(Boolean).length;
        }, 0);
        return Math.round((followedMeals / totalMeals) * 100);
    };

    const daysOfWeek = ['1. Gün', '2. Gün', '3. Gün', '4. Gün', '5. Gün', '6. Gün', '7. Gün'];

    return (
        <div className="mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Haftalık Beslenme Planı</h1>
            <div>
                <h2 className="text-xl font-semibold mb-2">Haftalık Beslenme Planınız</h2>
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
                                            <div className="flex items-center">
                                                <MealDisplay value={weeklyMealPlan[index][mealType]} />
                                                <input
                                                    type="checkbox"
                                                    checked={compliance[index][mealType]}
                                                    onChange={() => handleComplianceChange(index, mealType)}
                                                    className="ml-2"
                                                />
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Tamamlama: {calculateProgress()}%</h3>
                </div>
            </div>
        </div>
    );
};

const MealDisplay = ({ value }) => {
    return (
        <div className="w-full px-2 py-1 border border-gray-300 rounded-md bg-gray-100">
            {value.join(', ')}
        </div>
    );
};

export default DailyMealPlanPage;
