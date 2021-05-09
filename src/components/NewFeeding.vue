<template>
  <modal v-show="!!pet" v-on="$listeners">
    <template #default="{ closed }">
      <div v-if="!!pet" class="flex flex-col items-center">
        <h5>Feeding {{ pet.name }}</h5>
        <form class="form my-4 w-full" @submit.prevent="submit">
          <div class="group justify-end">
            <label for="datetime">When did you feed 'em at?</label>
            <div
              class="flex border-2 border-black p-3 rounded-3xl justify-between"
            >
              <input type="date" :value="date" @change="setDate" />
              <input type="time" :value="time" @change="setTime" />
            </div>
          </div>
          <div class="group" v-if="pet && pet.food.length > 1">
            <label for="food">Food Type</label>
            <select name="food" id="food" v-model="feeding.food">
              <option disabled value="">Select a food type</option>
              <option
                v-for="food in pet.food"
                :key="food.name"
                :value="food.name"
              >
                {{ food.name }}
              </option>
            </select>
          </div>
          <div class="flex items-end">
            <text-input
              class="min-w-0 flex-1 mr-4"
              label="How much?"
              type="number"
              id="amount"
              :error="errors.amount"
              v-model="feeding.amount"
            />
            <div class="group">
              <label for="unit">Unit</label>
              <select name="unit" id="unit" v-model="feeding.unit">
                <option value="cups">Cups</option>
                <option value="tbsp">Tablespoon</option>
                <option value="tsp">Teaspoon</option>
              </select>
            </div>
          </div>
          <div class="flex justify-between mt-4 space-x-4 items-end">
            <button class="btn flex-1" @click="closed" type="button">
              Cancel
            </button>
            <button class="btn flex-1 bg-yellow-500" type="submit=">
              Submit
            </button>
          </div>
        </form>
      </div>
    </template>
  </modal>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import Modal from "./Modal.vue";
import TextInput from "./input/TextInput.vue";
import format from "date-fns/format";

const nullFeeding = (pet) => ({
  timestamp: new Date(),
  pet: { ...pet },
  amount: 0,
  food: null,
  unit: "cups",
});

export default {
  name: "NewFeeding",
  props: {
    pet: {
      type: Object,
    },
  },
  data() {
    return {
      feeding: nullFeeding(this.pet),
      errors: {
        timestamp: "",
        amount: "",
      },
    };
  },
  computed: {
    /** @returns { string } */
    date() {
      return format(this.feeding.timestamp, "yyyy-MM-dd");
    },
    /** @returns { string } */
    time() {
      return format(this.feeding.timestamp, "kk:mm");
    },
  },
  methods: {
    setDate(event) {
      const date = event.target.value;
      this.feeding.timestamp = new Date(`${date} ${this.time}`);
    },
    setTime(event) {
      const time = event.target.value;
      this.feeding.timestamp = new Date(`${this.date} ${time}`);
    },
    setFood(event) {
      const { value } = event.target.selectedOptions[0];
      const newFood = this.pet.food.find((food) => food.name === value);
      console.log(newFood);
      this.feeding.food = { ...newFood };
    },
    validate() {
      return { timestamp: "", amount: "" };
    },
    async submit() {
      this.setIsLoading(true);
      await this.sleep(2000);
      const errors = this.validate();
      if (Object.values(errors).every((v) => !v)) {
        console.log({ ...this.feeding });
      } else {
        this.errors = errors;
      }
      this.setIsLoading(false);
    },
    ...mapActions(["sleep"]),
    ...mapMutations(["setIsLoading"]),
  },
  watch: {
    pet: function (newPet) {
      if (newPet) {
        const feeding = nullFeeding(newPet);
        if (newPet.food.length === 1) {
          feeding.food = newPet.food[0].name;
        }
        this.feeding = feeding;
      }
    },
  },
  components: { Modal, TextInput },
};
</script>
