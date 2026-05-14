const fetchWeather = require("../services/weatherService");

exports.getWeather = async (req, res) => {
  try {
    const city = req.params.city;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required",
      });
    }

    const data = await fetchWeather(city);

    res.status(200).json({
      success: true,
      data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Weather error",
    });
  }
};