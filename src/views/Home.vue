<template>
  <div class="container">
    <div class="columns mt-4">
      <b-tabs
        v-if="tabs.length > 1"
        v-model="selectedTab"
        type="is-boxed"
        class="w-100"
      >
        <template v-for="tab in tabs">
          <b-tab-item :key="tab" :value="tab" :label="tab">
            <div v-if="selectedGroup" class="columns">
              <PetView
                v-for="pet in selectedGroup.pets"
                v-bind:key="pet.name"
                v-bind:pet="pet"
              />
            </div>
          </b-tab-item>
        </template>
      </b-tabs>
      <div v-else-if="tabs.length === 1" class="columns">
        <PetView
          v-for="pet in selectedGroup.pets"
          v-bind:key="pet.name"
          v-bind:pet="pet"
        />
      </div>
      <div v-else>
        <h5 class="is-size-3">You currently aren't in any groups</h5>
        <router-link class="has-text-link" to="#"
          >Click here to create a new group</router-link
        >
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

<style>
.w-100 {
  width: 100%;
}
</style>
