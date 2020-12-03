<template>
  <div id="settings-btn">
    <!-- check if the button is 'Filtered' or 'OK' -->
    <div v-if="currentNav() === 'Filtered'">
      <button>{{ filter }}</button>
    </div>
    <div v-if="currentNav() === 'OK'">
      <button>{{ ok }}</button>
    </div>
  </div>
</template>

<script>
export default {
  el: "settings-btn",
  computed: {
    // get val of buttonView
    currentNav() {
      return this.$store.getters.currentNav;
    },
  },
};
</script>

<style scoped></style>
