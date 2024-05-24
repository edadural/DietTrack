import DailyMealPlanPage from "./components/DailyMealPlanPage";

const Dashboard = () => {
  return (
    <div>

      <div className="grid grid-cols-1 gap-5 ">
        <div>
          <DailyMealPlanPage />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
