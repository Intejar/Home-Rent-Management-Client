import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

const Mypost = () => {
  const location = useLocation();
  const { id, email, name, type, img } = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  // console.log(id, email, name, type, img);

  const values = {
    email: email,
    name: name,
  };
  axios
    .post("http://localhost:8081/myPost", values)
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
        All Post
      </h1>
      {posts?.length > 0 ? (
        <div className="overflow-x-auto mx-5">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Photo</th>
                <th>Area</th>
                <th>Apartment No</th>
                <th>Type</th>
                <th>Rent</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr key={post._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div class="avatar">
                      <div class="w-24 rounded">
                        <img src={post.photo_url} alt="photo" />
                      </div>
                    </div>
                  </td>
                  <td>{post.apartment_area}</td>
                  <td>{post.apartment_no}</td>
                  <td>{post.apartment_type}</td>
                  <td>{post.apartment_rent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-4xl text-slate-400 text-center dark:text-white my-5">
          No Post Available
        </h1>
      )}
    </div>
  );
};

export default Mypost;
