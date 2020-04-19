import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import axios from "axios";
import store from "./store";
import moment from "moment";
import VueCookie from "vue-cookie";
import { createWebSocket } from "../websocket";
moment.locale("zh-cn");

VueCookie.config = "3d"; //设置默认cookie过期失效

Vue.use(ElementUI);
axios.defaults.baseURL = "/api";

axios.defaults.withCredentials = true; //允许携带cookie
Vue.prototype.$cookie = VueCookie;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.moment = moment;
axios.defaults.headers.accessToken = sessionStorage.getItem("token"); //请求头中添加token

const ws = createWebSocket("ws://192.168.0.198:2333", Vue.prototype);
Vue.prototype.ws = ws;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
