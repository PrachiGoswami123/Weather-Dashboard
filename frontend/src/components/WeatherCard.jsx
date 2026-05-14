function WeatherCard({
  weather,
  cityData,
  onFavorite,
  onDelete,
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-2xl font-bold text-white">
            {weather.name}
          </h2>

          <p className="text-slate-400 mt-1">
            {weather.weather[0].main}
          </p>
        </div>

        <button
          onClick={() => onFavorite(cityData._id)}
          className="text-2xl"
        >
          {cityData.isFavorite ? "❤️" : "🤍"}
        </button>

      </div>

      <div className="mt-6">

        <h1 className="text-5xl font-bold text-white">
          {Math.round(weather.main.temp)}°C
        </h1>

        <p className="text-slate-400 mt-2">
          Humidity: {weather.main.humidity}%
        </p>

      </div>

      <button
        onClick={() => onDelete(cityData._id)}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg text-white"
      >
        Delete
      </button>

    </div>
  );
}

export default WeatherCard;