import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { loggedinContext } from "../contexts/LoggedinProvider";

function Login() {
  const navigate = useNavigate();
  let [password,setPassword]=useState('');
  let [email,setEmail]=useState('');

let {loggedin,setloggedin}=useContext(loggedinContext)
const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = { email, password };

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include", // IMPORTANT if using sessions/cookies
    });

    const data = await response.json();
    console.log("Response from backend:", data);
          if (data.status === "error") {
      alert(data.error.msg);
      return;
    }
  setEmail("");
  setPassword("");
  setloggedin(true);
  navigate("/")
  } catch (err) {
    console.error("Error submitting form:", err);
  }
};

  return (
    <div className=" rounded-xl flex min-h-svh w-full items-center justify-center p-6 md:p-10">

      <div className="flex w-full max-w-5xl flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src="assets/loginch.jpeg"
            alt="login_image"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="md:w-1/2 bg-[#007E6E] p-8 md:p-12 flex items-center">
          <form onSubmit={handleSubmit} className="w-full">

            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Login
            </h2>
            <p className="text-lg md:text-xl mb-6">Welcome back!</p>

            <div className="mb-4">
              <label htmlFor="email" className="block text-lg mb-1">
                Email address :
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-lg mb-1">
                Password :
              </label>
              <input
              value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg active:scale-105 transition-transform"
            >
              LOG IN
            </button>
                {" "}
                <Link to="/">
                 <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg active:scale-105 transition-transform"
                >
                  HOME
                </button>
                </Link>
            <p className="mt-4 text-lg">
              Don't have an account?{" "}
              <Link to="/signup" className="underline font-semibold">
                Create an account
              </Link>
            </p>

            <p className="mt-4 text-sm">
              <br />Demo User:
              <br />Email: user@example.com
              <br />Password: password12345
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;
