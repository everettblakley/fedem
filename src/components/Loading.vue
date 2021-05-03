<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="fixed w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 pointer-events-none z-50"
    >
      <blob class="max-w-xs text-yellow-500">
        <h6
          class="text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          Loading...
        </h6>
      </blob>
    </div>
  </transition>
</template>
<script>
import Blob from "./Blob.vue";
export default {
  name: "Loading",
  components: { Blob },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 350ms ease-in-out;
}
</style>
