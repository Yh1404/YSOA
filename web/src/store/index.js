import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: sessionStorage.getItem("id"),
    name: sessionStorage.getItem("name"),
    department: sessionStorage.getItem("department"),
    identity: sessionStorage.getItem("identity"),
    token: sessionStorage.getItem("token")
  },
  getters: {
    //get login state
    id: state => state.id,
    username: state => state.username,
    token: state => state.token,
    department: state => state.department,
    identity: state => state.identity
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
      state.userName = data.username;
      state.identity = data.identity;
      state.department = data.department;
      sessionStorage.setItem("id", data._id);
      sessionStorage.setItem("name", data.name);
      sessionStorage.setItem("identity", data.identity.name);
      sessionStorage.setItem("department", data.department.name);
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
