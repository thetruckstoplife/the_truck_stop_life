<template>
  <div id="settings-btn">
    <!-- check if the button is 'Filter' or 'OK' -->
    <div v-if="this.$store.state.buttonView === 'Filter'">
      <button v-on:click="changeButtonView()">
        {{ this.$store.state.buttonView }}
      </button>
    </div>
    <div v-if="this.$store.state.buttonView === 'OK'">
      <button v-on:click="changeButtonView()">
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
    },
  },
};
</script>

<style scoped></style>
