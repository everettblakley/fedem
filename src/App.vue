<template>
  <div id="app">
    <loading :isLoading="isLoading"></loading>
    <navbar></navbar>
    <main class="pt-12">
      <router-view />
    </main>
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
#app {
  height: 100%;
}

main {
  overflow: auto;
  height: 100%;
}
</style>
