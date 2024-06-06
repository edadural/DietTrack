import React from "react";

import MainDashboard from "views/user/default";
import DailyPlanUser from "views/user/dailyPlan";
import UserTable from "views/user/table";

import {
    MdBarChart,
    MdHome,
} from "react-icons/md";


const routesUser = [
    {
        name: "Anasayfa",
        layout: "/user",
        path: "default",
        icon: <MdHome className="h-6 w-6" />,
        component: <MainDashboard />,
    },
    {
        name: "Günlük Beslenme",
        layout: "/user",
        path: "dailyPlan",
        icon: <MdBarChart className="h-6 w-6" />,
        component: <DailyPlanUser />,
    },
    // {
    //     name: "Genel Bilgiler",
    //     layout: "/user",
    //     path: "table",
    //     icon: <MdBarChart className="h-6 w-6" />,
    //     component: <UserTable />,
    // },
]
export default routesUser;
