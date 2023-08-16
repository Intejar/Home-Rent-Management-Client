import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

const DashboardLayout = () => {
  const location = useLocation();
  const { id, email, name, type, img } = location.state;
  console.log(id, email, name, type, img);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
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

        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={img} alt="photo" />
              </div>
            </div>

            <h1 className="text-2xl text-center font-bold">{name}</h1>
            <div className="d-flex ">
              <FaUser></FaUser>
              <h1>{type}</h1>
            </div>
            <div className="d-flex">
              <FaEnvelope></FaEnvelope>
              <h1>{email}</h1>
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
                  className="btn btn-primary font-bold dark:text-white mb-2"
                  to="/dashboard/myPost"
                >
                  My Post
                </Link>
              </li>
              <li></li>
              <li>
                <Link
                  state={{
                    id: id,
                    name: name,
                    email: email,
                    type: type,
                    img: img,
                  }}
                  className=" btn btn-primary font-bold dark:text-white"
                  to="/dashboard/addPost"
                >
                  Add Post
                </Link>
              </li>
              <li></li>
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
                  className="btn btn-primary font-bold dark:text-white"
                  to="/dashboard/findApartments"
                >
                  Available Apartment
                </Link>
              </li>
              <li></li>
              <li>
                <Link
                  state={{
                    id: id,
                    name: name,
                    email: email,
                    type: type,
                    img: img,
                  }}
                  className="btn btn-primary font-bold dark:text-white"
                  to="/dashboard/adminMsg"
                >
                  Admin Msg
                </Link>
              </li>
              <li></li>
            </>
          )}
          <li>
            <Link to="/" className="d-flex justify-center items-center mt-5">
              <h1 className=" text-2xl font-bold ">Log out</h1>
              <HiArrowRightOnRectangle fontSize={30}></HiArrowRightOnRectangle>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
