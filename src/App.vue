<template>
  <div id="app">
    <div v-if="this.$store.state.buttonView === 'Filter'">
      <div id="top-nav">
        <input
          ref="latitude"
          class="origin"
          type="text"
          value="30.516319"
          placeholder="set latitude"
        />
        <input
          ref="longitude"
          class="destination"
          type="text"
          value="-81.633737"
          placeholder="set longitude"
        />
        <button
          class="route-btn"
          type="button"
          default
          v-on:click="setDestination"
        >
          Set Route
        </button>
      </div>

      <button
        id="favorite-btn"
        class="favorite"
        type="button"
        v-on:click="changeFavoriteView"
      >
        Favorites
      </button>
      <Map />
    </div>
    <div v-if="this.$store.state.buttonView === 'OK'">
      <Settings />
    </div>
    <div>
      <Navbar />
    </div>
  </div>
</template>

<script>
import Map from "./components/Map";
import Navbar from "./components/Navbar.vue";
import Settings from "./components/Settings.vue";

export default {
  name: "app",
  components: {
    Map,
    Navbar,
    Settings,
  },
  methods: {
    changeFavoriteView() {
      this.$store.commit("setFavoriteView");
    },
    setDestination() {
      const coordinates = {
        lat: parseFloat(this.$refs.latitude.value),
        lng: parseFloat(this.$refs.longitude.value),
      };
      this.$store.commit("setDestination", coordinates);
    },
  },
  created() {
    // get the current coordinates from browser request
    //this is going to be CC location in Japan, not the US.
    //so we should use a fixed coodinates in somewhere in the US?
    this.$getLocation({})
      .then((coordinates) => {
        this.$store.state.currentLocation = coordinates;
        console.log(this.$store.state.currentLocation);
      })
      .catch((error) => alert(error));
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background-color: #70c1b3;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
}
.route-btn {
  color: white;
  font: 400 20px Verdana;
  background-color: #247ba0;
  border-radius: 40px;
  border: 0px;
  width: 130px;
  height: 50px;
  margin: 0px;
  cursor: pointer;
  transition-duration: 0.4s;
}
#favorite-btn {
  position: absolute;
  right: 30px;
  top: 20px;
}
.favorite {
  color: white;
  font: 400 20px Verdana;
  background-color: #247ba0;
  border-radius: 40px;
  border: 0px;
  width: 130px;
  height: 50px;
  margin: 0px;
  cursor: pointer;
  transition-duration: 0.4s;
}
#top-nav {
  margin: 20px auto;
}
.origin {
  padding: 8px 20px;
  width: 130px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 0px solid black;
  font: 15px Verdana;
  margin-left: 10px;
  margin-right: 10px;
}
.destination {
  padding: 8px 20px;
  width: 130px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 0px solid black;
  font: 15px Verdana;
  margin-left: 10px;
  margin-right: 10px;
}
/* .favorite:hover {
  border: solid #247ba0;
  background-color: #ffffff;
  color: #247ba0;
} */
</style>
