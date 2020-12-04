import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [],
    buttonView: "Filter",
    filter: [
      { atm: false },
      { shower: false },
      { park: false },
      { wifi: false },
    ],
    filteredLocation: [],
  },
  getters: {
    selectedFilters: (state) => {
      return state.filter;
    },
  },
  mutations: {
    setFilter(state, filteringCategory) {
      for (const key in state.filter) {
        if (filteringCategory === key) {
          state.filter[key] = !state.filter[key];
        }
      }
      // state.filter = filteringCategory;
    },
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
    setFilteredLocations(state) {
      let result;
      let categoryToBeFiltered = [];
      console.log(state.filter);
      state.filter.forEach((category) => {
        for (let key in category) {
          if (category[key] === true) {
            categoryToBeFiltered.push(key);
          }
        }
      });
      console.log(categoryToBeFiltered);
      if (categoryToBeFiltered.length) {
        for (let name of categoryToBeFiltered) {
          console.log("Filtering In Progress: ", name);
          result = state.locations.filter(
            (location) => location[name] === true
          );
        }
      }
      console.log(result);
      state.filteredLocation = result;
      console.log("Filtering Completed: ", state.filteredLocation);
    },
  },
  actions: {
    async loadMarkers({ commit }) {
      try {
        const { data: locations } = await axios.get("/api/locations"); // ES6 destructuring & aliasing
        console.log(locations);
        const markers = locations.map((location) => ({
          id: location.id,
          position: {
            lat: location.latitude,
            lng: location.longitude,
          },
          key: location.name,
          defaultAnimation: 2,
          park: location.park,
          shower: location.shower,
          wifi: location.wifi,
          atm: location.atm,
          state: location.state,
        }));
        commit("setLocations", markers);
      } catch (err) {
        console.error(err);
      }
    },
  },
});
