import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

const MyDeal = () => {
  const location = useLocation();
  const { id, email, name, type, img } = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  console.log("mydeal", id, email, name, type, img);
  if (type === "landlord") {
    const values = {
      email: email,
      name: name,
    };
    axios
      .post("http://localhost:8081/myTenant", values)
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
  } else {
    const values = {
      email: email,
      name: name,
    };
    axios
      .post("http://localhost:8081/myDeal", values)
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
        Your Deal
      </h1>
      {posts?.length > 0 ? (
        <div className="overflow-x-auto mx-5">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">No.</th>
                <th className="text-center">Apartment No</th>
                <th className="text-center">Area</th>
                <th className="text-center">Rent</th>
                <th className="text-center">
                  {type === "landlord" ? "Tenant Name" : "Landlord Name"}
                </th>
                <th className="text-center">
                  {type === "landlord" ? "Tenant Email" : "Landlord Email"}
                </th>
                <th className="text-center"> Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr>
                  <th className="text-center">{i + 1}</th>
                  <td className="text-center">{post.apartment_no}</td>
                  <td className="text-center">{post.apartment_area}</td>
                  <td className="text-center">{post.apartment_rent}</td>
                  <td className="text-center">
                    {type === "landlord"
                      ? `${post.tenant_name}`
                      : `${post.landlord_name}`}
                  </td>
                  <td className="text-center">
                    {" "}
                    {type === "landlord"
                      ? `${post.tenant_email}`
                      : `${post.landlord_email}`}
                  </td>
                  {post?.payment_status === "unpaid" ? (
                    <td className="text-sm  text-red-600 text-center">
                      {post?.payment_status}
                    </td>
                  ) : (
                    <td className="text-sm  text-green-600 text-center">
                      {post?.payment_status}
                    </td>
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

export default MyDeal;
