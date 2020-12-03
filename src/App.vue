<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <div>
      <Map />
    </div>
    <div>
      <Navbar />
    </div>
  </div>
</template>

<script>
import Map from "./components/Map";
import Navbar from "./components/Navbar.vue";

export default {
  name: "app",
  components: {
    Map,
    Navbar,
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
