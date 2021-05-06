<template>
  <div>
    <div class="w-full h-full relative">
      <blob
        class="w-full h-full text-yellow-500 absolute -top-1/2 -right-1/2"
        :style="blobStyle"
      ></blob>
      <div class="doodle absolute top-0 -right-12 w-36">
        <cat v-if="type === 'cat'"></cat>
        <dog v-if="type === 'dog'"></dog>
      </div>
    </div>
  </div>
</template>

<script>
import Blob from "./illustrations/Blob.vue";
import Dog from "./illustrations/Dog.vue";
import Cat from "./illustrations/Cat.vue";
export default {
  name: "CornerDoodle",
  props: ["alignment", "type"],
  components: { Blob, Cat, Dog },
  data: function () {
    return {
      blobAngle: 0,
    };
  },
  computed: {
    /** @returns { string } */
    blobStyle() {
      return `transform: rotate(${this.blobAngle}deg)`;
    },
  },
  created() {
    this.blobAngle = Math.floor(Math.random() * 360);
  },
};
</script>

<style scoped>
.doodle {
}
</style>
