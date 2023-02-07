<!-- COMPONENTE BOILERPLATE -->

<template>
  <div class="container">
    <div>
      <h3 class="header-title">Welcome to Wu Tasks</h3>
      <p class="header-subtitle">Start Organizing your tasks todays!</p>
      <p>Sign In</p>
    </div>

    <form @submit.prevent="signIn" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />
        </div>

        <div class="form-input">
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="password"
            v-model="password"
            required
          />
        </div>

        <button class="button" type="submit">Sign In</button>

        <p>
          Don't have an account?
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="sign-up-link"
          />
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Input Fields
const email = ref("");
const password = ref("");

// Router to push user once SignedUp to Log In???
const redirect = useRouter();

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Arrow function to Signin user to supaBase
const signIn = async () => {
  console.log("Hola pepsicola");
  if (email.value) {
    try {
      await useUserStore().signIn(email.value, password.value);
      redirect.push({ path: "/" });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
</script>

<style></style>
