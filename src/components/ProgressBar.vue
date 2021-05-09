<template>
  <div>
    <div class="flex items-center mb-2">
      <p class="mr-2">{{ label }}</p>
      <info
        class="w-4 h-4 text-gray-600"
        v-tooltip="{ content: tooltipText }"
      ></info>
    </div>
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
import Info from "./icons/Info.vue";
export default {
  name: "ProgressBar",
  components: { Info },
  props: {
    progress: Number,
    max: Number,
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
      return `width: ${Math.ceil(100 - this.regular)}%`;
    },
    /** @returns { string } */
    tooltipText() {
      const amount = parseFloat(this.max * (this.progress / 100))
        .toFixed(2)
        .replace(/\.00$/, "");
      return `${amount} out of ${this.max} cups`;
    },
  },
};
</script>
