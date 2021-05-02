<template>
  <div
    class="w-full mx-auto h-10 flex items-center px-8 py-8 bg-transparent absolute top-0 left-1/2 transform -translate-x-1/2 z-50"
  >
    <div>
      <router-link to="/"><h5>FedEmAt</h5></router-link>
    </div>
    <div class="ml-auto relative">
      <div class="md:hidden">
        <hamburger class="w-8 h-8 z-20 text-black"></hamburger>
        <blob class="absolute w-36 h-36 text-yellow-500 z-10 blob"></blob>
      </div>
      <div class="hidden md:block">Desktop menu stuff</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Hamburger from "./Hamburger.vue";
import Blob from "./Blob.vue";
export default {
  name: "Navbar",
  components: { Hamburger, Blob },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
<style scoped>
.blob {
  top: -60px;
  right: -70px;
}
</style>
