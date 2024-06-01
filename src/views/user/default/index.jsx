import MiniCalendar from "components/calendar/MiniCalendar";
import TotalSpent from "./components/TotalSpent";
import PieChartCard from "./components/PieChartCard";
import BodyMassIndex from "./components/BodyMassIndex";
import DevelopmentTable from "./components/DevelopmentTable";
import { columnsDataDevelopment } from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import { useEffect, useState } from "react";
import { appAxios } from "helper/appAxios";

const Dashboard = () => {
  const [beslenmes, setBeslenmes] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      appAxios
        .post("beslenme/user-beslenme-get", { username })
        .then((response) => {
          if (response.data.status) {
            setBeslenmes(response.data.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

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
        <PieChartCard beslenmes={beslenmes} />
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
