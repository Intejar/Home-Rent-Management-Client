import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

const DashboardLayout = () => {
  const location = useLocation();
  const { id, email, name, type, img } = location.state;
  console.log("user", name, email);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content items-center justify-center bg-slate-200">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-4 w-80 h-full bg-blue-400 text-white-content">
          {/* Sidebar content here */}
          <div className="avatar d-flex justify-center mt-5">
            <div className="w-24 rounded-full">
              <img src={img} alt="photo" />
            </div>
          </div>
          <h1 className="text-2xl text-white text-center font-bold mt-2">
            {name}
          </h1>
          <li>
            <div className="d-flex ">
              <FaUser></FaUser>
              <h1 className="text-white">{type}</h1>
            </div>
            <div className="d-flex">
              <FaEnvelope></FaEnvelope>
              <h1 className="text-white">{email}</h1>
            </div>
          </li>
          <div className="divider"></div>
          {type === "landlord" && (
            <>
              <li>
                <Link
                  state={{
                    id: id,
                    name: name,
                    email: email,
                    type: type,
                    img: img,
                  }}
                  className="btn btn-warning text-white font-bold dark:text-white mb-2"
                  to="/dashboard/myPost"
                >
                  My Post
                </Link>
              </li>
              <li>
                <Link
                  state={{
                    id: id,
                    name: name,
                    email: email,
                    type: type,
                    img: img,
                  }}
                  className=" btn btn-warning text-white font-bold dark:text-white mb-2"
                  to="/dashboard/addPost"
                >
                  Add Post
                </Link>
              </li>
              <li>
                <Link
                  state={{
                    id: id,
                    name: name,
                    email: email,
                    type: type,
                    img: img,
                  }}
                  className=" btn btn-warning text-white font-bold dark:text-white"
                  to="/dashboard/myDeal"
                >
                  Your Deal
                </Link>
              </li>
            </>
          )}
          {type === "tenant" && (
            <>
              <li>
                <Link
                  state={{
                    id: id,
                    name: name,
                    email: email,
                    type: type,
                    img: img,
                  }}
                  className="btn btn-warning text-white font-bold dark:text-white mb-2"
                  to="/dashboard/findApartments"
                >
                  Available Apartment
                </Link>
              </li>

              <li>
                <Link
                  state={{
                    id: id,
                    name: name,
                    email: email,
                    type: type,
                    img: img,
                  }}
                  className=" btn btn-warning text-white font-bold dark:text-white mb-2"
                  to="/dashboard/myDeal"
                >
                  Your Deal
                </Link>
              </li>
              <li>
                <Link
                  state={{
                    id: id,
                    name: name,
                    email: email,
                    type: type,
                    img: img,
                  }}
                  className="btn btn-warning text-white font-bold dark:text-white"
                  to="/dashboard/adminMsg"
                >
                  Admin Msg
                </Link>
              </li>
            </>
          )}
          {type === "admin" && (
            <>
              <li>
                <Link
                  state={{
                    id: id,
                    name: name,
                    email: email,
                    type: type,
                    img: img,
                  }}
                  className="btn btn-warning text-white font-bold dark:text-white mb-2"
                  to="/dashboard/allDeal"
                >
                  All Deal
                </Link>
              </li>
              <li>
                <Link
                  state={{
                    id: id,
                    name: name,
                    email: email,
                    type: type,
                    img: img,
                  }}
                  className="btn btn-warning text-white font-bold dark:text-white mb-2"
                  to="/dashboard/allReport"
                >
                  All Report
                </Link>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <Link to="/" className="d-flex justify-center items-center mt-5">
              <h1 className=" text-xl text-white font-bold ">Logout</h1>
              <HiArrowRightOnRectangle fontSize={20}></HiArrowRightOnRectangle>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
