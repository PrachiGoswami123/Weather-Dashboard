import axios from "axios";

const API = axios.create({
  baseURL: "https://weather-dashboard-4n7u.onrender.com/api",
});

export default API;