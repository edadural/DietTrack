import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Fallow from "views/admin/fallow";
import Calendar from "views/admin/calendar";
import DailyPlanAdmin from "views/admin/dailyPlan";
import UserList from "views/admin/userList";
import UserFallow from "views/admin/userFallow";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import Notes from "views/admin/notes";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";
import SignInAdmin from "views/auth/SignInAdmin";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
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
    name: "Günlük Beslenme",
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
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
  {
    name: "Giriş Yap",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Giriş Yap Admin",
    layout: "/auth",
    path: "sign-in-admin",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignInAdmin />,
  },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];

export default routes;
