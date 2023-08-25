import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import {
  FaEyeSlash,
  FaEye,
  FaGoogle,
  FaGithub,
  FaWindows,
} from "react-icons/fa";
import Lottie from "react-lottie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Register = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require("../../Login.json"),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [open, setOpen] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();
  const imageHostKey = "41185f8bc11dfae202e0de3bc10fcabe";
  console.log(imageHostKey);
  // const [token] = useToken(userEmail)
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const toggle = () => {
    setOpen(!open);
  };
  const handleRegister = (event) => {
    console.log(event);
    if (event.password !== event.confirmPassword) {
      setSignUpError("confirm password doesnot match!!");
    } else {
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
          saveUser(event.name, event.email, event.type, event.password, image);
        });
    }
  };
  const saveUser = (name, email, type, password, img) => {
    const values = {
      name: name,
      email: email,
      type: type,
      password: password,
      photo_url: img,
    };
    axios
      .post("http://localhost:8081/register", values)
      .then((res) => {
        toast.success("User created successfully");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="hero min-h-screen bg-base-200 dark:bg-slate-800">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-slate-600">
          <form onSubmit={handleSubmit(handleRegister)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
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
                  pattern: {
                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                    message: "Please enter valid email address",
                  },
                })}
                type="email"
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
                <span className="label-text">User Photo</span>
              </label>
              <input
                type="file"
                {...register("photo_url", { required: "Image is required" })}
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
                <span className="label-text">Select Your Role</span>
              </label>
              <select
                {...register("type")}
                className="select select-ghost w-full bg-white select-bordered"
              >
                <option value="tenant">Tenant</option>
                <option value="landlord" selected>
                  Landlord
                </option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="pass flex justify-between items-center border rounded-lg p-3 dark: bg-white">
                <input
                  {...register("password", {
                    required: "Password is required",
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  })}
                  type={open === false ? "password" : "text"}
                  placeholder="password"
                  className="dark:text-black dark:bg-white"
                />
                {open === false ? (
                  <FaEyeSlash
                    className="dark:text-black"
                    onClick={toggle}
                  ></FaEyeSlash>
                ) : (
                  <FaEye className="dark:text-black" onClick={toggle}></FaEye>
                )}
              </div>
              {errors.password && (
                <p className="text-sm text-red-400" role="alert">
                  {errors.password?.message}
                </p>
              )}
              {errors?.password?.type === "pattern" && (
                <p className="text-xs text-red-400 max-w-fit mt-3" role="alert">
                  Minimum eight characters, at least one
                  uppercasse,lowercase,number,special letter
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="pass flex justify-between items-center border rounded-lg p-3 dark: bg-white">
                <input
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                  type={open === false ? "password" : "text"}
                  placeholder="confirm password"
                  className="dark:text-black dark:bg-white"
                />
                {open === false ? (
                  <FaEyeSlash
                    className="dark:text-black"
                    onClick={toggle}
                  ></FaEyeSlash>
                ) : (
                  <FaEye className="dark:text-black" onClick={toggle}></FaEye>
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-400" role="alert">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            {signUpError && <p className="text-red-500 my-3">{signUpError}</p>}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Signup</button>
            </div>
            <div className="form-control mt-1">
              <label className="label">
                <h1 className="text-sm text-center">
                  Already have an account?
                  <Link
                    to="/login"
                    className="link link-primary dark:text-white"
                  >
                    login
                  </Link>
                </h1>
              </label>
            </div>
          </form>
        </div>
        <div className="w-1/2">
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </div>
  );
};

export default Register;
