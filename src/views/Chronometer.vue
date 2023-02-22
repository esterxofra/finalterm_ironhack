<template>
  <Nav />
  <Footer />
  <MenuHome />
</template>

<script setup>
import { ref, onUpdated } from "vue";
import { useTaskStore } from "../stores/task";
import { useRouter } from "vue-router";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import MenuHome from "../components/MenuHome.vue";
</script>

<style></style>
