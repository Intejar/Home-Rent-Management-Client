import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye, FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Lottie from "react-lottie";

const Login = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require("../../Register.json"),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [logInError, setLogInError] = useState("");
  const [open, setOpen] = useState(false);
  const [logInSuccess, setLogInSuccess] = useState(false);
  const [getemail, setEmail] = useState("");
  const [logInUserEmail, setLogInUserEmail] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const toggle = () => {
    setOpen(!open);
  };

  const handleLogin = (data) => {
    console.log(data);
    setLogInError("");
    setLogInSuccess(false);
    saveUser(data.email, data.password);
  };

  const saveUser = (email, password) => {
    const values = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8081/login", values)
      .then((res) => {
        if (res.data === "Server Error") {
          toast.error("Please input valid email and pass!!");
        } else {
          toast.success("Login Successfull");
          let userInfo = res.data[0];
          console.log(userInfo);
          navigate("/dashboard", {
            state: {
              id: userInfo.user_id,
              name: userInfo.user_name,
              email: userInfo.user_email,
              type: userInfo.user_type,
              img: userInfo.photo_url,
            },
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="hero min-h-screen bg-base-200 dark:bg-slate-800">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6"> please login</p>
                </div> */}
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-slate-600 dark:text-white">
          <form onSubmit={handleSubmit(handleLogin)} className="card-body">
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
                className="input input-bordered dark:text-black"
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-3" role="alert">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="pass flex justify-between items-center border rounded-lg p-3 dark:bg-white">
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
            {logInError && <p className="text-red-500 my-3">{logInError}</p>}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <div className="form-control mt-1">
              <label className="label">
                <h1 className="text-sm text-center">
                  Do not have an account?
                  <Link to="/" className="link link-primary">
                    register
                  </Link>
                </h1>
              </label>
            </div>
          </form>
        </div>
        <div className="">
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </div>
  );
};

export default Login;
