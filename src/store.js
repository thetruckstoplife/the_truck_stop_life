import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [],
    buttonView: "Filtered",
  },
  getters: {
    currentNav: (state) => {
      return state.buttonView;
    },
  },
  mutations: {
    setLocations(state, locations) {
      state.locations = locations;
    },
    setButtonView(state) {
      if (state.buttonView === "Filtered") {
        state.buttonView = "OK";
      }
      if (state.buttonView === "OK") {
        state.buttonView = "Filtered";
      }
    },
  },
  actions: {
    async loadMarkers({ commit }) {
      try {
        const { data: locations } = await axios.get("/api/locations"); // ES6 destructuring & aliasing
        const markers = locations.map((location) => ({
          position: {
            lat: location.latitude,
            lng: location.longitude,
          },
          key: location.name,
          defaultAnimation: 2,
        }));
        commit("setLocations", markers);
      } catch (err) {
        console.error(err);
      }
    },
  },
});
