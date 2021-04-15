<template>
  <div class="column">
    <div class="box has-background-light">
      <div
        class="is-flex is-justify-content-space-between is-align-items-flex-end"
      >
        <h4 class="is-size-4">{{ pet.name }}</h4>
        <span class="tag is-medium is-info is-light"
          >{{ totalFed.value }}/{{ pet.max }} {{ amountString(pet.max) }}</span
        >
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
    </div>
  </div>
</template>

<script>
import isSameDay from "date-fns/isSameDay";
import formatRelative from "date-fns/formatRelative";
export default {
  name: "PetView",
  props: ["pet"],
  computed: {
    progressType() {
      const { percent } = this.totalFed;
      if (!percent || percent < 75) return "is-success";
      if (percent >= 75 && percent < 90) return "is-warning";
      return "is-danger";
    },
    lastFeeding() {
      const { feedings } = this.pet;
      if (!feedings) return null;
      const last = feedings.sort((a, b) =>
        a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0
      )[0];
      if (!last) return null;
      return {
        amount: last.amount,
        timestamp: formatRelative(last.timestamp, new Date()),
      };
    },
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
  },
};
</script>
