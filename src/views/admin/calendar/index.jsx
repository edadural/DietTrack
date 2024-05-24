import CalendarPage from "./components/CalendarPage";
// import RecentActivities from "./components/RecentActivities";
// import RecentAppointments from "./components/RecentAppointments";

const Dashboard = () => {
  return (
    <div>

      {/* <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div>
          <RecentAppointments />
        </div>
      </div> */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 ">
        <div>
          <RecentActivities />
        </div>
      </div> */}

      <div className="mt-5 grid grid-cols-1 gap-5 ">
        <div>
          <CalendarPage />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
