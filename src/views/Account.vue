<template>
  <Nav />
  <h1>Welcome to your profile page {{ name }} !</h1>
  <div>
    <img
      :src="
        avatar_url
          ? avatar_url
          : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
      "
      alt="Profile picture"
    />
  </div>

  <div>
    <h2>Email: {{ username }}</h2>
    <h2>Website: {{ website }}</h2>
  </div>

  <button @click="editProfileButton">Edit your profile</button>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();

// Router to push user to EditProfile
const redirect = useRouter();

const loading = ref(false);
const username = ref(null);
const website = ref(null);
const avatar_url = ref(null);
const name = ref(null);
const nick_name = ref(null);

onMounted(() => {
  getProfile();
});

async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.username;
  website.value = useUserStore.profile.website;
  avatar_url.value = userStore.profile.avatar_url;
  name.value = userStore.profile.name;
  nick_name.value = userStore.profile.nick_name;
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

const editProfileButton = () => {
  redirect.push({ path: "/account/editprofile" });
};
</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}
</style>
