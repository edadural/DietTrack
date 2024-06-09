import React from "react";
import MainDashboard from "views/admin/default";
import Calendar from "views/admin/calendar";
import DailyPlanAdmin from "views/admin/dailyPlan";
import UserList from "views/admin/userList";
import UserFallow from "views/admin/userFallow";
import Notes from "views/admin/notes";
import SignIn from "views/auth/SignIn";
import SignInAdmin from "views/auth/SignInAdmin";
import {
  MdHome,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Anasayfa",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Notlar",
    layout: "/admin",
    path: "all-notes",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Notes />,
  },
  {
    name: "Takvim",
    layout: "/admin",
    path: "calendar",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <Calendar />,
  },
  {
    name: "Haftalık Beslenme",
    layout: "/admin",
    path: "dailyPlan",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <DailyPlanAdmin />,
  },
  {
    name: "Danışan Listesi",
    layout: "/admin",
    path: "userList",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <UserList />,
  },
  {
    name: "Danışan Takip",
    layout: "/admin",
    path: "userFallow",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <UserFallow />,
  },
  {
    name: "Giriş Yap",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Giriş Yap - Admin",
    layout: "/auth",
    path: "sign-in-admin",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignInAdmin />,
  },
];

export default routes;
