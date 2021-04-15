<template>
  <div class="container">
    <div class="columns mt-4">
      <PetView v-for="pet in pets" v-bind:key="pet.name" v-bind:pet="pet" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PetView from "../components/PetView.vue";

export default {
  name: "Home",
  components: { PetView },
  computed: mapState(["pets"]),
};
</script>
