<template>
  <Nav />
  <div class="wrapper-account">
    <div class="account-container">
      <div class="account-header">
        <h2>Chronometer</h2>
      </div>

      <div class="account-content">
        <div class="chronometer">
          <div class="timer">
            <p class="timer-numers">{{ formatTime }}</p>
          </div>

          <div class="chronometer-buttons">
            <div class="edit-button-container">
              <button class="edit-button" @click="start">Start</button>
            </div>

            <div class="edit-button-container">
              <button class="edit-button" @click="stop">Stop</button>
            </div>

            <div class="edit-button-container">
              <button class="edit-button" @click="reset">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
  <MenuHome />
</template>

<script setup>
import { ref, watch, onUnmounted, computed } from "vue";
import { useTaskStore } from "../stores/task";
import { useRouter } from "vue-router";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import MenuHome from "../components/MenuHome.vue";

const elapsed = ref("");
const isRunning = ref(false);

function start() {
  isRunning.value = true;
}

function stop() {
  isRunning.value = false;
}

function reset() {
  elapsed.value = 0;
  isRunning.value = false;
}

// The watch() function monitors the isRunning variable and updates the elapsed time every 10 milliseconds while the chronometer is running.

// NOTE:

// watch(isRunning, (newValue, oldValue) => {
//   if (newValue) {
//     const startTime = Date.now() - elapsed.value;
//     const intervalId = setInterval(() => {
//       elapsed.value = Date.now() - startTime;
//     }, 10);
//     onUnmounted(() => clearInterval(intervalId)); // Move this line inside the watch function
//   }
// });

// ERROR --> onUnmounted is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.

// So the new approach is...

const intervalId = ref(null);

watch(isRunning, (newValue, oldValue) => {
  if (newValue) {
    const startTime = Date.now() - elapsed.value;
    intervalId.value = setInterval(() => {
      elapsed.value = Date.now() - startTime;
    }, 10);
  } else {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
});

onUnmounted(() => {
  clearInterval(intervalId.value);
});

// The formatTime computed property formats the elapsed time into a string that shows minutes and seconds with two decimal places.

const formatTime = computed(() => {
  const minutes = Math.floor(elapsed.value / 60000);
  const seconds = ((elapsed.value % 60000) / 1000).toFixed(2);
  return `${minutes}:${seconds.padStart(5, "0")}`;
});
</script>

<style></style>
