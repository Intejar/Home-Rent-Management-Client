import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Addpost = () => {
  const location = useLocation();
  const { id, email, name, type, img } = location.state;
  console.log(id, email, name, type, img);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const imageHostKey = "41185f8bc11dfae202e0de3bc10fcabe";
  console.log(imageHostKey);
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const handleAddProduct = (event) => {
    console.log(event);
    const image = event.photo_url[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        const image = imgData.data.url;
        saveUser(
          event.name,
          event.email,
          event.type,
          event.rent,
          event.area,
          event.photo,
          event.apartmentNo,
          image
        );
      });
  };
  const saveUser = (
    name,
    email,
    type,
    rent,
    area,
    photo,
    apartmentNo,
    apartmentImg
  ) => {
    const values = {
      houseNo: apartmentNo,
      area: area,
      type: type,
      photo_url: apartmentImg,
      rent: rent,
      userId: id,
      userName: name,
      userEmail: email,
      userImg: photo,
    };
    axios
      .post("http://localhost:8081/post", values)
      .then((res) => {
        // navigate("/login");
        toast.success("Your Post Added Successfully!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="text-2xl mt-5 text-blue-400 font-extrabold text-center">
        Post To-Let!!
      </h1>
      <div className="w-full min-h-screen  dark:bg-slate-400">
        <div className="hero-content ">
          <div className=" flex-shrink-0 w-full ">
            <form
              onSubmit={handleSubmit(handleAddProduct)}
              className="card-body"
            >
              <div className="grid grid-cols-2 gap-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    value={name}
                    placeholder="Full Name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-400 mt-3" role="alert">
                      {errors.name?.message}
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email", {
                      required: "Email Address is required",
                    })}
                    type="text"
                    value={email}
                    placeholder="email"
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400 mt-3" role="alert">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">User Photo URL</span>
                  </label>
                  <input
                    {...register("photo", {
                      required: "Email Address is required",
                    })}
                    type="text"
                    value={img}
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select Apartment Area</span>
                  </label>
                  <select
                    {...register("area", { required: "Name is required" })}
                    name="area"
                    className="select select-bordered select-ghost w-full bg-white"
                  >
                    <option disabled selected>
                      select an option
                    </option>
                    <option value="Mohakhali">Mohakhali</option>
                    <option value="Dhanmondi">Dhanmondi</option>
                    <option value="Uttara">Uttara</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Apartment Number</span>
                  </label>
                  <input
                    {...register("apartmentNo", {
                      required: "Apartment No  is required",
                    })}
                    type="text"
                    placeholder="Apartment Number"
                    className="input input-bordered"
                  />
                  {errors.apartmentNo && (
                    <p className="text-sm text-red-400 mt-3" role="alert">
                      {errors.apartmentNo?.message}
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select Tenant Type</span>
                  </label>
                  <select
                    {...register("type", { required: "Name is required" })}
                    name="type"
                    className="select select-bordered select-ghost w-full bg-white"
                  >
                    <option disabled selected>
                      select an option
                    </option>
                    <option value="Family">Family</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Office">Office</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Apartment Photo</span>
                  </label>
                  <input
                    type="file"
                    {...register("photo_url", {
                      required: "Image is required",
                    })}
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  />
                  {errors.photo_url && (
                    <p className="text-sm text-red-400 mt-3" role="alert">
                      {errors.photo_url?.message}
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Rent</span>
                  </label>
                  <input
                    {...register("rent")}
                    name="rent"
                    type="text"
                    placeholder="Enter Your Apartment Rent"
                    className="input input-bordered"
                  />
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-warning text-white">POST</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addpost;
