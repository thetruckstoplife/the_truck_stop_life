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
        atm: true,
        shower: false,
        overNight: true,
      },
    ],
    buttonView: "Filter",
    filter: [{ atm: false }, { shower: false }, { overNight: false }],
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
      let result = state.locations.slice();
      let category = [];
      state.filter.forEach((category) => {
        for (let key in category) {
          if (category[key] === true) {
            category.push = key;
          }
        }
      });
      if (category.length) {
        for (let name of category) {
          console.log("Filtering In Progress: ", category);
          result = result.filter((location) => location[name] === true);
        }
      }
      state.filteredLocation = result;
      console.log("Filtering Completed: ", state.filteredLocation);
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
