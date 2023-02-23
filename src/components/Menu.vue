<template>
  <div class="show-new-task" v-if="inputNewTask">
    <div class="container-menu">
      <NewTask />
    </div>
  </div>

  <div class="menu-mobile">
    <router-link class="icon-menu" to="/account"
      ><img src="../assets/icons/user-button.svg" alt="Account"
    /></router-link>

    <router-link class="icon-menu" to="/chronometer"
      ><img src="../assets/icons/clock-button.svg" alt="Clock"
    /></router-link>

    <button @click="showInputNewClass" class="icon-menu">
      <img src="../assets/icons/add-task-button.svg" alt="Add a new task" />
    </button>
  </div>
</template>

<script setup>
import { ref, onUpdated } from "vue";
import NewTask from "../components/NewTask.vue";

const inputNewTask = ref(false);

const showInputNewClass = () => {
  inputNewTask.value = !inputNewTask.value;
};
</script>

<style></style>
