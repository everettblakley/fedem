<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="fixed w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 pointer-events-none z-9999"
    >
      <spinner class="w-20 h-20 text-yellow-500 shadow-sm animate-spin" />
    </div>
  </transition>
</template>
<script>
import Spinner from "./icons/Spinner.vue";
export default {
  name: "Loading",
  components: { Spinner },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.z-9999 {
  z-index: 9999;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 350ms ease-in-out;
}
</style>
