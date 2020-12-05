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
      for (let i = 0; i < state.flagLocation.length; i++) {
        if (location.key === state.flagLocation[i].key) {
          console.log("setFlagLocation: before: " + state.flagLocation);
          state.flagLocation.splice(i, 1);
          console.log("setFlagLocation: after: " + state.flagLocation);
          return;
        }
      }
      state.flagLocation.push(location);
    },
    setFavoriteView(state) {
      state.favoriteView = !state.favoriteView;
    },
    setFlagKey(state, key) {
      if (state.flagKey.includes(key)) {
        state.flagKey.splice(state.flagKey.indexOf(key), 1);
      } else {
        state.flagKey.push(key);
      }
    },
    setDestination(state, coordinates) {
      state.destinationLocation.lat = coordinates.lat;
      state.destinationLocation.lng = coordinates.lng;
      console.log(state.destinationLocation);
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
