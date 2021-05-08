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
          <div class="flex items-end">
            <text-input
              class="min-w-0 flex-1 mr-4"
              label="How much did you feed 'em?"
              type="number"
              id="amount"
              v-model="feeding.amount"
            />
            <text-input
              class="min-w-0 flex-1"
              label="Unit"
              type="text"
              id="unit"
              v-model="feeding.unit"
            />
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
import Modal from "./Modal.vue";
import TextInput from "./input/TextInput.vue";
import format from "date-fns/format";
export default {
  name: "NewFeeding",
  data() {
    return {
      feeding: {
        timestamp: new Date(),
        pet: this.pet,
        amount: 0,
        unit: "cups",
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
    submit() {
      console.log({ ...this.feeding });
    },
  },
  props: {
    pet: {
      type: Object,
    },
  },
  components: { Modal, TextInput },
};
</script>
