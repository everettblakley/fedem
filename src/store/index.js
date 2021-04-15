import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pets: [
      {
        name: "Nova",
        max: 2,
        feedings: [
          {
            amount: 1,
            timestamp: new Date(),
          },
          {
            amount: 1,
            timestamp: new Date(),
          },
        ],
      },
      {
        name: "Ember",
        max: 1.5,
        feedings: [
          {
            amount: 0.25,
            timestamp: new Date(),
          },
          {
            amount: 0.25,
            timestamp: new Date(),
          },
        ],
      },
      {
        name: "Flurry",
        max: 2.5,
        feedings: [
          {
            amount: 1,
            timestamp: new Date(),
          },
          {
            amount: 1,
            timestamp: new Date(),
          },
          {
            amount: 1,
            timestamp: new Date(),
          },
        ],
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
});
