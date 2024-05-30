import { appAxios } from "helper/appAxios";
import DailyMealPlanPage from "./components/DailyMealPlanPage";
import React, { useEffect, useState } from "react";
import { showLoad, swalClose } from "helper/swal";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [beslenmes, setBeslenmes] = useState([]);
  const [weeklyMealPlan, setWeeklyMealPlan] = useState(
    Array(7)
      .fill()
      .map(() => ({ kahvalti: [], ogle: [], aksam: [], atistirma: [] }))
  );

  useEffect(() => {
    appAxios
      .post("user/user-get", {})
      .then(async (response) => {
        if (response.data.status) {
          setUsers(response.data.data);
        }
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (user?.user_id > 0) {
      appAxios
        .post("beslenme/beslenme-get", { user_id: user?.user_id })
        .then(async (response) => {
          if (response.data.status) {
            setBeslenmes(response.data.data);
          }
        })
        .catch((err) => {});
    }
  }, [user]);

  const Ekle = () => {
    showLoad();
    appAxios
      .post("beslenme/beslenme-add", {
        user_id: user?.user_id,
        beslenme: weeklyMealPlan,
      })
      .then(async (response) => {
        if (response.data.status) {
          // swalClose();
        }
      })
      .catch((err) => {});
  };

  const Guncelle = () => {
    showLoad();
    appAxios
      .post("beslenme/beslenme-update", {
        user_id: user?.user_id,
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
    <div>
      <div className="grid grid-cols-1 gap-5 ">
        <div>
          <DailyMealPlanPage
            users={users}
            user={user}
            setUser={setUser}
            beslenmes={beslenmes}
            weeklyMealPlan={weeklyMealPlan}
            setWeeklyMealPlan={setWeeklyMealPlan}
            Ekle={Ekle}
            Guncelle={Guncelle}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
