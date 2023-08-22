import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

const AllReport = () => {
  const location = useLocation();
  const { id, email, name, type, img } = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [info, setInfo] = useState([]);
  if (type === "admin") {
    axios
      .post("http://localhost:8081/allReport")
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
  const handleNofity = (id, landName, landEmail) => {
    const values = {
      id: id,
    };
    axios
      .post("http://localhost:8081/deletePost", values)
      .then((res) => {
        axios
          .post("http://localhost:8081/deleteReport", values)
          .then((res) => {
            axios
              .post("http://localhost:8081/deleteDeal", values)
              .then((res) => {
                toast.success(
                  `Apartment id: ${id} posted by ${landName} is deleted!`
                );
                window.location.reload(true);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-blue-400 text-center dark:text-white my-10">
        All Reports
      </h1>
      {posts?.length > 0 ? (
        <div className="overflow-x-auto mx-5">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Apartment ID</th>
                <th>Landlord Name</th>
                <th>Landlord Email</th>
                <th>Discloser Name</th>
                <th>Discloser Email</th>
                <th>Delete Post</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr>
                  <th className="text-center">{i + 1}</th>
                  <td className="text-center">{post?.apartment_id}</td>
                  <td className="text-center">{post?.landlord_name}</td>
                  <td className="text-center">{post?.landlord_email}</td>
                  <td className="text-center">{post?.tenant_name}</td>
                  <td className="text-center">{post?.tenant_name}</td>
                  <td className="text-center items-center">
                    <FaTrashAlt
                      className="text-xl text-red-500 hover:text-2xl"
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
                          document.getElementById("payment_notify").showModal();
                        }
                      }}
                    ></FaTrashAlt>
                    <dialog id="payment_notify" className="modal">
                      <form method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg text-red-700">
                          Admin Action
                        </h3>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                        <p className="py-4">
                          Are you sure to delete apartment_id: {info[0]?.id}{" "}
                          posted by {info[0]?.landName}?
                        </p>
                        <div className="modal-action">
                          {/* if there is a button in form, it will close the modal */}
                          <button
                            onClick={() =>
                              handleNofity(
                                info[0]?.id,
                                info[0]?.landName,
                                info[0]?.landEmail
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-4xl text-slate-400 text-center dark:text-white my-5">
          No Report Available
        </h1>
      )}
    </div>
  );
};

export default AllReport;
