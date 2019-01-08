import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    miniVariantDrawer: false,
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token")
  },

  getters: {
    user: state => state.user,
    userId: state => state.user && state.user._id,
    userRole: state => state.user && state.user.role,
    isLoggedIn: state => !!state.token
  },

  mutations: {
    toggleDrawer (state) {
      state.drawer = !state.drawer
    },

    toggleMiniVariantDrawer (state) {
      state.miniVariantDrawer = !state.miniVariantDrawer
    },

    setLoginData (state, data) {
      state.token = data.token;
      state.user = data.user;
    },

    clearLoginData (state, data) {
      state.drawer = false;
      state.miniVariantDrawer = false;
      state.token = null;
      state.user = null;
    }
  },

  actions: {
    login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        Vue.prototype.$http.defaults.headers.common["Authorization"] = data.token;
        commit("setLoginData", data);
        resolve();
      })
    },

    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit("clearLoginData");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete Vue.prototype.$http.defaults.headers.common["Authorization"];
        resolve();
      })
    }
  }
})
