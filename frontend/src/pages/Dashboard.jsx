import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import AddCityForm from "../components/AddCityForm";
import WeatherCard from "../components/WeatherCard";

import API from "../services/api";

function Dashboard() {

  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // PROTECTED ROUTE + FETCH CITIES
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchCities();

  }, []);

  // FETCH CITIES
  const fetchCities = async () => {
    try {

      const res = await API.get("/city", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCities(res.data.data);

      fetchWeather(res.data.data);

    } catch (err) {
      toast.error("Failed to fetch cities");
    }
  };

  // FETCH WEATHER
  const fetchWeather = async (citiesList) => {
    try {

      const weatherPromises = citiesList.map(async (city) => {

        const res = await API.get(
          `/weather/${city.cityName}`
        );

        return {
          cityData: city,
          weather: res.data.data,
        };
      });

      const results = await Promise.all(weatherPromises);

      setWeatherData(results);

    } catch (err) {
      toast.error("Weather fetch failed");
    }
  };

  // ADD CITY
  const addCity = async (cityName) => {
    try {

      await API.post(
        "/city/add",
        { cityName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("City Added");

      fetchCities();

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Failed"
      );

    }
  };

  // TOGGLE FAVORITE
  const toggleFavorite = async (id) => {
    try {

      await API.put(
        `/city/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCities();

    } catch (err) {
      toast.error("Favorite failed");
    }
  };

  // DELETE CITY
  const deleteCity = async (id) => {
    try {

      await API.delete(`/city/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("City Deleted");

      fetchCities();

    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // FAVORITE CITIES
  const favoriteCities = weatherData.filter(
    (item) => item.cityData.isFavorite
  );

  // DISPLAYED CITIES
  const displayedCities = showFavorites
    ? favoriteCities
    : weatherData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 blur-3xl rounded-full animate-pulse"></div>

      {/* NAVBAR */}
      <Navbar
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 relative z-10">

        {/* ADD CITY FORM */}
        <div className="mb-10 animate-fade-in">

          <AddCityForm onAddCity={addCity} />

        </div>

        {/* EMPTY STATE */}
        {displayedCities.length === 0 ? (

          <div className="flex flex-col items-center justify-center mt-24 text-center animate-bounce">

            <div className="text-7xl mb-6">

              {showFavorites ? "⭐" : "🌍"}

            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">

              {showFavorites
                ? "No Favorite Cities Yet"
                : "No Cities Added Yet"}

            </h2>

            <p className="text-slate-400 text-sm sm:text-base max-w-md">

              {showFavorites
                ? "Mark cities as favorite to see them here instantly."
                : "Add your first city and track live weather updates beautifully."}

            </p>

          </div>

        ) : (

          <>
            {/* SECTION TITLE */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">

              <div>

                <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                  {showFavorites
                    ? "⭐ Favorite Cities"
                    : "🌍 All Cities"}

                </h2>

                <p className="text-slate-400 mt-2 text-sm sm:text-base">

                  {displayedCities.length} Cities Available

                </p>

              </div>

              {/* LIVE BADGE */}
              <div className="flex items-center gap-2 bg-slate-800/70 border border-slate-700 px-4 py-2 rounded-full shadow-lg">

                <span className="w-3 h-3 rounded-full bg-green-400 animate-ping"></span>

                <span className="text-sm text-slate-300 font-medium">
                  Live Weather Updates
                </span>

              </div>

            </div>

            {/* WEATHER CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {displayedCities.map((item, index) => (
                <div
                  key={item.cityData._id}
                  className="transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >

                  <WeatherCard
                    cityData={item.cityData}
                    weather={item.weather}
                    onFavorite={toggleFavorite}
                    onDelete={deleteCity}
                  />

                </div>
              ))}

            </div>
          </>

        )}

      </div>

    </div>
  );
}

export default Dashboard;