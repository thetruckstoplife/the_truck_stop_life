<template>
  <div class="full-height">
    <GmapMap
      :zoom="defaultzoom"
      :center="yourCoordinates"
      map-type-id="terrain"
      style="
        width: 100%;
        height: 100%;
        position: absolute;
        top: 90px;
        left: 0px;
      "
      :options="{
        styles: retroMode,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true,
        disableDefaultUi: false,
      }"
    >
      <!-- your starting position -> currently defaulted to "yourCoordinates" for demo purpose -->
      <!-- you can refer to real location by changing the position to "this.$store.state.currentLocation" -->
      <GmapMarker :position="yourCoordinates" :icon="startOptions" />
      <!-- once destination is set via browser the destination pin will show in the corresponding location -->
      <GmapMarker :position="destination" :icon="destinationOptions" />
      <!-- show pins to all truckstop information -->
      <!-- looping locations arrayis looking into (1) locations array in default-->
      <!-- (2) if filtered refer to filteredLocation array -->
      <!-- (3) if favorite view refer to flagLocation array -->
      <!-- special attribute - when clicked (a) icon will change (b) store/delete the location info from flagLocation (favorite) -->
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
      defaultzoom: 5,
      // retromode is a google map style. The below is its setting.
      retroMode: [
        {
          elementType: "geometry",
          stylers: [
            {
              color: "#ebe3cd",
            },
          ],
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#523735",
            },
          ],
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#f5f1e6",
            },
          ],
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#c9b2a6",
            },
          ],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#dcd2be",
            },
          ],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#ae9e90",
            },
          ],
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry",
          stylers: [
            {
              color: "#dfd2ae",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#dfd2ae",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#93817c",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#a5b076",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#447530",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#f5f1e6",
            },
          ],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            {
              color: "#fdfcf8",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [
            {
              color: "#f8c967",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#e9bc62",
            },
          ],
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry",
          stylers: [
            {
              color: "#e98d58",
            },
          ],
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#db8555",
            },
          ],
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#806b63",
            },
          ],
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [
            {
              color: "#dfd2ae",
            },
          ],
        },
        {
          featureType: "transit.line",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#8f7d77",
            },
          ],
        },
        {
          featureType: "transit.line",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#ebe3cd",
            },
          ],
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [
            {
              color: "#dfd2ae",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#b9d3c2",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#92998d",
            },
          ],
        },
      ],
      // default start point for demo purpose
      yourCoordinates: {
        lat: 28.538336,
        lng: -81.379234,
      },
      // start location icon
      startOptions: {
        url: "http://maps.google.com/mapfiles/kml/paddle/go.png",
      },
      // truck stop default icon
      truckOptions: {
        url: "http://maps.google.com/mapfiles/kml/paddle/orange-blank.png",
      },
      // favorite icon
      favoriteOptions: {
        url: "http://maps.google.com/mapfiles/kml/paddle/orange-stars.png",
      },
      // destination icon
      destinationOptions: {
        url: "http://maps.google.com/mapfiles/kml/paddle/orange-circle.png",
      },
    };
  },

  mounted() {
    this.getLocations();
  },
  computed: {
    locations() {
      // if favorite view
      if (this.$store.state.favoriteView) {
        // refers to flagLocation (favorite) array
        return this.$store.state.flagLocation;
      } else if (
        // if no filter is done
        this.$store.state.filter.every((flags) => {
          for (let condition in flags) {
            if (flags[condition] === true) return false;
          }
          return true;
        })
      ) {
        // refer to locations array (all truck stop)
        return this.$store.state.locations;
      }
      // else refer to filteredLocation (filtered truck stop)
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
      const markLocation = event.latLng.toJSON(); // extract latLng info of the marker
      // store location info in the pre-formated way
      const reformatLocationInfo = {
        position: {
          lat: markLocation.lat,
          lng: markLocation.lng,
        },
        key: key,
        defaultAnimation: 2,
      };
      // set extracte -> reformated location info in flagLocation array
      this.$store.commit("setFlagLocation", reformatLocationInfo);
      // store key info of the location to flagKey array
      this.setFlagKey(key);
    },
    setFlagKey(key) {
      this.$store.commit("setFlagKey", key);
    },
    // check location is flag -> if flagged swaps icon to favorite icon
    setGmapMarker(clickedKey) {
      if (this.$store.state.flagKey.includes(clickedKey)) {
        return this.favoriteOptions;
      }
      return this.truckOptions;
    },
  },
};
</script>

<style scoped></style>
