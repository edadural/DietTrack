import { useEffect, useState } from "react";
import DailyMealPlanPage from "./components/DailyMealPlanPage";
import { appAxios } from "helper/appAxios";
import { showLoad } from "helper/swal";

const Dashboard = () => {
  const [beslenmes, setBeslenmes] = useState([]);
  const [weeklyMealPlan, setWeeklyMealPlan] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      appAxios
        .post("beslenme/user-beslenme-get", { username })
        .then((response) => {
          if (response.data.status) {
            setBeslenmes(response.data.data);
            console.log("222", response.data.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const Guncelle = () => {
    showLoad();
    appAxios
      .post("beslenme/user-beslenme-update", {
        beslenme: weeklyMealPlan,
      })
      .then(async (response) => {
        if (response.data.status) {
          // swalClose();
        }
      })
      .catch((err) => {});
  };

  return (
    <div className="grid grid-cols-1 gap-5">
      <div>
        <DailyMealPlanPage
          beslenmes={beslenmes}
          weeklyMealPlan={weeklyMealPlan}
          setWeeklyMealPlan={setWeeklyMealPlan}
          Guncelle={Guncelle}
        />
      </div>
    </div>
  );
};

export default Dashboard;
