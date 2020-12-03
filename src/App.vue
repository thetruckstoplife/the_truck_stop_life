<template>
  <div id="app">
    <div v-if="this.$store.state.buttonView === 'Filter'">
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
</style>
