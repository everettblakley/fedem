<template>
  <div>
    <p class="mb-2">{{ label }}</p>
    <div class="border-2 border-black rounded-xl h-6 overflow-hidden flex">
      <div class="bg-yellow-500 h-6" :style="regularStyle"></div>
      <div
        v-if="progress > 100"
        class="bg-red-500"
        :style="overflowStyle"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProgressBar",
  props: {
    progress: Number,
    label: String,
  },
  computed: {
    /** @returns { number } */
    regular() {
      if (this.progress <= 100) return this.progress;
      return 10000 / this.progress;
    },
    /** @returns { string } */
    regularStyle() {
      return `width: ${this.regular}%`;
    },
    /** @returns { string } */
    overflowStyle() {
      return `width: ${100 - this.regular}%`;
    },
  },
};
</script>
