<template>
  <Nav />

  <div class="wrapper-account">
    <div class="account-container">
      <div class="account-header">
        <h2>Account</h2>
      </div>

      <div class="account-content">
        <div class="welcome">
          <h2>Welcome, {{ name }}!</h2>
        </div>
        <div class="account-card">
          <div class="card-profile">
            <div class="profile-image">
              <img
                :src="
                  avatar_url
                    ? avatar_url
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                "
                alt="Profile picture"
              />
            </div>

            <div class="info-profile">
              <h3>Email: {{ username }}</h3>
              <h3>Username: {{ website }}</h3>

              <div class="edit-button-container">
                <button class="edit-button" @click.prevent="editProfileButton">
                  Edit your profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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

// Router to push user to EditProfile:
const redirect = useRouter();

// Declarar variable userStore:
const userStore = useUserStore();

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
  console.log(name.value);
}

async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

// FUNCIÓN PARA QUE EL BOTÓN EDIT PROFILE NOS PERMITA IR A LA PÁGINA DE EDICIÓN DE PERFIL:
const editProfileButton = () => {
  redirect.push({ path: "/editprofile" });
};
</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}
</style>
