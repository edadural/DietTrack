import TotalSpent from "./components/TotalSpent";
import PieChartCard from "./components/PieChartCard";
import BodyMassIndex from "./components/BodyMassIndex";
import DevelopmentTable from "./components/DevelopmentTable";
import { columnsDataDevelopment } from "./variables/columnsData";
import { useEffect, useState } from "react";
import { appAxios } from "helper/appAxios";
import MiniCalendar from "components/calendar/MiniCalendarUser";

const Dashboard = () => {
  const username = localStorage.getItem("username");
  const [beslenmes, setBeslenmes] = useState([]);
  const [table, setTable] = useState([]);

  useEffect(() => {
    appAxios
      .post("beslenme/user-beslenme-get", {})
      .then((response) => {
        if (response.data.status) {
          setBeslenmes(response.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (username) {
        try {
          const response = await appAxios.post("home/user-home-get", {
            username,
          });
          if (response.data.status) {
            setTable(response.data.data);
            console.log("table user", response.data.data);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchUserData();
  }, []);

  const tableDataDevelopment = table.map((item) => ({
    olcum_tarihi: new Date(item.olcum_tarihi).toLocaleDateString(),
    agirlik: item.agirlik,
    yag: item.yag,
    sivi: item.sivi,
    yagsiz: item.yagsiz,
  }));

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <TotalSpent table={table} />
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <BodyMassIndex tableDataDevelopment={tableDataDevelopment} />
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
