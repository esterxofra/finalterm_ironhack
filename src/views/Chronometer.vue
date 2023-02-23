<template>
  <Nav />
  <div class="wrapper-account">
    <div>
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

const elapsed = ref(0);
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

watch(isRunning, (newValue, oldValue) => {
  if (newValue) {
    const startTime = Date.now() - elapsed.value;
    const intervalId = setInterval(() => {
      elapsed.value = Date.now() - startTime;
    }, 10);
    onUnmounted(() => clearInterval(intervalId));
  }
});

const formatTime = computed(() => {
  const minutes = Math.floor(elapsed.value / 60000);
  const seconds = ((elapsed.value % 60000) / 1000).toFixed(2);
  return `${minutes}:${seconds.padStart(5, "0")}`;
});
</script>

<style></style>

<!-- This component uses the ref() and computed() functions from Vue 3 to create reactive variables for the elapsed time and the chronometer status, and to compute the formatted time display.

The start(), stop(), and reset() functions control the chronometer status and elapsed time.

The watch() function monitors the isRunning variable and updates the elapsed time every 10 milliseconds while the chronometer is running.

The onUnmounted() function clears the interval when the component is unmounted to prevent memory leaks.

The formatTime computed property formats the elapsed time into a string that shows minutes and seconds with two decimal places.

The @click event listeners on the buttons call the start(), stop(), and reset() functions to control the chronometer.

You can customize the chronometer display and behavior by adjusting the functions and computed properties in the script setup section. -->
