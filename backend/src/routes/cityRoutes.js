const express = require("express");

const {
  addCity,
  getCities,
  toggleFavorite,
  deleteCity
} = require("../controllers/cityController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addCity);
router.get("/", protect, getCities);
router.put("/:id", protect, toggleFavorite);

// ✅ NEW DELETE ROUTE
router.delete("/:id", protect, deleteCity);

module.exports = router;