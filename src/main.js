import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VTooltip from "v-tooltip";
import "./assets/tailwind.css";
import "./assets/main.css";
import "./assets/tooltip.css";

Vue.config.productionTip = false;
Vue.use(VTooltip, { defaultTrigger: "hover focus click" });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
