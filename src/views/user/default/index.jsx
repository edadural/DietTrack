import MiniCalendar from "components/calendar/MiniCalendar";
import TotalSpent from "./components/TotalSpent";
import PieChartCard from "./components/PieChartCard";
import BodyMassIndex from "./components/BodyMassIndex";
import DevelopmentTable from "./components/DevelopmentTable";
import { columnsDataDevelopment } from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";

const Dashboard = () => {
  return (
    <div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">

        <TotalSpent />

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <BodyMassIndex />

          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-4">
        <PieChartCard />
        <div className="col-span-3">
          <DevelopmentTable
            columnsData={columnsDataDevelopment}
            tableData={tableDataDevelopment}
          />
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
