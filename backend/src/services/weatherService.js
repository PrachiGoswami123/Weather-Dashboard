const axios = require("axios");

const getWeather = async (city) => {
  const API_KEY = process.env.WEATHER_API_KEY;

  const geo = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );

  const { lat, lon } = geo.data[0];

  const weather = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  return weather.data;
};

module.exports = getWeather;