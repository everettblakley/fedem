<template>
  <div
    class="w-full mx-auto h-10 flex items-center px-8 py-8 bg-transparent absolute top-0 left-1/2 transform -translate-x-1/2 z-50"
  >
    <div class="relative z-20">
      <router-link to="/"><h5>FedEmAt</h5></router-link>
    </div>
    <div class="ml-auto relative">
      <div class="md:hidden">
        <div
          class="w-8 h-8 text-black relative z-20"
          @click="menuOpen = !menuOpen"
        >
          <hamburger v-if="menuOpen === false"></hamburger>
          <close v-else></close>
        </div>
        <blob
          class="absolute text-yellow-500 z-10 blob"
          :class="{ 'blob-open': menuOpen, 'blob-closed': !menuOpen }"
        ></blob>
      </div>
      <div class="hidden md:block">Desktop menu stuff</div>
    </div>
    <transition name="menu">
      <ul
        v-if="menuOpen"
        class="absolute z-20 w-screen top-32 left-0 flex flex-col items-center space-y-4"
      >
        <router-link v-if="user" to="/profile" active-class="text-white"
          ><h6>Profile</h6></router-link
        >
        <router-link v-if="user" to="/logout" active-class="text-white"
          ><h6>Logout</h6></router-link
        >
        <router-link v-if="!user" to="/login" active-class="text-white"
          ><h6>Login</h6></router-link
        >
        <router-link v-if="!user" to="/sign-up" active-class="text-white"
          ><h6>Sign up</h6></router-link
        >
        <router-link to="/about" active-class="text-white"
          ><h6>About</h6></router-link
        >
      </ul>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Hamburger from "./Hamburger.vue";
import Close from "./Close.vue";
import Blob from "./Blob.vue";
export default {
  name: "Navbar",
  components: { Hamburger, Blob, Close },
  data() {
    return {
      menuOpen: false,
    };
  },
  mounted() {
    this.$router.beforeEach((to, from, next) => {
      this.menuOpen = false;
      next();
    });
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
<style scoped>
.blob {
  transition: all 0.5s ease-in-out;
}
.blob-closed {
  top: -9vh;
  left: -6vh;
  width: 9rem;
  height: 9rem;
}
.blob-open {
  width: 100vh;
  height: 100vh;
  top: -40vh;
  left: -50vh;
}
.menu-enter,
.menu-leave-to {
  opacity: 0;
}

.menu-enter-active {
  transition: opacity 500ms ease-in-out 500ms;
}
</style>
