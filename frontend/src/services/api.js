import axios from "axios";

const API = axios.create({
  baseURL: "https://storemanagement-c9po.onrender.com/api",
});

export default API;
