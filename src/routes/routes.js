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
        path: "/dashboard/findApartments",
        element: <FindApartment></FindApartment>,
      },
      {
        path: "/dashboard/adminMsg",
        element: <AdminMsg></AdminMsg>,
      },
    ],
  },
]);

export default router;
