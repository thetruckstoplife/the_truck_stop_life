<template>
  <div id="nav-area">
    <!-- check if the button is 'Filter' or 'OK' -->
    <div v-if="this.$store.state.buttonView === 'Filter'">
      <button
        id="filter-btn"
        class="button:hover"
        v-on:click="changeButtonView()"
      >
        {{ this.$store.state.buttonView }}
      </button>
    </div>
    <div v-if="this.$store.state.buttonView === 'OK'">
      <button id="ok-btn" class="button:hover" v-on:click="changeButtonView()">
        {{ this.$store.state.buttonView }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // change val of buttonView
    changeButtonView() {
      this.$store.commit("setButtonView");
      this.$store.commit("setFilteredLocation");
    },
  },
};
</script>

<style scoped>
#nav-area {
  position: fixed;
  bottom: 0px;
  width: 100%;
  box-shadow: 0px -4px 5px 0px rgba(1, 1, 1, 0.1);
}
#filter-btn {
  color: white;
  font: 400 20px Verdana;
  background-color: #ef233c;
  border-radius: 40px;
  border: 0px;
  width: 100px;
  height: 50px;
  margin: 20px;
  cursor: pointer;
  transition-duration: 0.4s;
}
#ok-btn {
  color: white;
  font: 400 20px Verdana;
  background-color: #ef233c;
  border-radius: 40px;
  border: 0px;
  width: 100px;
  height: 50px;
  margin: 20px;
  cursor: pointer;
}
.button:hover {
  background-color: yellow;
  color: white;
}
.box-shadow:before {
  position: absolute;
}
</style>
