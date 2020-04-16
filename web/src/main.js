import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import axios from "axios";
import store from "./store";
import moment from "moment";
import VueCookie from "vue-cookie";

moment.locale("zh-cn");

let ws = new WebSocket("ws://localhost:2333");
VueCookie.config = "3d";

Vue.use(ElementUI);

Vue.prototype.$cookie = VueCookie;
Vue.prototype.ws = ws;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.moment = moment;
axios.defaults.baseURL = "/api";
axios.defaults.headers.accessToken = sessionStorage.getItem("token");
axios.defaults.withCredentials = true;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
