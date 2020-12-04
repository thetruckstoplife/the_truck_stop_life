<template>
  <div>
    <h4>Your coordinates:</h4>
    <p>
      {{ yourCoordinates.lat }} Latitude, {{ yourCoordinates.lng }} Longitude
    </p>
    <h4>Map coordinates:</h4>
    <p>{{ mapCoordinates.lat }} Latitude, {{ mapCoordinates.lng }} Longitude</p>
    <GmapMap
      :zoom="7"
      :center="yourCoordinates"
      map-type-id="terrain"
      style="width: 100%; height: 600px"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true,
        disableDefaultUi: false,
      }"
    >
      <GmapMarker :position="yourCoordinates" />
      <GmapMarker :position="mapCoordinates" />

      <GmapMarker
        v-for="location in locations"
        :key="location.key"
        :position="location.position"
        :animation="location.defaultAnimation"
        @rightclick="markerRightClicked"
      />
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  data() {
    return {
      // Orland, FL just for now
      yourCoordinates: {
        lat: 28.538336,
        lng: -81.379234,
      },
      // Site 603 just for now
      mapCoordinates: {
        lat: 30.516319,
        lng: -81.633737,
      },
    };
  },

  /*
  created() {
    // get the current coordinates from browser request
    //this is going to be CC location in Japan, not the US.
    //so we should use a fixed coodinates in somewhere in the US?
    this.$getLocation({})
      .then(coordinates => {
        this.yourCoordinates = coordinates;
      })
      .catch(error => alert(error));
  },
  */

  mounted() {
    this.getLocations();
    // this.getFilteredLocations();
  },
  computed: {
    locations() {
      return this.$store.state.filteredLocation;
    },
    google: gmapApi,
  },
  methods: {
    getLocations() {
      this.$store.dispatch("loadMarkers");
    },
    // getFilteredLocations() {
    //   this.$store.commit("setFilteredLocation");
    // },
    markerRightClicked() {
      // want to get the coordinate of the clicked place?
    },
  },
};
</script>

<style></style>
