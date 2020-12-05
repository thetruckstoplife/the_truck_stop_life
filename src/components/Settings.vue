<template>
  <div id="settings">
    <div>
      <div><h1>Find truck stops that have...</h1></div>
    </div>
    <!-- Toggles for filtering truck stops -->
    <div id="toggles" class="wrapper">
      <div id="left-col" class="column">
        <div>
          <p>ATM</p>
          <label class="switch">
            <input
              id="atm"
              type="checkbox"
              v-model="array[0].atm"
              v-on:click="setFilter('atm')"
            />
            <span class="slider round"></span>
          </label>
        </div>

        <div>
          <p>Showers</p>
          <label class="switch">
            <input
              id="shower"
              type="checkbox"
              v-model="array[1].shower"
              v-on:click="setFilter('shower')"
            />
            <span class="slider round"></span>
          </label>
        </div>
        <div>
          <p>Overnight Parking</p>
          <label class="switch">
            <input
              id="park"
              type="checkbox"
              v-model="array[2].park"
              v-on:click="setFilter('park')"
            />
            <span class="slider round"></span>
          </label>
        </div>
        <div>
          <p>Wifi</p>
          <label class="switch">
            <input
              id="wifi"
              type="checkbox"
              v-model="array[3].wifi"
              v-on:click="setFilter('wifi')"
            />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div id="right-col" class="column">
        <div>
          <p>McDonald's</p>
          <label class="switch">
            <input
              id="mcd"
              type="checkbox"
              v-model="array[4].mcd"
              v-on:click="setFilter('mcd')"
            />
            <span class="slider round"></span>
          </label>
        </div>
        <div>
          <p>Subway</p>
          <label class="switch">
            <input
              id="sub"
              type="checkbox"
              v-model="array[5].sub"
              v-on:click="setFilter('sub')"
            />
            <span class="slider round"></span>
          </label>
        </div>
        <div>
          <p>Denny's</p>
          <label class="switch">
            <input
              id="denny"
              type="checkbox"
              v-model="array[6].denny"
              v-on:click="setFilter('denny')"
            />
            <span class="slider round"></span>
          </label>
        </div>
        <div>
          <p>Baskin Robbins</p>
          <label class="switch">
            <input
              id="br"
              type="checkbox"
              v-model="array[7].br"
              v-on:click="setFilter('br')"
            />
            <span class="slider round"></span>
          </label>
        </div>
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
  margin-bottom: 150px;
}
/* #left-col {
  width: 50%;
}
#right-col {
  width: 50%;
} */
.column {
  float: left;
  width: 50%;
}
.row:after {
  content: "";
  display: table;
  clear: both;
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
  background-color: #247ba0;
}

input:focus + .slider {
  box-shadow: 0 0 1px #247ba0;
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
