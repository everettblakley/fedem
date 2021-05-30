<template>
  <div
    class="relative flex flex-col w-full h-auto p-8 overflow-hidden border-2 border-black rounded-2xl"
  >
    <corner-doodle
      :alignment="alignment"
      :type="pet.type"
      class="absolute top-0 right-0 z-0 w-full h-full"
    ></corner-doodle>
    <div class="z-10 flex flex-col justify-between mb-8 space-y-8">
      <h3 class="hard-shadow-orange">
        {{ pet.name }}
      </h3>
      <div>
        <h6>Last feeding:</h6>
        <p>
          {{ lastFeeding.amount }} {{ amountString(lastFeeding.amount) }} of
          {{ lastFeeding.food }},
          {{ lastFeeding.timestamp }}
        </p>
      </div>

      <progress-bar
        v-for="food in pet.food"
        :key="food.name"
        :progress="progress(food)"
        :max="getMax(food.name)"
        :label="food.name"
      ></progress-bar>
    </div>
    <button
      class="z-20 mx-auto mt-auto bg-yellow-500 btn"
      :disabled="isLoading"
      @click="setActivePet(pet)"
    >
      Add Feeding
    </button>
  </div>
</template>

<script>
import isToday from "date-fns/isToday";
import formatRelative from "date-fns/formatRelative";
import CornerDoodle from "./CornerDoodle.vue";
import ProgressBar from "./ProgressBar.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "PetView",
  props: {
    pet: Object,
    alignment: { type: String, default: "left" },
    setActivePet: {
      type: Function,
    },
  },
  data() {
    return {
      feedings: [],
      newFeeding: {
        timestamp: new Date(),
        amount: 0,
      },
    };
  },
  mounted() {
    if (!this.pet.feedings) return;
    const feedings = [...this.pet.feedings];
    this.feedings = feedings.sort((a, b) =>
      a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0
    );
  },
  computed: {
    /** @returns {any} */
    lastFeeding() {
      const nullFeeding = { amount: 0, timestamp: new Date() };
      if (!this.feedings) return nullFeeding;
      const last = this.feedings[0];
      if (!last) return nullFeeding;
      return {
        amount: last.amount,
        food: last.food,
        timestamp: formatRelative(last.timestamp, new Date()),
      };
    },
    ...mapState(["isLoading"]),
  },
  methods: {
    amountString(amount) {
      return amount === 1 ? "cup" : "cups";
    },
    submitForm(e) {
      e.preventDefault();
      this.setIsLoading(true);
      setTimeout(() => this.setIsLoading(false), 1000);
    },
    progress(food) {
      const feedings = this.getFeedings(food.name);
      const todaysFeedings = feedings.filter((feeding) =>
        isToday(feeding.timestamp)
      );
      const total = todaysFeedings.reduce(
        (total, current) => (total += current.amount),
        0
      );
      const max = this.getMax(food.name);
      if (!max) return 0;
      return (total / max) * 100;
    },
    getFeedings(name) {
      return this.pet.feedings.filter((feeding) => feeding.food === name);
    },
    getMax(name) {
      return this.pet.food.find((f) => f.name === name)?.max;
    },
    ...mapMutations(["setIsLoading"]),
  },
  components: { CornerDoodle, ProgressBar },
};
</script>
