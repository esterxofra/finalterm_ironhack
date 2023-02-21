<template>
  <div class="menu-mobile">
    <router-link class="icon-menu" to="/account"
      ><img src="../assets/icons/user-button.svg" alt="Account"
    /></router-link>

    <router-link class="icon-menu" to="/chronometer"
      ><img src="../assets/icons/clock-button.svg" alt="Clock"
    /></router-link>

    <button @click="addTask" class="icon-menu">
      <img src="../assets/icons/add-task-button.svg" alt="Add a new task" />
    </button>
  </div>
</template>

<script setup></script>

<style></style>
