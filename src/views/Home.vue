<template>
  <div class="container">
    <div class="columns mt-4">
      <div v-for="tab in tabs" :key="tab">
        <div v-if="selectedGroup" class="columns">
          <PetView
            v-for="pet in selectedGroup.pets"
            v-bind:key="pet.name"
            v-bind:pet="pet"
          />
        </div>
      </div>
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
