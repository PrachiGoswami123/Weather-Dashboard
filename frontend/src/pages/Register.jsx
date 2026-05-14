import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";
import toast from "react-hot-toast";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/register",
        formData
      );

      toast.success("Registration Successful");

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
        "Registration Failed"
      );

    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-4 py-10">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* REGISTER CARD */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-slate-900/70 border border-slate-700 shadow-[0_0_40px_rgba(34,197,94,0.25)] rounded-3xl p-6 sm:p-8 hover:scale-[1.01] transition-all duration-500">

        {/* TOP ICON */}
        <div className="flex justify-center mb-5">

          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center text-4xl shadow-lg shadow-green-500/40 animate-bounce">

            🌦

          </div>

        </div>

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">

          Create Account

        </h1>

        <p className="text-center text-slate-400 mb-8 text-sm sm:text-base">
          Join the Weather Dashboard 🚀
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* NAME */}
          <div>

            <label className="text-slate-300 block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 text-white border border-slate-700 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-500/30 transition-all duration-300 placeholder:text-slate-500 hover:border-green-400"
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="text-slate-300 block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 text-white border border-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 placeholder:text-slate-500 hover:border-cyan-400"
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
              className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 text-white border border-slate-700 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/30 transition-all duration-300 placeholder:text-slate-500 hover:border-pink-400"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 hover:from-green-600 hover:via-emerald-600 hover:to-cyan-600 shadow-lg hover:shadow-green-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >

            Create Account 🚀

          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-slate-400 text-center mt-8 text-sm sm:text-base">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition duration-300"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;