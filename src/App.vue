<template>
  <div id="app">
    <div v-if="this.$store.state.buttonView === 'Filter'">
      <button class="favorite" type="button" v-on:click="changeFavoriteView">
        Favorite
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
  margin-top: 60px;
}
.favorite {
  color: white;
  font: 400 20px Verdana;
  background-color: blue;
  border-radius: 40px;
  border: 0px;
  width: 100px;
  height: 50px;
  margin: 0px;
  cursor: pointer;
  transition-duration: 0.4s;
}
.favorite:hover {
  border: solid blue;
  background-color: #ffffff;
  color: blue;
}
</style>
