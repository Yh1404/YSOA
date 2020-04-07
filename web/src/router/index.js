import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login.vue";

import store from "../store/index";
import { Message } from "element-ui";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/main",
    name: "Home",
    component: Home,
    meta: { requireAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!store.getters.token && to.meta.requireAuth) {
    Message("请先登录");
    next("/login");
  } else {
    next();
  }
  if (to.path === "/login" && sessionStorage.getItem("token")) {
    Message("请先退出登录");
    next("/main");
  }
});
export default router;
