<template>
  <div
    class="fixed top-0 z-40 flex items-center w-full h-10 px-8 py-8 mx-auto transform -translate-x-1/2 bg-white left-1/2 shawdow"
    :class="{ 'pointer-events-none': isLoading }"
  >
    <div class="z-20 p-2 rounded">
      <router-link to="/" tabindex="1"><h5>FedEmAt</h5></router-link>
    </div>
    <div v-if="authenticated" class="ml-auto">
      <div class="sm:hidden" id="mobile-menu">
        <div class="relative z-20 w-8 h-8 text-black" @click="toggleMenu">
          <close v-if="menuOpen"></close>
          <hamburger v-else></hamburger>
        </div>
        <blob
          class="fixed z-10 text-yellow-500 blob"
          :class="{ 'blob-open': menuOpen, 'blob-closed': !menuOpen }"
        ></blob>
      </div>
      <Menu class="relative hidden sm:inline-block" as="div" id="desktop-menu">
        <MenuButton
          class="relative flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-full focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-black"
          @click="toggleMenu"
          tabindex="0"
        >
          EB
        </MenuButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute mt-0.5 right-0 bg-white border-2 border-black rounded focus-visible:outline-none"
            ><div class="flex flex-col items-center p-2 space-y-2">
              <MenuItem v-slot="{ active }" v-if="authenticated">
                <router-link
                  to="/profile"
                  active-class="underline"
                  as="button"
                  :class="[active ? 'bg-yellow-500' : '', 'py-2 px-8']"
                  >Profile</router-link
                >
              </MenuItem>
              <MenuItem v-slot="{ active }" v-if="authenticated">
                <router-link
                  :to="{ name: 'Logout' }"
                  as="button"
                  :class="[active ? 'bg-yellow-500' : '', 'py-2 px-8']"
                  >Logout</router-link
                >
              </MenuItem>
              <MenuItem v-slot="{ active }" v-if="!authenticated">
                <router-link
                  :to="{ name: 'Login' }"
                  active-class="underline"
                  as="button"
                  :class="[active ? 'bg-yellow-500' : '', 'py-2 px-8']"
                  >Login</router-link
                >
              </MenuItem>
              <MenuItem v-slot="{ active }" v-if="!authenticated">
                <router-link
                  to="/sign-up"
                  active-class="underline"
                  as="button"
                  :class="[active ? 'bg-yellow-500' : '', 'py-2 px-8']"
                  >Sign up</router-link
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link
                  to="/about"
                  active-class="underline"
                  as="button"
                  :class="[active ? 'bg-yellow-500' : '', 'py-2 px-8']"
                  >About</router-link
                >
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    <transition name="mobile-menu">
      <div
        v-if="menuOpen"
        class="absolute left-0 z-20 w-screen top-32 sm:hidden"
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
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

export default {
  name: "Navbar",
  components: {
    Hamburger,
    Blob,
    Close,
    NavbarContent,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },
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
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-active {
  transition: opacity 500ms ease-in-out 500ms;
}
</style>
