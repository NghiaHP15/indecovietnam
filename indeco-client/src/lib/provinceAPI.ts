import axios from "axios";

const provinceApi = axios.create({
  baseURL: "https://provinces.open-api.vn/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default provinceApi;