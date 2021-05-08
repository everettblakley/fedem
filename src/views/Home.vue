<template>
  <div class="container mx-auto">
    <div
      v-for="group in groups"
      :key="group.name"
      class="grid grid-cols-1 md:grid-cols-3 gap-4 py-10 px-8 md:px-0"
    >
      <PetView
        class="mx-auto"
        v-for="(pet, index) in group.pets"
        :key="pet.name"
        :pet="pet"
        :alignment="index % 2 === 0 ? 'left' : 'right'"
        :setActivePet="setActivePet"
      />
    </div>
    <new-feeding :pet="activePet" v-on:close="closeModal" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import PetView from "../components/PetView.vue";
import NewFeeding from "../components/NewFeeding.vue";

export default {
  name: "Home",
  components: { PetView, NewFeeding },
  data() {
    return { selectedTab: null, activePet: null };
  },
  methods: {
    setActivePet(pet) {
      this.activePet = pet;
    },
    closeModal() {
      this.activePet = null;
    },
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
