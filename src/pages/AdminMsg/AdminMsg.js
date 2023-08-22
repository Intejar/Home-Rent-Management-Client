import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { FaCreditCard } from "react-icons/fa";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const AdminMsg = () => {
  const location = useLocation();
  const { id, email, name, type, img } = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();

  console.log("mydeal", id, email, name, type, img);
  if (type === "tenant") {
    const values = {
      email: email,
      name: name,
    };
    axios
      .post("http://localhost:8081/myAdminMsg", values)
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

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-blue-400 text-center dark:text-white my-10">
        Your Msg
      </h1>
      {posts?.length > 0 ? (
        <div className="overflow-x-auto mx-5">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">No.</th>
                <th className="text-center">Booked Apartment Id</th>
                <th className="text-center">Booked Area</th>
                <th className="text-center">Rent Deu</th>
                <th className="text-center">Landlord Name</th>
                <th className="text-center">Landlord Email</th>
                <th className="text-center">Admin Message</th>
                <th className="text-center">Pay Now</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr>
                  <th className="text-center">{i + 1}</th>
                  <td className="text-center">{post.apartment_id}</td>
                  <td className="text-center">{post.apartment_area}</td>
                  <td className="text-center">{post.rent}</td>
                  <td className="text-center">{post.landlord_name}</td>
                  <td className="text-center">{post.landlord_email}</td>
                  {post?.status === "unpaid" ? (
                    <td className="text-sm  text-red-600 text-center">
                      Due ${post.rent}
                    </td>
                  ) : (
                    <td className="text-sm  text-green-600 text-center">
                      Paid
                    </td>
                  )}
                  {post?.status === "unpaid" ? (
                    <td className="text-sm  text-blue-600 text-center">
                      <FaCreditCard
                        className="text-2xl  hover:text-green-500"
                        onClick={() => {
                          setInfo([
                            {
                              id: post?.apartment_id,
                              area: post?.apartment_area,
                              number: post?.apartment_no,
                              rent: post?.rent,
                              landName: post?.landlord_name,
                              landEmail: post?.landlord_email,
                              userName: post?.tenant_name,
                              userEmail: post?.tenant_email,
                            },
                          ]);
                          if (document) {
                            document.getElementById("payment").showModal();
                          }
                        }}
                      ></FaCreditCard>
                      <dialog id="payment" className="modal">
                        <form method="dialog" className="modal-box">
                          <h3 className="font-bold text-lg">
                            Hi {info[0]?.userName}!
                          </h3>
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                          <p className="py-4">
                            Your Due for apartment_id: {info[0]?.id}
                            and rent: ${info[0]?.rent} please give your card
                            information to proceed!
                          </p>
                          <div className="modal-action">
                            <button
                              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                              onClick={() => {
                                navigate("/dashboard/paymentPage", {
                                  state: {
                                    id: id,
                                    name: info[0].userName,
                                    email: info[0].userEmail,
                                    rent: info[0].rent,
                                    type: type,
                                    img: img,
                                    apartment_id: info[0].id,
                                  },
                                });
                              }}
                            >
                              pay
                            </button>

                            {/* <Button
                              className="btn btn-sm"
                              onClick={() => {
                                navigate("/dashboard", {
                                  state: {
                                    id: id,
                                    name: info[0].user_name,
                                    email: info[0].user_email,
                                    type: type,
                                    img: img,
                                    apartment_id: info[0].id,
                                  },
                                });
                              }}
                            >
                              Pay
                            </Button> */}
                          </div>
                        </form>
                      </dialog>
                    </td>
                  ) : (
                    <td className="text-sm  text-green-600 text-center"></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-4xl text-slate-400 text-center dark:text-white my-5">
          No Message From Admin
        </h1>
      )}
    </div>
  );
};

export default AdminMsg;
