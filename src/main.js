import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import apiPlugin from "./plugins/api";
import "./assets/styles/normalize.css";
import "./assets/styles/main.scss";

createApp(App).use(store).use(router).use(apiPlugin).mount("#app");
