import Vuex from "vuex";
import sub from "date-fns/sub";
import set from "date-fns/set";

export default Vuex.createStore({
  state: {
    isLoading: false,
    session: null,
    user: {
      name: "everett",
      email: "everett@everett.com",
    },
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
                food: "kibble",
                amount: 1,
                timestamp: sub(new Date(), { days: 1 }),
              },
              {
                food: "kibble",
                amount: 1.5,
                timestamp: sub(new Date(), { hours: 1 }),
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
                food: "wet",
                amount: 0.025,
                timestamp: new Date(),
              },
              {
                food: "kibble",
                amount: 0.25,
                timestamp: sub(new Date(), { days: 1 }),
              },
              {
                food: "kibble",
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
                food: "kibble",
                amount: 1,
                timestamp: set(new Date(), { hours: 8, minutes: 30 }),
              },
              {
                food: "kibble",
                amount: 1,
                timestamp: set(new Date(), { hours: 12, minutes: 12 }),
              },
              {
                food: "kibble",
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
    setSession(state, session) {
      state.session = session;
    },
  },
  actions: {
    async logout({ commit }) {
      commit("setUser", null);
    },
    sleep(_, ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
  getters: {
    authenticated: (state) => {
      return !!state.user;
    },
  },
  modules: {},
});
