<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="w-screen h-screen flex justify-center items-center bg-black bg-opacity-10 pointer-events-none"
    >
      <blob class="max-w-xs text-yellow-500 animate-pulse">
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
  transition: opacity 0.5s ease-in-out;
}

.spinning {
  animation: spin 4s ease-in-out infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
