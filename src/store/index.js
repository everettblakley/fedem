import Vue from "vue";
import Vuex from "vuex";
import sub from "date-fns/sub";
import set from "date-fns/set";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    user: null,
    groups: [
      {
        name: "Group 1",
        pets: [
          {
            name: "Nova",
            type: "cat",
            food: [{ name: "kibble", max: 2, frequency: 172800 }],
            max: 2,
            feedings: [
              {
                name: "kibble",
                amount: 1,
                timestamp: sub(new Date(), { days: 1 }),
              },
              {
                name: "kibble",
                amount: 1.5,
                timestamp: sub(new Date(), { days: 1 }),
              },
            ],
          },
          {
            name: "Ember",
            type: "cat",
            food: [
              { name: "kibble", max: 1, frequency: 86400 },
              { name: "wet", max: 0.0208333, frequency: 86400 },
            ],
            max: 1.5,
            feedings: [
              {
                name: "kibble",
                amount: 0.25,
                timestamp: sub(new Date(), { days: 1 }),
              },
              {
                name: "kibble",
                amount: 0.5,
                timestamp: set(new Date(), { hours: 16, minutes: 4 }),
              },
            ],
          },
          {
            name: "Flurry",
            type: "dog",
            food: [{ name: "kibble", max: 3, frequency: 86400 }],
            max: 2.5,
            feedings: [
              {
                name: "kibble",
                amount: 1,
                timestamp: set(new Date(), { hours: 8, minutes: 30 }),
              },
              {
                name: "kibble",
                amount: 1,
                timestamp: set(new Date(), { hours: 12, minutes: 12 }),
              },
              {
                name: "kibble",
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
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setIsLoading(state, value) {
      state.isLoading = value;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      commit("setIsLoading", true);
      return await new Promise((resolve) => {
        setTimeout(() => {
          commit("setUser", { email, password });
          resolve();
        }, 2000);
      })
        .then(() => commit("setIsLoading", false))
        .catch((errors) => {
          commit("setIsLoading", false);
          return Promise.reject(errors);
        });
    },
    async logout({ commit }) {
      commit("setUser", null);
    },
  },
  getters: {
    authenticated: (state) => {
      return !!state.user;
    },
  },
  modules: {},
});
