import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [],
    buttonView: "Filter",
    filter: [],
    filteredLocation: [],
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
      if (state.buttonView === "Filter") {
        state.buttonView = "OK";
      } else if (state.buttonView === "OK") {
        state.buttonView = "Filter";
      }
    },
    setFilter(state, name) {
      if (state.filter.includes(name)) {
        state.filter.splice(state.filter.indexOf(name), 1);
      } else {
        state.filter.push(name);
      }
    },
    setFilteredLocations(state) {
      let result = state.location.slice();
      if (state.filter.length > 0) {
        for (let category of state.filter) {
          console.log("Filtering In Progress: ", category);
          result = result.filter((truckStop) =>
            Object.values(truckStop).includes(category)
          );
          console.log("Filtering Completed: ", category);
        }
      }
      state.filteredLocation = result;
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
