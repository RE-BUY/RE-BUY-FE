import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://192.168.45.170:8080",
  withCredentials: false,
});

export default axiosClient;
