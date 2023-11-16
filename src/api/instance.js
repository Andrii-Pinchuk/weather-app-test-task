import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_OPENWEATHER_API_URL,
  params: {
    appid: process.env.VUE_APP_OPENWEATHER_API_KEY,
    units: "metric",
  },
});

export default instance;
