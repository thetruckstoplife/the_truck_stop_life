<template>
  <div>
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
      <GmapMarker :position="yourCoordinates" :icon="startOptions" />
      <GmapMarker :position="destination" :icon="destinationOptions" />
      <GmapMarker
        v-for="location in locations"
        :key="location.key"
        :position="location.position"
        :animation="location.defaultAnimation"
        :icon="setGmapMarker(location.key)"
        @click="leftClicked(location.key, $event)"
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
      //  this.$store.state.currentLocation  -> should set this as the first Gmap Marker
      yourCoordinates: {
        lat: 28.538336,
        lng: -81.379234,
      },
      // Site 603 just for now
      mapCoordinates: {
        lat: 30.516319,
        lng: -81.633737,
      },
      startOptions: {
        url: "http://maps.google.com/mapfiles/kml/paddle/go.png",
      },
      truckOptions: {
        url: "http://maps.google.com/mapfiles/kml/shapes/truck.png",
      },
      favoriteOptions: {
        url: "http://maps.google.com/mapfiles/kml/paddle/ylw-stars.png",
      },
      destinationOptions: {
        url: "http://maps.google.com/mapfiles/kml/paddle/stop.png",
      },
    };
  },

  mounted() {
    this.getLocations();
  },
  computed: {
    locations() {
      if (this.$store.state.favoriteView) {
        return this.$store.state.flagLocation;
      } else if (
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
    destination() {
      return this.$store.state.destinationLocation;
    },
    google: gmapApi,
  },
  methods: {
    getLocations() {
      this.$store.dispatch("loadMarkers");
    },
    leftClicked(key, event) {
      const markLocation = event.latLng.toJSON();
      const reformatLocationInfo = {
        position: {
          lat: markLocation.lat,
          lng: markLocation.lng,
        },
        key: key,
        defaultAnimation: 2,
      };
      this.$store.commit("setFlagLocation", reformatLocationInfo);
      this.setFlagKey(key);
    },
    setFlagKey(key) {
      this.$store.commit("setFlagKey", key);
    },
    setGmapMarker(clickedKey) {
      if (this.$store.state.flagKey.includes(clickedKey)) {
        return this.favoriteOptions;
      }
      return this.truckOptions;
    },
  },
};
</script>

<style></style>
