<template>
  <div id="settings">
    <div>
      <div><h1>Find truck stops that have...</h1></div>
      <p>ATM</p>
      <label class="switch">
        <input id="atm" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
    <div>
      <p>Showers</p>
      <label class="switch">
        <input id="shower" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
    <div>
      <p>Overnight Parking</p>
      <label class="switch">
        <input id="shower" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
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
  background-color: green;
}

input:focus + .slider {
  box-shadow: 0 0 1px green;
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
