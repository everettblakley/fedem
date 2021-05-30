import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Logout from "../views/Logout.vue";
import NotFound from "../views/NotFound.vue";
import Profile from "../views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
