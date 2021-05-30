<template>
  <transition name="backdrop" @enter="contentVisible = true">
    <div
      class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-end justify-center w-screen h-screen bg-black bg-opacity-50 sm:items-center"
    >
      <transition name="modal" @leave="emitEvent">
        <div
          v-if="contentVisible"
          class="relative flex flex-col w-screen max-h-screen p-8 -mb-6 bg-white border-2 border-black modal-body sm:w-auto sm:mb-0 rounded-3xl"
        >
          <close
            @click="closeModal"
            class="absolute z-40 w-4 h-4 text-black top-4 right-4"
          />
          <slot :closed="closeModal"></slot>
          <div class="flex mt-auto mb-2 space-x-8 sm:mb-0 justify-evenly"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import { mapState } from "vuex";
import Close from "./icons/Close.vue";
export default {
  name: "Modal",
  data() {
    return {
      contentVisible: false,
    };
  },
  computed: {
    ...mapState(["isLoading"]),
  },
  methods: {
    closeModal() {
      if (!this.isLoading) {
        this.contentVisible = false;
      }
    },
    emitEvent() {
      this.$emit("close");
    },
  },
  components: { Close },
};
</script>
<style scoped>
.modal-body {
  min-height: 50%;
}
@media screen and (min-width: 640px) {
  .modal-body {
    min-height: auto;
  }
}

.modal-enter,
.modal-leave-to {
  transform: translateY(100vh);
}

.modal-enter-active,
.modal-leave-active {
  transition: transform 500ms ease-out;
}

.backdrop-enter,
.backdrop-leave-to {
  opacity: 0;
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 200ms ease-in;
}
</style>
