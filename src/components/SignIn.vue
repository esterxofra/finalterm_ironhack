<template>
  <div class="sign-in-up-page">
    <div class="logo-container">
      <img
        class="logo"
        src="../assets/images/focus-on-logo-black-and-white.png"
        alt="Focus Logo"
      />
    </div>

    <div class="container">
      <div class="header">
        <h1 class="header-title">Welcome back!</h1>
        <p class="header-subtitle">
          Start Organizing your daily goals with the tracker task!
        </p>
      </div>

      <form @submit.prevent="signIn" class="form-sign-in">
        <label for="uname" class="input-field-label">Email:</label>

        <input
          type="email"
          name="uname"
          class="input-field"
          placeholder="example@gmail.com"
          id="email"
          v-model="email"
          required
        />

        <label for="psw" class="input-field-label">Password:</label>
        <input
          type="password"
          name="psw"
          class="input-field"
          placeholder="**********"
          id="password"
          v-model="password"
          required
        />

        <div class="sign-in-up-container">
          <button class="sign-in-up-button" type="submit">Sign In</button>
        </div>

        <div class="account">
          <p>
            Don't have an account?
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="sign-in-link"
            />
          </p>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import Footer from "../components/Footer.vue";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In???
const redirect = useRouter();

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign up.";

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
