const City = require("../models/city");

// ADD CITY
exports.addCity = async (req, res) => {
  try {
    const { cityName } = req.body;

    if (!cityName) {
      return res.status(400).json({
        success: false,
        message: "City name required",
      });
    }

    const existingCity = await City.findOne({
      userId: req.user.id,
      cityName,
    });

    if (existingCity) {
      return res.status(400).json({
        success: false,
        message: "City already exists",
      });
    }

    const city = await City.create({
      userId: req.user.id,
      cityName,
    });

    res.status(201).json({
      success: true,
      data: city,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET CITIES
exports.getCities = async (req, res) => {
  try {
    const cities = await City.find({ userId: req.user.id });

    res.json({
      success: true,
      data: cities,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// TOGGLE FAVORITE
exports.toggleFavorite = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }

    city.isFavorite = !city.isFavorite;
    await city.save();

    res.json({
      success: true,
      data: city,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }

    await city.deleteOne();

    res.json({
      success: true,
      message: "City deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};