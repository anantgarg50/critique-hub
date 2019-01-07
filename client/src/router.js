import Vue from "vue"
import Router from "vue-router"
import store from "./store"
import Login from "./views/Login.vue"
import ErrorPage from "./views/ErrorPage.vue"
import AdminDashboard from "./views/admin/Dashboard.vue"
import CommunityHomepage from "./views/community/Homepage.vue"
import UserDashboard from "./views/user/Dashboard.vue"
import ChangePassword from "./views/shared/ChangePassword.vue"
import UserProfile from "./views/shared/UserProfile.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/admin/:id",
      name: "admin",
      component: AdminDashboard,
      beforeEnter: (to, from, next) => {
        let getters = store.getters;
        if (getters.isLoggedIn && getters.userRole === "admin") {
          next();
        } else {
          next("/");
        }
      },
      children: [
        {
          path: "profile",
          name: "profile",
          component: UserProfile
        },
        {
          path: "changePassword",
          name: "changePassword",
          component: ChangePassword
        }
      ]
    },
    {
      path: "/user/:id",
      name: "user",
      component: UserDashboard,
      beforeEnter: (to, from, next) => {
        let getters = store.getters;
        if (getters.isLoggedIn && (getters.userRole === "user" || getters.userRole === "communityBuilder")) {
          next();
        } else {
          next("/");
        }
      }
    },
    {
      path: "/community/:id",
      name: "community",
      component: CommunityHomepage,
      beforeEnter: (to, from, next) => {
        let getters = store.getters;
        if (getters.isLoggedIn) {
          next();
        } else {
          next("/");
        }
      }
    },
    {
      path: "*",
      name: "error",
      component: ErrorPage
    }
  ]
})
