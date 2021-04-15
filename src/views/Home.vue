<template>
  <div class="home">
    <div class="columns">
      <div
        class="column has-background-light has-text-dark"
        v-for="pet in pets"
        v-bind:key="pet.name"
      >
        {{ pet.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: mapState(["pets"]),
};
</script>
