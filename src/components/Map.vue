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
      :center="this.$store.state.currentLocation"
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
      <GmapMarker
        :position="this.$store.state.currentLocation"
        :icon="startOptions"
      />
      <GmapMarker :position="mapCoordinates" @click="leftClicked" />

      <GmapMarker
        v-for="location in locations"
        :key="location.key"
        :position="location.position"
        :animation="location.defaultAnimation"
        :icon="truckOptions"
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
      markerOptions: {
        url:
          "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png",
      },
      startOptions: {
        url: "http://maps.google.com/mapfiles/kml/paddle/ylw-stars.png",
      },
      truckOptions: {
        url: "http://maps.google.com/mapfiles/kml/shapes/truck.png",
      },
    };
  },

  // created() {
  //   // get the current coordinates from browser request
  //   //this is going to be CC location in Japan, not the US.
  //   //so we should use a fixed coodinates in somewhere in the US?
  //   this.$getLocation({})
  //     .then(coordinates => {
  //       this.yourCoordinates = coordinates;
  //     })
  //     .catch(error => alert(error));
  // },

  mounted() {
    this.getLocations();
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
    leftClicked(event) {
      const markLocation = JSON.stringify(event.latLng.toJSON(), null, 2);
      const reformatLocationInfo = {
        postion: JSON.parse(markLocation),
      };
      this.$store.commit("setFlagLocation", reformatLocationInfo);
    },
    checkClick(event) {
      console.log(event);
      console.log(event.target);
    },
  },
};
</script>

<style></style>
