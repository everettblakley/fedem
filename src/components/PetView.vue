<template>
  <div class="column">
    <div class="box has-background-light">
      <div
        class="is-flex is-justify-content-space-between is-align-items-flex-end"
      >
        <h4 class="is-size-4">{{ pet.name }}</h4>
        <span class="tag is-medium is-info is-light"
          >{{ totalFed.value }}/{{ pet.max }}
          {{ amountString(pet.max) }}
        </span>
      </div>
      <b-progress
        :value="totalFed.percent || 0"
        :type="progressType"
        class="mt-2"
      ></b-progress>
      <p>
        <b>Last feeding:</b>
        {{ lastFeeding.amount }}
        {{ amountString(lastFeeding.amount) }}, {{ lastFeeding.timestamp }}
      </p>
      <p
        class="has-text-link has-text-underline has-text-centered is-clickable pt-2"
      >
        Show more...
      </p>
      <div class="navbar-divider has-background-grey my-2" />
      <form @submit="submitForm">
        <p class="has-text-centered is-size-5">New Feeding</p>
        <b-field label="Time">
          <b-datetimepicker
            v-model="newFeeding.timestamp"
            placeholder="Click to select..."
          >
            <template #left>
              <b-button
                label="Now"
                type="is-primary"
                icon-left="clock"
                @click="datetime = new Date()"
              />
            </template>

            <template #right>
              <b-button
                label="Clear"
                type="is-danger"
                icon-left="close"
                outlined
                @click="datetime = null"
              />
            </template>
          </b-datetimepicker>
        </b-field>
        <b-field label="Amount">
          <b-numberinput
            v-model="newFeeding.amount"
            step="0.01"
            min="0"
            aria-minus-label="Decrement by 0.01"
            aria-plus-label="Increment by 0.01"
          >
          </b-numberinput>
        </b-field>
        <b-button type="is-primary" class="w-100 mt-2">Add feeding</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import isSameDay from "date-fns/isSameDay";
import formatRelative from "date-fns/formatRelative";
export default {
  name: "PetView",
  props: ["pet"],
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
      console.log(this.pet);
      console.log(this.newFeeding);
    },
  },
};
</script>
