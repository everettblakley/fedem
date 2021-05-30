import Vue, { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VTooltip from "v-tooltip";
import VueSupabase from "vue-supabase";
import "./assets/tailwind.css";
import "./assets/main.css";
import "./assets/tooltip.css";

Vue.use(VTooltip, { defaultTrigger: "hover focus click" });

Vue.use(VueSupabase, {
  supabaseUrl: process.env.VUE_APP_SB_URL,
  supabaseKey: process.env.VUE_APP_SB_KEY,
});

createApp(App).use(router).use(store).mount("#app");
