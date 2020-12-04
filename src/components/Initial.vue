<template>
  <div id="initial">
    <button class="current-location" type="button" v-on:click="changeToMapView">
      Current Location
    </button>
  </div>
</template>

<script>
export default {
  name: "initial",
  methods: {
    changeToMapView() {
      this.$store.commit("setMapView");
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
#initial {
  margin: auto;
  width: 100%;
  height: 600px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.current-location {
  color: white;
  font: 400 20px Verdana;
  background-color: #ef233c;
  border-radius: 40px;
  border: 0px;
  width: 300px;
  height: 50px;
  margin: 20px;
  cursor: pointer;
  transition-duration: 0.4s;
}
.current-location:hover {
  border: solid #ef233c;
  background-color: #edf2f4;
  color: #ef233c;
}
</style>
