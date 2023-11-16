import instance from "@/api/instance";
import weather from "./weather";

export default {
  weather: weather(instance),
};
