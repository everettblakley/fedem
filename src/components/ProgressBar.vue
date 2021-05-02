<template>
  <div>
    <p class="mb-2">{{ label }}</p>
    <div class="border-2 border-black rounded-xl h-6 overflow-hidden">
      <div class="bg-yellow-500 h-6" :style="width"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProgressBar",
  props: ["progress", "label"],
  computed: {
    /** @returns { string } */
    width() {
      return `width: ${this.progress}%;`;
    },
  },
};
</script>
