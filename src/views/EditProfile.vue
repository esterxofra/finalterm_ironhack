<template>
  <Nav />
  <!-- FORMULARIO PARA EDITAR EL PERFIL DEL USUARIO -->
  <div class="wrapper-account">
    <div class="account-container">
      <div class="account-header">
        <h2>Edit Profile</h2>
      </div>

      <form class="account-content">
        <div class="account-edit-card">
          <!-- EDITAR NOMBRE -->
          <label class="label-task" for="name">Insert your name:</label>
          <input
            type="text"
            class="input-task"
            autocomplete="off"
            name="name"
            v-model="name"
          />

          <!-- EDITAR USERNAME -->
          <label class="label-task" for="username">Insert your username:</label>
          <input
            type="text"
            class="input-task"
            autocomplete="off"
            name="username"
            v-model="username"
          />

          <!-- EDITAR WEBSITE -->
          <label class="label-task" for="website">Insert your website:</label>
          <input
            type="text"
            class="input-task"
            autocomplete="off"
            name="website"
            v-model="website"
          />

          <!-- SUBIR UNA NUEVA IMAGEN AL PERFIL -->
          <div class="image-button">
            <input
              class="input-task"
              @change="uploadAvatar"
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
            />
          </div>

          <!-- BOTÓN PARA GUARDAR LOS CAMBIOS Y VOLVER A LA PÁGINA DE ACCOUNT -->
          <div class="edit-button-container">
            <button class="edit-button" @click.prevent="editProfile">
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <Footer />
  <MenuHome />
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import MenuHome from "../components/MenuHome.vue";

// DECLARAR VARIABLE USERSTORE PARA CONECTARNOS CON LA STORE
const userStore = useUserStore();

// DECLARAR VARIABLE PARA REDIRIGIRNOS A OTRA PÁGINA
const redirect = useRouter();

const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const name = ref(null);

onMounted(() => {
  getProfile();
});

// Función para traer los datos de la store (editProfile)
async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.username;
  avatar_url.value = userStore.profile.avatar_url;
  website.value = userStore.profile.website;
  name.value = userStore.profile.name;
}

// FUNCIÓN PARA EDITAR EL PERFIL
async function editProfile() {
  if (
    website.value.length === 0 ||
    username.value.length === 0 ||
    name.value.length === 0
  ) {
    alert("The information can not be empty");
  } else {
    await userStore.fetchUser();
    await userStore.editProfile(
      username.value,
      website.value,
      name.value,
      avatar_url.value
    );
    console.log(avatar_url.value);
    //La subida del archivo
    //La recogida de la URL del archivo subido
    //Automatización de la vinculación de la img de perfil con la url.
    redirect.push({ path: "/account" });
  }
}

// DECLARAMOS LAS VARIABLES PARA ACTUALIZAR LA IMAGEN DE PERFIL
const prop = defineProps(["path", "size"]);
const { path, size } = toRefs(prop);

const emit = defineEmits(["upload", "update:path"]);
const uploading = ref(false);
const src = ref("");
const files = ref();

// FUNCIÓN PARA SUBIR Y ACTUALIZAR LA IMAGEN DE PERFIL
const uploadAvatar = async (evt) => {
  files.value = evt.target.files;
  try {
    uploading.value = true;
    if (!files.value || files.value.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = files.value[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${Math.random()}.${fileExt}`;

    let { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: false });
    avatar_url.value =
      "https://ssweakhxvlswlzlvsqiq.supabase.co/storage/v1/object/public/avatars/" +
      filePath;

    if (uploadError) throw uploadError;
    emit("update:path", filePath);
    emit("upload");
  } catch (error) {
    alert(error.message);
  } finally {
    uploading.value = false;
  }
};
</script>

<style></style>
