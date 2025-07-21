import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!name) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleDOB = (day, month, year) => {
    if (day && month && year) {
      const monthData = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      };
      const monthNumber = monthData[month];
      const DOB = `${day}/${monthNumber}/${year}`;
      setFormData((prev) => ({ ...prev, dateOfBirth: DOB }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!day || !month || !year) {
      alert("Please select your complete date of birth.");
      return;
    }

    if (!formData.gender) {
      alert("Please select your gender.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        navigate("/login");
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  const setGender = (index) => {
    const selectedGender = ["Male", "Female", "Custom"][index];
    setFormData((prev) => ({ ...prev, gender: selectedGender }));
  };

  return (
    <div className="flex register bg-[#F0F2F5] flex-col gap-3 items-center justify-center py-2">
      <img
        src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
        alt="facebook logo"
        width={300}
      />
      <div className="bg-white rounded-lg shadow-md w-full md:max-w-[430px] register-container">
        <h2 className="text-2xl font-bold text-gray-800 text-center my-1 register-heading">
          Create a new account
        </h2>
        <p className="text-gray-600 quick md:mb-4 mb-2 text-center">
          It's quick and easy.
        </p>
        <hr className="text-gray-300" />
        <form
          onSubmit={handleSubmit}
          className="px-4 pt-3 pb-4 flex flex-col items-center gap-3"
        >
          <div className="flex gap-3 w-full">
            <input
              type="text"
              placeholder="First Name"
              className="flex-1 w-full p-2 border border-gray-300 rounded"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Surname"
              className="flex-1 w-full p-2 border border-gray-300 rounded"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full">
            <label className="text-sm mb-1 text-gray-700 flex items-center">
              Date of birth<span className="question ml-1">?</span>
            </label>
            <div className="w-full flex gap-1">
              <select
                className="border cursor-pointer border-gray-300 rounded p-2 w-full"
                value={day}
                onChange={(e) => {
                  const val = e.target.value;
                  setDay(val);
                  handleDOB(val, month, year);
                }}
                required
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i} value={String(i + 1).padStart(2, "0")}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select
                className="border cursor-pointer border-gray-300 rounded p-2 w-full"
                value={month}
                onChange={(e) => {
                  const val = e.target.value;
                  setMonth(val);
                  handleDOB(day, val, year);
                }}
                required
              >
                <option value="">Month</option>
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                className="border cursor-pointer border-gray-300 rounded p-2 w-full"
                value={year}
                onChange={(e) => {
                  const val = e.target.value;
                  setYear(val);
                  handleDOB(day, month, val);
                }}
                required
              >
                <option value="">Year</option>
                {Array.from({ length: 100 }, (_, i) => {
                  const y = 2025 - i;
                  return (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="w-full flex flex-col genders">
            <label className="text-sm mb-1 text-gray-700 flex items-center">
              Gender<span className="question ml-1">?</span>
            </label>
            <div className="flex gap-2 w-full">
              {["Male", "Female", "Custom"].map((gender, index) => (
                <div
                  key={gender}
                  onClick={() => setGender(index)}
                  className="p-2 w-full border rounded border-gray-300 flex items-center justify-between cursor-pointer"
                >
                  <div>{gender}</div>
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={() => setGender(index)}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <input
              type="text"
              name="email"
              placeholder="Mobile number or email address"
              className="border border-gray-300 p-2 rounded w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full">
            <input
              type="password"
              name="password"
              placeholder="New password"
              className="border border-gray-300 p-2 rounded w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full mt-1">
            <p className="text-signup">
              People who use our service may have uploaded your contact
              information to Facebook.{" "}
              <Link className="decoration-color">Learn more</Link>
            </p>
          </div>

          <div className="w-full">
            <p className="text-signup">
              By clicking Sign Up, you agree to our{" "}
              <Link className="decoration-color">Terms</Link>
              <Link className="decoration-color">Privacy Policy</Link>, and{" "}
              <Link className="decoration-color">Cookies Policy</Link>. You may
              receive SMS notifications from us and can opt out at any time.
            </p>
          </div>

          <div className="register-button w-full">
            <button type="submit">Sign Up</button>
          </div>

          <div className="for-login">
            <Link to="/login">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
