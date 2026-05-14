import { useNavigate } from "react-router-dom";

function Navbar({
  showFavorites,
  setShowFavorites,
}) {

  const navigate = useNavigate();

  // GET USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // LOGOUT
  const handleLogout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (
    <nav className="sticky top-0 z-50 overflow-hidden backdrop-blur-2xl bg-slate-900/70 border-b border-slate-700/50 shadow-[0_8px_32px_0_rgba(15,23,42,0.8)] text-white px-4 sm:px-6 py-4 transition-all duration-500">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-10 left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute top-0 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>

      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">

        {/* LOGO */}
        <div className="group cursor-pointer">

          <h1 className="text-3xl sm:text-4xl font-black tracking-wide bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.7)]">

            🌦 Weather Dashboard

          </h1>

          <div className="h-[3px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500 group-hover:w-full"></div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full lg:w-auto">

          {/* FAVORITES BUTTON */}
          <button
            onClick={() =>
              setShowFavorites(!showFavorites)
            }
            className="relative overflow-hidden w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-500 shadow-xl hover:shadow-yellow-500/50 hover:scale-105 active:scale-95 transition-all duration-300 before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-white/20 before:skew-x-12 hover:before:left-[120%] before:transition-all before:duration-700"
          >

            <span className="relative z-10">
              {showFavorites
                ? "🌍 All Cities"
                : "⭐ Favorite Cities"}
            </span>

          </button>

          {/* USER INFO CARD */}
          <div className="group relative overflow-hidden text-center sm:text-right bg-white/5 backdrop-blur-lg px-5 py-3 rounded-2xl border border-white/10 shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">

            {/* GLOW EFFECT */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <p className="relative font-bold text-white text-sm sm:text-base tracking-wide">
              👤 {user?.name}
            </p>

            <p className="relative text-xs sm:text-sm text-slate-300 break-all">
              {user?.email}
            </p>

          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-red-500 via-pink-500 to-rose-600 hover:from-red-600 hover:to-pink-700 px-6 py-3 rounded-2xl font-bold shadow-xl hover:shadow-red-500/50 hover:scale-105 active:scale-95 transition-all duration-300 before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-white/20 before:skew-x-12 hover:before:left-[120%] before:transition-all before:duration-700"
          >

            <span className="relative z-10">
              🚪 Logout
            </span>

          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;