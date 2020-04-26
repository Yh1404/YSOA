import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueCookie from "vue-cookie";

VueCookie.config = "3d"; //设置默认cookie过期失效
axios.defaults.withCredentials = true; //允许携带cookie
axios.defaults.baseURL = "/api";

Vue.prototype.$cookie = VueCookie;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
axios.defaults.headers.accessToken = store.getters.token; //请求头中添加token

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
