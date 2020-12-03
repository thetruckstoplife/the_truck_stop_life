import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [
      {
        position: {
          lat: 32.844151,
          lng: -86.591963,
        },
        key: "Site 368",
        defaultAnimation: 2,
      },
    ],
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

// {
// id: 2,
// position: {
//   lat: 34.367333,
//   lng: -86.89353,
// },
// name: "Site 381",
// atm: "atm",
// shower: "shower",
// overNightParking: "over-night-parking",
// defaultAnimation: 2,
// },
// {
// id: 3,
// position: {
// lat: 33.790777,
// lng: -87.241662,
// },
// name: "Site 466",
// atm: "atm",
// shower: "shower",
// overNightParking: "over-night-parking",
// defaultAnimation: 2,
// },
