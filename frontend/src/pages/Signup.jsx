import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="bg-[#00061a] flex rounded-xl min-h-svh w-full items-center justify-center p-6 md:p-10">
      
      <div className="flex w-full max-w-5xl flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Left Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src="public/assets/signch.jpg"
            alt="signup_image"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Signup Form */}
        <div className="md:w-1/2 bg-[#007E6E] p-8 md:p-12 flex items-center">
          <form className="w-full">

            <h2 className="text-4xl md:text-5xl font-bold mb-3">Signup</h2>
            <p className="text-lg md:text-xl mb-6">Hello!</p>

            <div className="mb-4">
              <label htmlFor="username" className="block text-lg mb-1">
                Username :
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg active:scale-105 transition-transform"
            >
              SIGN UP
            </button>

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
  );
}
