import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "components/widget/Widget"
import ClientNotes from "./components/ClientNotes";
import MiniCalendar from "components/calendar/MiniCalendar";
import DailyTraffic from "./components/DailyTraffic";
import PieChartCard from "./components/PieChartCard";
import RecentAppointments from "components/recent/RecentAppointments";

const Dashboard = () => {
  return (
    <div>

      <div className="mt-3 grid md:grid-cols-3 gap-5">
        <div className="flex flex-col gap-3 ">
          <Widget
            icon={<IoDocuments className="h-6 w-6" />}
            title={"Danışan Sayısı"}
            subtitle={"40"}
          />
          <Widget
            icon={<MdBarChart className="h-6 w-6" />}
            title={"Randevu sayısı"}
            subtitle={"10"}
          />
          <Widget
            icon={<MdDashboard className="h-6 w-6" />}
            title={"Randevu sayısı"}
            subtitle={"10"}
          />
        </div>
        <MiniCalendar />
        <PieChartCard />
      </div>


      <div className="mt-5 grid grid-cols-1 md:gap-5 gap-y-5 xl:grid-cols-3">
        <RecentAppointments />
        <div className="grid col-span-2">
          <ClientNotes />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
