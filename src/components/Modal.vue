<template>
  <transition name="backdrop" @enter="contentVisible = true">
    <div
      class="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen flex justify-center items-end sm:items-center bg-black bg-opacity-50 z-50"
    >
      <transition name="modal" @leave="emitEvent">
        <div
          v-if="contentVisible"
          class="modal-body max-h-screen w-screen sm:w-auto -mb-6 sm:mb-0 bg-white rounded-3xl border-2 border-black p-8 flex flex-col relative"
        >
          <close
            @click.native="closeModal"
            class="absolute top-4 right-4 w-4 h-4 text-black z-40"
          />
          <slot :closed="closeModal"></slot>
          <div class="mt-auto mb-2 sm:mb-0 flex justify-evenly space-x-8"></div>
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
