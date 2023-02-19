<template>
  <nav class="nav-bar">
    <img
      class="logo"
      src="../assets/images/focus-on-logo-black-and-white.png"
      alt="Focus Logo"
    />

    <router-link to="/"> Home </router-link>

    <router-link to="/chronometer">Clock</router-link>

    <router-link to="/account"> Account</router-link>

    <button @click="signOut" class="button-log-out">Log out</button>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try {
    // call the user store and send the users info to backend to signOut
    await useUserStore().signOut();

    // then redirect user to the homeView
    redirect.push({ path: "/auth/login" });
  } catch (error) {}
};
</script>

<style></style>
