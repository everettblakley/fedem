import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VTooltip from "v-tooltip";
import VueSupabase from "vue-supabase";
import "./assets/tailwind.css";
import "./assets/main.css";
import "./assets/tooltip.css";

Vue.config.productionTip = false;
Vue.use(VTooltip, { defaultTrigger: "hover focus click" });

Vue.use(VueSupabase, {
  supabaseUrl: process.env.VUE_APP_SB_URL,
  supabaseKey: process.env.VUE_APP_SB_KEY,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
