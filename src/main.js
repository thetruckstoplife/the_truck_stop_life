import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import App from "./App.vue";
import store from "./store";
import VueGeolocation from "vue-browser-geolocation";

Vue.config.productionTip = false;

// middleware -> google maps
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDJ3sPnmTBMN1DZGJBX9gxuNg-O9mgHOAo",
    libraries: "geometry,drawing,places",
  },
  autobindAllEvents: false,
});

// middleware -> current location
Vue.use(VueGeolocation);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
