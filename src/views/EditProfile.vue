<template>
  <Nav />
  <div>
    <label for="name">Insert your name:</label>
    <input type="text" name="name" v-model="newName" />

    <label for="username">Insert your username:</label>
    <input type="email" name="username" v-model="newUsername" />

    <label for="website">Insert your website:</label>
    <input type="text" name="website" v-model="newWebsite" />

    <input class="input-file" ref="file" type="file" />
  </div>

  <button @click="editProfile">Save changes</button>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const name = ref(null);

const newName = ref("");
const newUsername = ref("");
const newWebsite = ref("");
const newAvatar_url = ref("");


async function editProfile() {
  await userStore.fetchUser();
  await userStore.editProfile(
    id: user.id,
    name: newName.value
    username: newUsername.value,website: newWebsite.value
    avatar_url: newAvatar_url.value);
}


// title: currentTaskTitle.value,
//       description: currentTaskDescription.value,
//       id: props.task.id,
</script>

<style></style>
