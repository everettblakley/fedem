<template>
  <div
    class="w-full mx-auto h-10 flex items-center px-8 py-8 bg-white fixed top-0 left-1/2 transform -translate-x-1/2 z-40 shawdow"
    :class="{ 'pointer-events-none': isLoading }"
  >
    <div class="z-20 p-2 rounded">
      <router-link to="/"><h5>FedEmAt</h5></router-link>
    </div>
    <div v-if="authenticated" class="ml-auto">
      <div class="sm:hidden" id="mobile-menu">
        <div class="w-8 h-8 text-black relative z-20" @click="toggleMenu">
          <close v-if="menuOpen"></close>
          <hamburger v-else></hamburger>
        </div>
        <blob
          class="fixed text-yellow-500 z-10 blob"
          :class="{ 'blob-open': menuOpen, 'blob-closed': !menuOpen }"
        ></blob>
      </div>
      <div class="hidden sm:block" id="desktop-menu">
        <div
          class="h-10 w-10 rounded-full relative cursor-pointer flex justify-center items-center bg-yellow-500 focus:ring-2 focus:ring-black focus:ring-offset-2 outline-none"
          @click="toggleMenu"
        >
          EB
        </div>
        <transition name="dropdown">
          <div
            v-if="menuOpen"
            class="absolute mt-0.5 right-0 py-4 px-8 mr-8 bg-white rounded border-black border-2"
            v-on-clickaway="toggleMenu"
          >
            <navbar-content :authenticated="authenticated"></navbar-content>
          </div>
        </transition>
      </div>
    </div>
    <transition name="mobile-menu">
      <div
        v-if="menuOpen"
        class="absolute z-20 w-screen top-32 left-0 sm:hidden"
        v-on-clickaway="toggleMenu"
      >
        <navbar-content :authenticated="authenticated"></navbar-content>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Hamburger from "./icons/Hamburger.vue";
import Close from "./icons/Close.vue";
import Blob from "./illustrations/Blob.vue";
import NavbarContent from "./NavbarContent";
import { mixin as clickaway } from "vue-clickaway";

export default {
  name: "Navbar",
  mixins: [clickaway],
  components: { Hamburger, Blob, Close, NavbarContent },
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
    ...mapState(["user", "isLoading"]),
    ...mapGetters(["authenticated"]),
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>
<style scoped>
.blob {
  transition: all 0.5s ease-in-out;
  top: -3.5rem;
  right: -3rem;
  width: 9rem;
  height: 9rem;
}
.blob-open {
  /* Should probably do some math for this, but 🤷🏻‍♂️ */
  transform: scale(8);
}
.mobile-menu-enter,
.mobile-menu-leave-to,
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
}

.mobile-menu-enter-active {
  transition: opacity 500ms ease-in-out 500ms;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 200ms ease;
}
</style>
