import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { HiMapPin, HiHeart, HiMegaphone } from "react-icons/hi2";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import "./FindApartment.css";
import DealModal from "./DealModal/DealModal";

const FindApartment = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const location = useLocation();
  const { id, email, name, type, img } = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoad, setDataLoad] = useState(true);
  const [area, setArea] = useState("");
  // const [prevDealData, setPrevDeal] = useState([]);
  const [posts, setPosts] = useState([]);
  const [booking, setBooking] = useState([]);
  const handleDeal = (
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
    // setPrevDeal([]);
    const prevDeal = {
      id: id,
    };
    axios
      .post("http://localhost:8081/checkDeal", prevDeal)
      .then((res) => {
        setIsLoading(true);
        if (res.data === "Server Error") {
          toast.error("Something Went Wrong!!");
        } else {
          setIsLoading(false);
          toast.error("This Apartment is already booked!");
          console.log("pre2", prevDeal);
        }
      })
      .catch((err) => {
        console.log(err);
        const values = {
          id: id,
          houseNo: number,
          area: area,
          rent: rent,
          userName: userName,
          userEmail: userEmail,
          landName: landName,
          landEmail: landEmail,
          status: status,
        };
        axios
          .post("http://localhost:8081/dealLet", values)
          .then((res) => {
            toast.success("Your Deal Finalized!");
          })
          .catch((err) => console.log(err));
      });
  };
  const handleReport = (
    id,
    landlordName,
    landlordEmail,
    userName,
    userEmail
  ) => {
    console.log("e", landlordName, landlordEmail, userName, userEmail);
    const values = {
      id: id,
      landName: landlordName,
      landEmail: landlordEmail,
      userName: userName,
      userEmail: userEmail,
    };
    axios
      .post("http://localhost:8081/report", values)
      .then((res) => {
        toast.success("Your Report Sent to Admin Successfully!");
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
    setDataLoad(false);
    const values = {
      area: e.type,
    };
    axios
      .post("http://localhost:8081/filterPost", values)
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
  };
  if (dataLoad) {
    axios
      .post("http://localhost:8081/allPost")
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
    <div className="mx-40 my-10">
      <h1 className="text-3xl font-bold  text-blue-400 text-center my-10">
        Available Apartments
      </h1>
      <div className="join ml-0 my-5">
        <div className="">
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Search"
            />
          </div>
        </div>
        <form onSubmit={handleSubmit(handleSearch)} className="join-item">
          <select
            {...register("type")}
            className="select select-ghost w-full bg-white  "
          >
            <option value="Mohakhali">Mohakhali</option>
            <option value="Uttara">Uttara</option>
            <option value="Dhanmondi" selected>
              Dhanmondi
            </option>
          </select>
          <div className="p indicator join-item">
            <button type="submit" className="btn join-item">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3">
        {posts.map((post, i) => (
          <div class="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl">
            {/* <div className="avatar"> */}
            <div className="w-full items-center rounded">
              <img src={post.photo_url} alt="Tailwind-CSS-Avatar-component" />
            </div>
            {/* </div> */}
            <div class="px-6 py-4">
              <div class="mb-2">
                <h2 class="text-xl font-bold text-gray-900">
                  New Apartment For {`${post.apartment_type}`}!
                </h2>
                <div class="flex items-center">
                  <div class="mr-2 rounded-full bg-blue-600 py-1 px-2 text-xs font-medium text-white"></div>
                  <div class="rounded-full bg-yellow-500 py-1 px-2 text-xs font-medium text-white">
                    {" "}
                  </div>
                </div>
              </div>
              <div class="flex justify-between">
                <div class="flex items-center">
                  <HiMapPin></HiMapPin>
                  <p class="ml-2 text-sm font-medium text-gray-700">
                    {`${post.apartment_no},${post.apartment_area}`}
                  </p>
                </div>
                <div class="flex items-center">
                  <img
                    src="https://img.icons8.com/ios-glyphs/24/null/expand--v1.png"
                    alt=""
                  />
                  <p class="ml-2 text-sm font-medium text-gray-700">120 sqm</p>
                </div>
              </div>
              <div class="mt-4">
                <p class="text-3xl font-extrabold text-blue-800">
                  ${post.apartment_rent}
                </p>
              </div>
            </div>
            <div class="px-6 py-4 flex justify-between items-center">
              <div class="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img src={post.landlord_img} alt="" />
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-800">
                    {post.landlord_name}
                  </p>
                  <p class="text-xs text-gray-600">{post.landlord_email}</p>
                </div>
              </div>
              <div class="flex gap-2 justify-center items-center">
                <HiHeart
                  className="text-2xl  hover:text-red-500"
                  onClick={() => {
                    setBooking([
                      {
                        id: post.apartment_id,
                        area: post.apartment_area,
                        number: post.apartment_no,
                        rent: post.apartment_rent,
                        landName: post.landlord_name,
                        landEmail: post.landlord_email,
                        userName: name,
                        userEmail: email,
                      },
                    ]);
                    if (document) {
                      document.getElementById("my_modal_1").showModal();
                    }
                  }}
                ></HiHeart>
                <dialog id="my_modal_1" className="modal">
                  <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">
                      Hi {booking[0]?.userName}!
                    </h3>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                    <p className="py-4">
                      Do you want to make deal with {booking[0]?.landName} at $
                      {booking[0]?.rent}?
                    </p>
                    <div className="modal-action">
                      {/* if there is a button in form, it will close the modal */}
                      <button
                        onClick={() =>
                          handleDeal(
                            booking[0]?.id,
                            booking[0]?.area,
                            booking[0]?.number,
                            booking[0]?.rent,
                            booking[0]?.landName,
                            booking[0]?.landEmail,
                            booking[0]?.userName,
                            booking[0]?.userEmail,
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
                <HiMegaphone
                  className="text-2xl hover:text-red-500"
                  onClick={() => {
                    setBooking([
                      {
                        id: post.apartment_id,
                        area: post.apartment_area,
                        number: post.apartment_no,
                        rent: post.apartment_rent,
                        landName: post.landlord_name,
                        landEmail: post.landlord_email,
                        userName: name,
                        userEmail: email,
                      },
                    ]);
                    if (document) {
                      document.getElementById("my_modal_2").showModal();
                    }
                  }}
                ></HiMegaphone>
                <dialog id="my_modal_2" className="modal">
                  <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">
                      Hi {booking[0]?.userName}!
                    </h3>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                    <p className="py-4">
                      Do you want to report against {booking[0]?.landName}
                    </p>
                    <div className="modal-action">
                      {/* if there is a button in form, it will close the modal */}
                      <button
                        onClick={() =>
                          handleReport(
                            booking[0]?.id,
                            booking[0]?.landName,
                            booking[0]?.landEmail,
                            booking[0]?.userName,
                            booking[0]?.userEmail
                          )
                        }
                        className="btn btn-warning"
                      >
                        Yes
                      </button>
                    </div>
                  </form>
                </dialog>
              </div>
            </div>
          </div>
        ))}
      </div>
      {dataLoad === false && (
        <div className="my-10 d-flex mx-80">
          <button onClick={() => setDataLoad(true)} className="btn btn-warning">
            See All
          </button>
        </div>
      )}
    </div>
  );
};

export default FindApartment;
