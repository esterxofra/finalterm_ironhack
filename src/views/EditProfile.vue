<template>
  <Nav />
  <!-- FORMULARIO PARA EDITAR EL PERFIL DEL USUARIO -->
  <form>
    <!-- EDITAR NOMBRE -->
    <label for="name">Insert your name:</label>
    <input type="text" autocomplete="off" name="name" v-model="name" />

    <!-- EDITAR USERNAME -->
    <label for="username">Insert your username:</label>
    <input type="email" autocomplete="off" name="username" v-model="username" />

    <!-- EDITAR WEBSITE -->
    <label for="website">Insert your website:</label>
    <input type="text" autocomplete="off" name="website" v-model="website" />

    <!-- SUBIR UNA NUEVA IMAGEN AL PERFIL -->
    <input
      @change="uploadAvatar"
      type="file"
      name="avatar_url"
      accept=".jpg, .jpeg, .png, .gif"
    />

    <!-- BOTÓN PARA GUARDAR LOS CAMBIOS Y VOLVER A LA PÁGINA DE ACCOUNT -->
    <button @click.prevent="editProfile">Save changes</button>
  </form>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import { useRouter } from "vue-router";

// DECLARAR VARIABLE USERSTORE PARA CONECTARNOS CON LA STORE
const userStore = useUserStore();

// DECLARAR VARIABLE PARA REDIRIGIRNOS A OTRA PÁGINA
const redirect = useRouter();

const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const name = ref(null);

// FUNCIÓN PARA EDITAR EL PERFIL
async function editProfile() {
  console.log("Funciona!!1");
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
      avatar_url.value,
      name.value
    );
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
      "https://zkxclgazccxtzdbcydyq.supabase.co/storage/v1/object/public/avatars/" +
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
