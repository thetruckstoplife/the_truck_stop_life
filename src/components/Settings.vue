<template>
  <div id="settings">
    <!-- Toggles for filtering truck stops -->
    <div>
      <div><h1>Find truck stops that have...</h1></div>
    </div>
    <div id="toggles">
      <p>ATM</p>
      <label class="switch">
        <input
          id="atm"
          :checked="atm"
          value="atm"
          type="checkbox"
          v-model="array[0].atm"
          v-on:click="setFilter(value)"
        />
        <span class="slider round"></span>
      </label>

      <div>
        <p>Showers</p>
        <label class="switch">
          <input
            id="shower"
            :checked="shower"
            value="shower"
            type="checkbox"
            v-model="array[1].shower"
            v-on:click="setFilter(value)"
          />
          <span class="slider round"></span>
        </label>
      </div>
      <div>
        <p>Overnight Parking</p>
        <label class="switch">
          <input
            id="overnight-parking"
            :checked="overNight"
            value="overnight-parking"
            type="checkbox"
            v-model="array[2].overNight"
            v-on:click="setFilter(value)"
          />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Gets object with state of toggles in input :checked
      array: this.$store.getters.selectedFilters,
    };
  },
  methods: {
    setFilter(array) {
      // Changes boolean value of input :checked to opposite
      this.$store.commit("setFilter", array);
    },
  },
};
</script>

<style scoped>
p {
  font: 400 20px Verdana;
}
#toggles {
  top: 50%;
  left: 50%;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #ef233c;
}

input:focus + .slider {
  box-shadow: 0 0 1px #ef233c;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
