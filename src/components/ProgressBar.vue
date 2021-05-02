<template>
  <div class="border-2 border-black rounded-xl h-6 overflow-hidden">
    <div class="bg-yellow-500 h-6" :style="width"></div>
  </div>
</template>
<script>
export default {
  name: "ProgressBar",
  props: ["progress"],
  computed: {
    /** @returns { string } */
    width() {
      return `width: ${this.progress}%;`;
    },
  },
};
</script>
