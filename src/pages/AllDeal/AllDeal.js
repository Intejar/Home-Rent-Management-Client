import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { FaRegEdit } from "react-icons/fa";

const AllDeal = () => {
  const location = useLocation();
  const { id, email, name, type, img } = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [info, setInfo] = useState([]);
  if (type === "admin") {
    axios
      .post("http://localhost:8081/allDeal")
      .then((res) => {
        setIsLoading(true);
        if (res.data === "Server Error") {
          toast.error("Something Went Wrong!!");
        } else {
          setIsLoading(false);
          // let posts = res.data;
          setPosts(res.data);
        }
      })
      .catch((err) => console.log(err));
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <ClimbingBoxLoader color="#36d7b7" />
      </div>
    );
  }
  const handleNofity = (
    id,
    area,
    number,
    rent,
    landName,
    landEmail,
    userName,
    userEmail,
    status
  ) => {
    const values = {
      id: id,
      houseNo: number,
      area: area,
      userName: userName,
      userEmail: userEmail,
      landName: landName,
      landEmail: landEmail,
      rent: rent,
      status: status,
    };
    axios
      .post("http://localhost:8081/adminMsg", values)
      .then((res) => {
        toast.success(`Msg is sent to ${userName}!`);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-blue-400 text-center dark:text-white my-10">
        All Deal
      </h1>
      {posts?.length > 0 ? (
        <div className="overflow-x-auto mx-5">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">Apartment ID</th>
                <th className="text-center">Apartment No</th>
                <th className="text-center">Area</th>
                <th className="text-center">Rent</th>
                <th className="text-center">Landlord Name</th>
                <th className="text-center">Landlord Email</th>
                <th className="text-center">Tenant Name</th>
                <th className="text-center">Tenant Email</th>
                <th className="text-center">Payment Status</th>
                <th className="text-center">Notify Tenant</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr>
                  <td className="text-center">{post?.apartment_id}</td>
                  <td className="text-center">{post?.apartment_no}</td>
                  <td className="text-center">{post?.apartment_area}</td>
                  <td className="text-center">{post?.apartment_rent}</td>
                  <td className="text-center">{post?.landlord_name}</td>
                  <td className="text-center">{post?.landlord_email}</td>
                  <td className="text-center">{post?.tenant_name}</td>
                  <td className="text-center">{post?.tenant_name}</td>
                  {post?.payment_status === "unpaid" ? (
                    <td className="text-sm text-red-600 text-center">
                      {post?.payment_status}
                    </td>
                  ) : (
                    <td className="text-sm text-green-600 text-center">
                      {post?.payment_status}
                    </td>
                  )}
                  {post?.payment_status === "unpaid" ? (
                    <td className="text-center items-center">
                      <FaRegEdit
                        className="text-2xl  hover:text-green-500 hover:text-3xl ml-10"
                        onClick={() => {
                          setInfo([
                            {
                              id: post?.apartment_id,
                              area: post?.apartment_area,
                              number: post?.apartment_no,
                              rent: post?.apartment_rent,
                              landName: post?.landlord_name,
                              landEmail: post?.landlord_email,
                              userName: post?.tenant_name,
                              userEmail: post?.tenant_email,
                            },
                          ]);
                          if (document) {
                            document
                              .getElementById("payment_notify")
                              .showModal();
                          }
                        }}
                      ></FaRegEdit>
                      <dialog id="payment_notify" className="modal">
                        <form method="dialog" className="modal-box">
                          <h3 className="font-bold text-lg">Admin Message</h3>
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                          <p className="py-4">
                            Are you sure to sent payment notification to{" "}
                            {info[0]?.userName} for apartment_id: {info[0]?.id}{" "}
                            and rent: {info[0]?.rent}?
                          </p>
                          <div className="modal-action">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                              onClick={() =>
                                handleNofity(
                                  info[0]?.id,
                                  info[0]?.area,
                                  info[0]?.number,
                                  info[0]?.rent,
                                  info[0]?.landName,
                                  info[0]?.landEmail,
                                  info[0]?.userName,
                                  info[0]?.userEmail,
                                  "unpaid"
                                )
                              }
                              className="btn btn-warning"
                            >
                              Yes
                            </button>
                          </div>
                        </form>
                      </dialog>
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-4xl text-slate-400 text-center dark:text-white my-5">
          No Deal Available
        </h1>
      )}
    </div>
  );
};

export default AllDeal;
