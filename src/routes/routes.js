import React from "react";
import Login from "../pages/Login/Login";
import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserProfile from "../pages/UserProfile/UserProfile";
import Mypost from "../pages/Mypost/Mypost";
import Addpost from "../pages/AddPost/Addpost";
import FindApartment from "../pages/FindApartments/FindApartment";
import AdminMsg from "../pages/AdminMsg/AdminMsg";
import DashboardLayout from "../Layout/DashboardLayout";
import MyDeal from "../pages/MyDeal/MyDeal";
import AllDeal from "../pages/AllDeal/AllDeal";
import PayementPage from "../pages/AdminMsg/PayementPage";
import AllReport from "../pages/AllReport/AllReport";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/dashboard/myPost",
        element: <Mypost></Mypost>,
      },
      {
        path: "/dashboard/addPost",
        element: <Addpost></Addpost>,
      },
      {
        path: "/dashboard/myDeal",
        element: <MyDeal></MyDeal>,
      },
      {
        path: "/dashboard/findApartments",
        element: <FindApartment></FindApartment>,
      },
      {
        path: "/dashboard/adminMsg",
        element: <AdminMsg></AdminMsg>,
      },
      {
        path: "/dashboard/allDeal",
        element: <AllDeal></AllDeal>,
      },
      {
        path: "/dashboard/paymentPage",
        element: <PayementPage></PayementPage>,
      },
      {
        path: "/dashboard/allReport",
        element: <AllReport></AllReport>,
      },
    ],
  },
]);

export default router;
