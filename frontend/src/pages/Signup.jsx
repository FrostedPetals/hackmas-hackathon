import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  let [password, setPassword] = useState('');
  let [email, setEmail] = useState('');
  let [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, email, password };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL
        }/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await response.json();

      console.log("Response from backend:", data);
      if (data.status === "error") {
        alert(data.error.msg);
        return;
      }
      else {
        setName("");
        setEmail("");
        setPassword("");
        alert(
          "Signup successful! 🎉\n\nPlease check your email to verify your account before logging in."
        );

        navigate("/login");
      }

    } catch (err) {
      console.error("Error submitting form:", err);
    }
  }

  return (
    <>

      <div className="flex rounded-xl min-h-svh w-full items-center justify-center p-6 md:p-10">

        <div className="flex w-full max-w-5xl flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">

          <div className="md:w-1/2 h-64 md:h-auto">
            <img
              src="public/assets/signch.jpg"
              alt="signup_image"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="md:w-1/2 bg-[#007E6E] p-8 md:p-12 flex items-center">
            <form onSubmit={handleSubmit} className="w-full">

              <h2 className="text-4xl md:text-5xl font-bold mb-3">Signup</h2>
              <p className="text-lg md:text-xl mb-6">Hello!</p>

              <div className="mb-4">
                <label htmlFor="username" className="block text-lg mb-1">
                  Username :
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="username"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-lg mb-1">
                  Email address :
                </label>
                <input
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
                SIGN UP
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
                Already have an account?{" "}
                <Link to="/login" className="underline font-semibold">
                  Login
                </Link>
              </p>

              <p className="mt-4 text-sm">
                <br />Demo User: xyz
                <br />Email: user@example.com
                <br />Password: password12345
              </p>

            </form>
          </div>

        </div>
      </div>
    </>
  );
}
