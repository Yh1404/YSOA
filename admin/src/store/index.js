import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: sessionStorage.getItem("id"),
    name: sessionStorage.getItem("name"),
    token: sessionStorage.getItem("token")
  },
  getters: {
    //get login state
    id: state => state.id,
    name: state => state.name,
    token: state => state.token
  },
  mutations: {
    //set token
    SetToken(state, data) {
      state.token = data;
      sessionStorage.setItem("token", data);
    },
    //set user infomation
    SetUserInfo(state, data) {
      state.id = data._id;
      state.username = data.username;
      sessionStorage.setItem("id", data._id);
      sessionStorage.setItem("name", data.name);
    },
    //clear all of login infomation
    ClearLoginInfoAll() {
      sessionStorage.clear();
    }
  },
  actions: {
    SetTokenAsync({ commit }, data) {
      commit("SetToken", data);
    },
    SetUserInfoAsync({ commit }, data) {
      commit("SetUserInfo", data);
    },
    ClearLoginInfoAllAsync({ commit }) {
      commit("ClearLoginInfoAll");
    }
  }
});
