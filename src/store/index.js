import Vue from "vue";
import Vuex from "vuex";
import sub from "date-fns/sub";
import set from "date-fns/set";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      uid: "12345",
      email: "something@gmail.com",
      name: "John Smith",
    },
    groups: [
      {
        name: "Group 1",
        pets: [
          {
            name: "Nova",
            type: "cat",
            max: 2,
            feedings: [
              {
                amount: 1,
                timestamp: sub(new Date(), { days: 1 }),
              },
              {
                amount: 1.5,
                timestamp: sub(new Date(), { days: 1 }),
              },
            ],
          },
          {
            name: "Ember",
            type: "cat",
            max: 1.5,
            feedings: [
              {
                amount: 0.25,
                timestamp: sub(new Date(), { days: 1 }),
              },
              {
                amount: 0.5,
                timestamp: set(new Date(), { hours: 16, minutes: 4 }),
              },
            ],
          },
          {
            name: "Flurry",
            type: "dog",
            max: 2.5,
            feedings: [
              {
                amount: 1,
                timestamp: set(new Date(), { hours: 8, minutes: 30 }),
              },
              {
                amount: 1,
                timestamp: set(new Date(), { hours: 12, minutes: 12 }),
              },
              {
                amount: 1,
                timestamp: sub(new Date(), { minutes: 30 }),
              },
            ],
          },
        ],
      },
      {
        name: "Group 2",
        pets: [],
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
});
