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
        <h1 class="header-title">Hello!</h1>
        <p class="header-subtitle">
          Start Organizing your daily goals with the tracker task!
        </p>
      </div>

      <form @submit.prevent="signUp" class="form-sign-in">
        <label for="uname" class="input-field-label">E-mail</label>

        <input
          type="email"
          name="uname"
          class="input-field"
          placeholder="example@gmail.com"
          id="email"
          v-model="email"
          required
        />

        <label for="psw" class="input-field-label">Password</label>
        <input
          type="password"
          name="psw"
          class="input-field"
          placeholder="**********"
          id="password"
          v-model="password"
          required
        />

        <label for="psw-confirmation" class="input-field-label"
          >Confirm password</label
        >
        <input
          type="password"
          name="psw-confirmation"
          class="input-field"
          placeholder="**********"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />

        <div class="sign-in-up-container">
          <button class="sign-in-up-button" type="submit">Sign Up</button>
        </div>

        <div class="account">
          <p>
            Have an account?
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="sign-up-link"
            />
          </p>
        </div>
      </form>
      <div v-show="errorMsg">{{ errorMsg }}</div>
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

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
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
