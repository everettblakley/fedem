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
    <modal v-show="!!activePet" v-on:close="closeModal">
      <template #default="{ closed }">
        <div v-if="!!activePet" class="flex flex-col items-center">
          <h5>Feeding {{ activePet.name }}</h5>
          <form class="form my-4 w-full">
            <div class="group justify-end">
              <label for="datetime">When did you feed 'em at?</label>
              <div
                class="flex border-2 border-black p-3 rounded-3xl justify-between"
              >
                <input type="date" />
                <input type="time" step="900" />
              </div>
            </div>
            <div class="flex items-end">
              <text-input
                class="min-w-0 flex-1 mr-4"
                label="How much did you feed 'em?"
                type="number"
                id="quantity"
                value="0"
              />
              <text-input
                class="min-w-0 flex-1"
                label="Unit"
                type="text"
                id="unit"
                value=""
              />
            </div>
            <div class="flex justify-between mt-4 space-x-4 items-end">
              <button class="btn flex-1" @click="closed" type="button">
                Cancel
              </button>
              <button class="btn flex-1 bg-yellow-500">Submit</button>
            </div>
          </form>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PetView from "../components/PetView.vue";
import Modal from "../components/Modal.vue";
import TextInput from "../components/input/TextInput.vue";

export default {
  name: "Home",
  components: { PetView, Modal, TextInput },
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
