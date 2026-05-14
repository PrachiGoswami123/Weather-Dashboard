import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        formData
      );

      toast.success("Login Successful");

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-4 py-10">

      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* LOGIN CARD */}
      <div className="relative w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(15,23,42,0.9)] p-8 sm:p-10 hover:shadow-cyan-500/20 transition-all duration-500">

        {/* TOP ICON */}
        <div className="flex justify-center mb-6">

          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-4xl shadow-lg shadow-cyan-500/30 animate-bounce">

            🌦

          </div>

        </div>

        {/* HEADING */}
        <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">

          Welcome Back

        </h1>

        <p className="text-slate-400 text-center mb-8 text-sm sm:text-base">
          Login to access your weather dashboard
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* EMAIL */}
          <div>

            <label className="text-slate-300 block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl bg-slate-900/70 text-white outline-none border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 transition-all duration-300 placeholder:text-slate-500"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="text-slate-300 block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl bg-slate-900/70 text-white outline-none border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 transition-all duration-300 placeholder:text-slate-500"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="relative overflow-hidden w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-blue-600 text-white py-3 rounded-2xl font-bold shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-white/20 before:skew-x-12 hover:before:left-[120%] before:transition-all before:duration-700"
          >

            <span className="relative z-10">
              Login
            </span>

          </button>

        </form>

        {/* REGISTER LINK */}
        <p className="text-slate-400 text-center mt-8 text-sm sm:text-base">

          Don’t have an account?{" "}

          <Link
            to="/register"
            className="text-cyan-400 font-semibold hover:text-cyan-300 hover:underline transition duration-300"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;