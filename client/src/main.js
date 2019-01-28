import "@babel/polyfill"
import Vue from "vue"
import "./plugins/vuetify"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Axios from "axios"
import "./registerServiceWorker"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "material-design-icons-iconfont/dist/material-design-icons.css"

import Navbar from "./components/Navbar.vue"
import Toolbar from "./components/Toolbar.vue"

const api = Axios.create({
  // baseURL: process.env.VUE_APP_ROOT_API
})

Vue.prototype.$http = api;

// const token = localStorage.getItem("token") || ""
// Vue.prototype.$http.defaults.headers.common["Authorization"] = token

Vue.component("navbar", Navbar)
Vue.component("toolbar", Toolbar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
