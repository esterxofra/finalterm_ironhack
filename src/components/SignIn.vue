<template>
  <div class="signin-page">
    <div class="background-image"></div>

    <div class="container">
      <div class="internal-container">
        <div>
          <h1 class="header-title">Welcome back!</h1>
          <p class="header-subtitle">
            Start Organizing your daily goals with the tracker task!
          </p>
        </div>

        <form @submit.prevent="signIn" class="form-sign-in">
          <label for="uname" class="label-title">Email:</label>
          <input
            type="email"
            name="uname"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />

          <label for="psw" class="label-title">Password:</label>
          <input
            type="password"
            name="psw"
            class="input-field"
            placeholder="**********"
            id="password"
            v-model="password"
            required
          />

          <button class="button" type="submit">Sign In</button>

          <p>
            Don't have an account?
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="sign-in-link"
            />
          </p>
        </form>
      </div>
    </div>
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

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In???
const redirect = useRouter();

// Route Variables
const route = "/auth/signup";
const buttonText = "Create an account.";

// Arrow function to Signin user to supaBase
const signIn = async () => {
  if (email.value) {
    try {
      await useUserStore().signIn(email.value, password.value);
      redirect.push({ path: "/" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};
</script>

<style></style>
