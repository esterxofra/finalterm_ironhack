import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import Account from "../views/Account.vue";
import EditProfile from "../components/EditProfile.vue";
import Chronometer from "../views/Chronometer.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";

const routes = [
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "login", component: SignIn },
      { path: "signup", component: SignUp },
    ],
  },
  { path: "/", component: Home },
  {
    path: "/account",
    component: Account,
  },
  { path: "/editprofile", component: EditProfile },
  { path: "/chronometer", component: Chronometer },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
