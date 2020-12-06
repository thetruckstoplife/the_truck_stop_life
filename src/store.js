import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [], //store all truckstops location information
    buttonView: "Filter", // switch value to "OK" in Settings View
    // Filtering category status. User can toggle filter status in Settings View. When toggle the status with turn true.
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
    filteredLocation: [], // Once filtered category are set and hit OK in setting, filtered location will be stored here
    // vue-browser-geolocation package will ask for your current location and store the location (lat,lng) here.
    currentLocation: {
      lat: 0,
      lng: 0,
    },
    // your destination location will be stored here
    destinationLocation: {
      lat: null,
      lng: null,
    },
    flagLocation: [], // when you click marker on map the location info will be store here. when favorite view is true only the flaglocation (favorites) will appear on map
    favoriteView: false, // when favorite button is clicked toggles the view from true to false
    flagKey: [], // helper state, which helps identify which location are favorites.
  },
  getters: {
    // gets view status of "Filter" or "OK" to toggle from Settings View to Map View
    selectedFilters: (state) => {
      return state.filter;
    },
  },
  mutations: {
    // toggle the filtering category in filter variable to true/false
    setFilter(state, filteringCategory) {
      for (const key in state.filter) {
        if (filteringCategory === key) {
          state.filter[key] = !state.filter[key];
        }
      }
    },
    setLocations(state, locations) {
      state.locations = locations;
    },
    // toggles the view from MapView ("Filter") to Settings ("Ok")
    setButtonView(state) {
      if (state.buttonView === "Filter") {
        state.buttonView = "OK";
      } else if (state.buttonView === "OK") {
        state.buttonView = "Filter";
      }
    },
    // stores filtered location info based on the true state of filtering category in filter variable.
    // filtered location will be stored in filteredLocation variable separated from location variable.
    setFilteredLocations(state) {
      let result;
      let categoryToBeFiltered = [];
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
    // stores/deletes favorite location information when marker is clicked
    setFlagLocation(state, location) {
      for (let i = 0; i < state.flagLocation.length; i++) {
        // if location already exists in flagLocation array then splice that location info from the array.
        if (location.key === state.flagLocation[i].key) {
          console.log("setFlagLocation: before: " + state.flagLocation);
          state.flagLocation.splice(i, 1);
          console.log("setFlagLocation: after: " + state.flagLocation);
          return;
        }
      }
      // if location does not exist in the flagLocation array pushes the location info in the array.
      state.flagLocation.push(location);
    },
    setFavoriteView(state) {
      state.favoriteView = !state.favoriteView;
    },
    //stores the favorite locations key information in an array. if exists deletes the key info.
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
    },
  },
  actions: {
    async loadMarkers({ commit }) {
      try {
        const { data: locations } = await axios.get("/api/locations"); // accessing database to get all truckstop location information.
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
        commit("setLocations", markers); //stores the location info to location varibale
      } catch (err) {
        console.error(err);
      }
    },
  },
});
