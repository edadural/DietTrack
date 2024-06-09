import React from "react";

import MainDashboard from "views/user/default";
import DailyPlanUser from "views/user/dailyPlan";

import { MdBarChart, MdHome } from "react-icons/md";

const routesUser = [
  {
    name: "Anasayfa",
    layout: "/user",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Haftalık Beslenme",
    layout: "/user",
    path: "dailyPlan",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <DailyPlanUser />,
  },
];
export default routesUser;
