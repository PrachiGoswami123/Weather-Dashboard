const express = require("express");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const cityRoutes = require("./routes/cityRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

// Middleware
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/weather", weatherRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Weather Backend Running");
});

// Error Handler (ALWAYS LAST)
app.use(errorHandler);

module.exports = app;