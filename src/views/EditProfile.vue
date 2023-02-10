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

async function editProfile() {
  await userStore.fetchUser();
  await userStore.editProfile("Jarko", "Garrido", "López", "Carlos");
}

// const editTask = () => {
//   if (
//     currentTaskTitle.value.length === 0 ||
//     currentTaskDescription.value.length === 0
//     // Si no hay título o descripción, que me salte una alerta
//   ) {
//     alert("The task title or description is empty or just too short");
//   } else {
//     const newTaskEdited = {
//       title: currentTaskTitle.value,
//       description: currentTaskDescription.value,
//       id: props.task.id,
//     };
//     emit("editChild", newTaskEdited);

//     /*
//     JARKO - EL HIJO LLAMA DIRECTAMENTE A LA BASE DE DATOS SIN PASAR POR EL PADRE:
//     await taskStore.editTaskSupabase(
//       currentTaskTitle.value,
//       props.task.id,
//       currentTaskDescription.value
//       */
//   }
// };
</script>

<style></style>
