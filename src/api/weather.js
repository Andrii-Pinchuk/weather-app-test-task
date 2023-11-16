export default function (instance) {
  return {
    getCities({ q, type }) {
      return instance.get("/find", { params: { q, type } });
    },
    getThreeHourForecast({ lat, lon, exclude }) {
      return instance.get("/forecast", { params: { lat, lon, exclude } });
    },
  };
}
