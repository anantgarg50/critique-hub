import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    miniVariantDrawer: false,
    user: null,
    token: null
  },

  getters: {
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
      state.loggedIn = true;
      state.token = data.token;
      state.user = data.user;
    },

    clearLoginData (state, data) {
      state.loggedIn = false;
      state.token = null;
      state.user = null;
    }
  },

  actions: {
    login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        localStorage.setItem("token", data.token);
        Vue.prototype.$http.defaults.headers.common["Authorization"] = data.token;
        commit("setLoginData", data);
        resolve();
      })
    },

    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit("clearLoginData");
        localStorage.removeItem("token");
        delete Vue.prototype.$http.defaults.headers.common["Authorization"];
        resolve();
      })
    }
  }
})
