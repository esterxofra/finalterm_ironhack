<template>
  <Nav />
  <Footer />
  <Menu />
</template>

<script setup>
import { ref, onUpdated } from "vue";
import { useTaskStore } from "../stores/task";
import { useRouter } from "vue-router";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import Menu from "../components/Menu.vue";
</script>

<style></style>
