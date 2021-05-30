import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VTooltip from "v-tooltip";
import "./assets/tailwind.css";
import "./assets/main.css";
import "./assets/tooltip.css";

createApp(App)
  .use(router)
  .use(store)
  .use(VTooltip, { defaultTrigger: "hover focus click" })
  .mount("#app");
