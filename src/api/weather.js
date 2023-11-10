export default function (instance) {
  return {
    getCities({ q, type }) {
      return instance.get("/find", { params: { q, type } });
    },
  };
}
