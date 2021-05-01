<template>
  <div class="container mx-auto divide-y-2">
    <div
      v-for="group in groups"
      :key="group.name"
      class="grid grid-cols-1 md:grid-cols-3 gap-4 py-10 px-8 md:px-0"
    >
      <PetView
        class="mx-auto"
        v-for="pet in group.pets"
        v-bind:key="pet.name"
        v-bind:pet="pet"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PetView from "../components/PetView.vue";

export default {
  name: "Home",
  components: { PetView },
  data() {
    return { selectedTab: null };
  },
  computed: {
    /** @returns { string[] } */
    tabs() {
      if (!this.groups) return [];
      return Object.keys(this.groups);
    },
    /** @returns { any } */
    selectedGroup() {
      if (!this.selectedTab) return null;
      return this.groups[this.selectedTab];
    },
    ...mapState(["groups"]),
  },
  mounted() {
    if (this.tabs.length) {
      this.selectedTab = this.tabs[0];
    }
  },
};
</script>
