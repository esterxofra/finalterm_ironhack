<template>
  <!-- <div>
    <label for="name">Insert your name:</label>
    <input type="text" name="name" v-model="" />

    <label for="username">Insert your username:</label>
    <input type="email" name="username" v-model="" />

    <label for="website">Insert your website:</label>
    <input type="text" name="website" v-model="" />
  </div> -->

  <!-- <div id="app">
    <div class="input-file">
      <input class="input-file__input" ref="file" type="file" />
      <div class="input-file__button" @click="selectFile()">
        click to select a file
      </div>
    </div>
  </div> -->

  <button @click="editprofile">Save changes</button>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();

// const App = {
//   methods: {
//     selectFile() {
//       let fileInputElement = this.$refs.file;
//       fileInputElement.click();
//       // ...
//     },
//   },
// };

// Vue.createApp(App).mount("#app");
</script>

<style></style>
