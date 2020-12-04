<template>
  <GmapMap
    :zoom="4"
    :center="{ lat: 25.7392, lng: -104.9903 }"
    map-type-id="terrain"
    style="width: 100%; height: 600px"
  >
    <GmapMarker
      v-for="location in locations"
      :key="location.key"
      :position="location.position"
      :animation="location.defaultAnimation"
      :clickable="true"
      :draggable="true"
      :icon="markerOptions"
      @rightclick="markerRightClicked(event)"
    />
  </GmapMap>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  mounted() {
    this.getLocations();
  },
  data() {
    return {
      markerOptions: {
        url:
          "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png",
      },
    };
  },
  computed: {
    locations() {
      if (
        this.$store.state.filter.every((flags) => {
          for (let condition in flags) {
            if (flags[condition] === true) return false;
          }
          return true;
        })
      ) {
        return this.$store.state.locations;
      }
      return this.$store.state.filteredLocation;
    },
    google: gmapApi,
  },
  methods: {
    getLocations() {
      this.$store.dispatch("loadMarkers");
    },
    getFilteredLocations() {
      this.$store.commit("setFilteredLocations");
    },
    markerRightClicked() {
      if (event) {
        console.log(event);
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        console.log(lat + ", " + lng);
      }
    },
  },
};
</script>

<style></style>
