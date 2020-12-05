import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [
      { position: { lat: 32.844151, lng: -86.591963 }, key: 20 },
      { position: { lat: 31.419105, lng: -87.00765 }, key: 21 },
      { position: { lat: 34.367333, lng: -86.89353 }, key: 24 },
    ],
    buttonView: "Filter",
    filter: [
      { atm: false },
      { shower: false },
      { park: false },
      { wifi: false },
      { mcd: false },
      { sub: false },
      { denny: false },
      { br: false },
    ],
    filteredLocation: [],
    mapView: false,
    currentLocation: {
      lat: 0,
      lng: 0,
    },
    destinationLocation: {
      lat: 0,
      lng: 0,
    },
    flagLocation: [],
    favoriteView: false,
    flagKey: [],
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
      console.log("filter state", state.filter);
      state.filter.forEach((category) => {
        for (let key in category) {
          if (category[key] === true) {
            categoryToBeFiltered.push(key);
          }
        }
      });
      console.log("category to be filtered:", state.categoryToBeFiltered);
      if (categoryToBeFiltered.length) {
        for (let name of categoryToBeFiltered) {
          result = state.locations.filter(
            (location) => location[name] === true
          );
        }
      }
      state.filteredLocation = result;
      console.log("filtered location:", state.filteredLocation);
    },
    setMapView(state) {
      state.mapView = true;
    },
    setFlagLocation(state, location) {
      state.flagLocation.push(location);
    },
    setFavoriteView(state) {
      state.favoriteView = !state.favoriteView;
    },
    setFlagKey(state, key) {
      state.flagKey.push(key);
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
          mcd: location.mcd,
          sub: location.sub,
          denny: location.denny,
          br: location.br,
          state: location.state,
        }));
        commit("setLocations", markers);
      } catch (err) {
        console.error(err);
      }
    },
  },
});
