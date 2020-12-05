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

      <GmapMarker :position="mapCoordinates" @click="leftClicked" />

      <GmapMarker
        v-for="location in locations"
        :key="location.key"
        :position="location.position"
        :animation="location.defaultAnimation"
        :icon="truckOptions"
        @click="leftClicked"
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
        url: "http://maps.google.com/mapfiles/kml/paddle/ylw-stars.png",
      },
      truckOptions: {
        url: "http://maps.google.com/mapfiles/kml/shapes/truck.png",
      },
    };
  },
  computed: {
    locations() {
      return this.$store.state.flagLocation;
    },
    google: gmapApi,
  },
  methods: {
    leftClicked(event) {
      this.$store.commit("setFlagCount");
      const markLocation = JSON.stringify(event.latLng.toJSON(), null, 2);
      const reformatLocationInfo = {
        postion: JSON.parse(markLocation),
        key: this.$store.state.flagCount,
        defaultAnimation: 2,
      };
      console.log(reformatLocationInfo);
      this.$store.commit("setFlagLocation", reformatLocationInfo);
    },
  },
};
</script>

<style></style>
