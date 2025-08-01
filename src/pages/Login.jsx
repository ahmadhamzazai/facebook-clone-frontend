import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://facebook-clone-backend-production-e1fc.up.railway.app/api/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        navigate("/");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-row w-full mx-login items-center gap-[6rem]">
        {/* Left side - Branding/Image Section */}
        <div className="w-full mb-[5rem] flex flex-col login-intro justify-center gap-1 items-center md:items-start text-center md:text-left">
          <h1 className="w-full cursor-pointer text-[4.2rem] login-facebook font-bold text-blue-600">
            facebook
          </h1>
          <p className="text-3xl text-login w-full font-[450] text-black">
            Facebook helps you connect and share with the people in your life.
          </p>
        </div>

        {/* Right side - Login Form */}
        <div className="flex flex-col justify-center min-w-[430px] login-container items-center pt-[5rem] gap-5">
          <div className="bg-white p-5 rounded-lg w-full login-form-container shadow-lg ">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Email address or phone number"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[18px] font-[450] transition duration-200"
                required
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[18px] font-[450] transition duration-200"
                required
              />

              <button
                type="submit"
                className="bg-blue-600 login cursor-pointer text-white text-[20px] font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Log In
              </button>

              <Link
                to="/forgot-password"
                className="text-blue-600 text-md text-center hover:underline transition duration-200"
              >
                Forgotten password?
              </Link>

              <hr className="mt-2 border-gray-300" />

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="bg-[#42b72a] cursor-pointer w-3/5 mx-auto register-green my-3 hover:bg-[#369b22] text-white text-lg font-bold font-arial py-3 rounded-lg transition duration-200"
              >
                Create New account
              </button>
            </form>
          </div>
          <p className="m-0 p-0 text-center">
            <Link className="font-semibold to-register">Create a Page</Link> for
            a celebrity, brand or business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
