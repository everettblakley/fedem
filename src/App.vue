<template>
  <div id="app h-screen">
    <loading :isLoading="isLoading"></loading>
    <navbar></navbar>
    <main class="pt-16 min-h-screen">
      <router-view />
    </main>
    <footer
      class="bg-yellow-500 p-4 text-black flex justify-center items-center"
    >
      &copy;
      <a class="ml-1" href="https://everettblakley.ca" target="_blank">
        Everett Blakley</a
      >
    </footer>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Loading from "./components/Loading.vue";
import { mapState } from "vuex";

export default {
  name: "app",
  components: {
    Navbar,
    Loading,
  },
  computed: {
    ...mapState(["isLoading"]),
  },
};
</script>

<style>
main {
  overflow: auto;
  height: 100%;
}
</style>
