<template>
  <div
    class="border-2 border-black rounded-2xl p-8 w-full h-auto relative overflow-hidden flex flex-col"
  >
    <corner-doodle
      :alignment="alignment"
      :type="pet.type"
      class="absolute top-0 right-0 w-full h-full z-0"
    ></corner-doodle>
    <div class="flex flex-col justify-between space-y-8 mb-8 z-10">
      <h3 class="hard-shadow-orange">
        {{ pet.name }}
      </h3>
      <div>
        <h6>Last feeding:</h6>
        <p>
          {{ lastFeeding.amount }} {{ amountString(lastFeeding.amount) }},
          {{ lastFeeding.timestamp }}
        </p>
      </div>

      <progress-bar
        v-for="food in pet.food"
        :key="food.name"
        :progress="0"
        :feedings="getFeedings(food.name)"
        :label="food.name"
      ></progress-bar>
    </div>
    <button class="btn bg-yellow-500 mt-auto mx-auto z-20" @click="submitForm">
      Add Feeding
    </button>
  </div>
</template>

<script>
import isSameDay from "date-fns/isSameDay";
import formatRelative from "date-fns/formatRelative";
import CornerDoodle from "./CornerDoodle.vue";
import ProgressBar from "./ProgressBar.vue";
import { mapMutations } from "vuex";

export default {
  name: "PetView",
  props: { pet: Object, alignment: { type: String, default: "left" } },
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
    this.feedings = this.pet.feedings.sort((a, b) =>
      a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0
    );
  },
  computed: {
    /** @returns { string } */
    progressType() {
      const { percent } = this.totalFed;
      if (!percent || percent < 75) return "is-success";
      if (percent >= 75 && percent < 90) return "is-warning";
      return "is-danger";
    },
    /** @returns {any} */
    lastFeeding() {
      const nullFeeding = { amount: 0, timestamp: new Date() };
      if (!this.feedings) return nullFeeding;
      const last = this.feedings[0];
      if (!last) return nullFeeding;
      return {
        amount: last.amount,
        timestamp: formatRelative(last.timestamp, new Date()),
      };
    },
    /** @returns {any} */
    totalFed() {
      const { feedings, max } = this.pet;
      if (!feedings || !max) return null;
      const today = new Date();
      const todaysFeedings = feedings.filter((f) =>
        isSameDay(f.timestamp, today)
      );
      const total = todaysFeedings.reduce(
        (total, current) => total + current.amount,
        0
      );
      return { percent: (total / max) * 100, value: total };
    },
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
    getFeedings(name) {
      return this.pet.feedings.filter((feeding) => feeding.name === name);
    },
    ...mapMutations(["setIsLoading"]),
  },
  components: { CornerDoodle, ProgressBar },
};
</script>
