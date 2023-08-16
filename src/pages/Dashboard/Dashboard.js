import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const { id, email, name, type, img } = location.state;
  const [role, setRole] = useState({ type });
  console.log(id, email, name, type, img);

  return (
    // <div className="min-h-screen">
    //   <h1 className="text-3xl">Navbar</h1>
    //   <div className="drawer drawer-mobile">
    //     <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    //     <div className="drawer-content flex flex-col  bg-gray-300 dark:bg-slate-800">
    //       <Outlet></Outlet>
    //     </div>
    //     <div className="drawer-side">
    //       <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
    //       <ul className="menu p-4 w-80 bg-slate-300 dark:bg-slate-700 text-base-content">
    //         {role === "landlord" && (
    //           <>
    //             <li>
    //               {" "}
    //               <Link
    //                 className="font-bold dark:text-white"
    //                 to="/dashboard/myPost"
    //               >
    //                 My Post
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 className="font-bold dark:text-white"
    //                 to="/dashboard/addPost"
    //               >
    //                 Add Post
    //               </Link>
    //             </li>
    //           </>
    //         )}
    //         {role === "tenant" && (
    //           <>
    //             <li>
    //               <Link
    //                 className="font-bold dark:text-white"
    //                 to="/dashboard/findApartments"
    //               >
    //                 Find Apartment
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 className="font-bold dark:text-white"
    //                 to="/dashboard/adminMsg"
    //               >
    //                 Admin Message
    //               </Link>
    //             </li>
    //           </>
    //         )}
    //         {role === "admin" && (
    //           <>
    //             <li>
    //               {" "}
    //               <Link
    //                 className="font-bold dark:text-white"
    //                 to="/dashboard/MyProduct"
    //               >
    //                 All user
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 className="font-bold dark:text-white"
    //                 to="/dashboard/AddProduct"
    //               >
    //                 Reports
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 className="font-bold dark:text-white"
    //                 to="/dashboard/MyOrders"
    //               >
    //                 Send Message
    //               </Link>
    //             </li>
    //           </>
    //         )}
    //       </ul>
    //     </div>
    //   </div>
    // </div>
    <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={img} alt="userPhoto" />
        </div>
      </div>
      <h2 className="text-center text-2xl font-semibold mt-3">{name}</h2>
      <p className="text-center text-gray-600 mt-1">{type}</p>
      <p className="text-center text-gray-600 mt-1">{email}</p>
    </div>
  );
};

export default Dashboard;
