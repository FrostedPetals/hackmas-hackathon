import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="bg-[#00061a] rounded-xl flex min-h-svh w-full items-center justify-center p-6 md:p-10">

      <div className="flex w-full max-w-5xl flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src="public/assets/loginch.jpeg"
            alt="login_image"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="md:w-1/2 bg-[#007E6E] p-8 md:p-12 flex items-center">
          <form className="w-full">

            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Login
            </h2>
            <p className="text-lg md:text-xl mb-6">Welcome back!</p>

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
              LOG IN
            </button>

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
