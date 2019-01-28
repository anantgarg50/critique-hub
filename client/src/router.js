import Vue from "vue"
import Router from "vue-router"
import store from "./store"

import Login from "./views/Login.vue"
import ErrorPage from "./views/ErrorPage.vue"
import ForgotPassword from "./views/ForgotPassword.vue"
import RequestAccount from "./views/RequestAccount"
import ComponentContainer from "./components/ComponentContainer.vue"

import UserDashboard from "./views/user/Dashboard.vue"
import ChangePassword from "./views/user/ChangePassword.vue"
import UserProfile from "./views/user/UserProfile.vue"
import MyCommunities from "./views/user/MyCommunities.vue"

import AddUser from "./views/admin/AddUser.vue"
import UserList from "./views/admin/UserList.vue"
import CommunityList from "./views/admin/CommunityList.vue"

import CommunityHomepage from "./views/community/Homepage.vue"

Vue.use(Router)

const getters = store.getters;

const adminGuard = function (to, from, next) {
  if (getters.userRole === "admin") {
    next();
  } else {
    next(from);
  }
}

const userGuard = function (to, from, next) {
  if (getters.isLoggedIn) {
    next();
  } else {
    next("/");
  }
}

const communityGuard = function (to, from, next) {
  if (getters.isLoggedIn) {
    next();
  } else {
    next("/");
  }
}

const loginGuard = function (to, from, next) {
  if (!getters.isLoggedIn) {
    next();
  } else {
    next(`/user/${getters.userId}/profile`);
  }
}

const componentProps = {
  navItemsProp: {
    userNavItems: [
      {
        title: "My Profile",
        icon: "account_box",
        location: `/user/${getters.userId}/profile`
      },
      {
        title: "My Communities",
        icon: "group",
        location: `/user/${getters.userId}/myCommunities`
      },
      {
        title: "Change Password",
        icon: "lock",
        location: `/user/${getters.userId}/changePassword`
      }
    ],

    adminNavItems: [
      {
        title: "My Profile",
        icon: "account_box",
        location: `/user/${getters.userId}/profile`
      },
      {
        title: "Add User",
        icon: "add_circle",
        location: `/user/${getters.userId}/admin/addUser`
      },
      {
        title: "User List",
        icon: "list",
        location: `/user/${getters.userId}/admin/userList`
      },
      {
        title: "Community List",
        icon: "view_list",
        location: `/user/${getters.userId}/admin/communityList`
      },
      {
        title: "My Communities",
        icon: "group",
        location: `/user/${getters.userId}/myCommunities`
      },
      {
        title: "Change Password",
        icon: "lock",
        location: `/user/${getters.userId}/changePassword`
      }
    ]
  }
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      beforeEnter: loginGuard
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      component: ForgotPassword,
      beforeEnter: loginGuard
    },
    {
      path: "/requestAccount",
      name: "requestAccount",
      component: RequestAccount,
      beforeEnter: loginGuard
    },
    {
      path: "/user/:id",
      name: "user",
      component: UserDashboard,
      beforeEnter: userGuard,
      props: {
        navbarItems: componentProps.navItemsProp
      },
      children: [
        {
          path: "profile",
          name: "userProfile",
          component: UserProfile
        },
        {
          path: "changePassword",
          name: "changePassword",
          component: ChangePassword
        },
        {
          path: "myCommunities",
          name: "myCommunities",
          component: MyCommunities
        },
        {
          path: "admin",
          name: "admin",
          component: ComponentContainer,
          beforeEnter: adminGuard,
          children: [
            {
              path: "addUser",
              name: "addUser",
              component: AddUser
            },
            {
              path: "userList",
              name: "userList",
              component: UserList
            },
            {
              path: "communityList",
              name: "communityList",
              component: CommunityList
            }
          ]
        }
      ]
    },
    {
      path: "/community/:id",
      name: "communityHomepage",
      component: CommunityHomepage,
      beforeEnter: communityGuard
    },
    {
      path: "/index.html",
      name: "error",
      redirect: "/"
    },
    {
      path: "*",
      name: "error",
      component: ErrorPage
    }
  ]
})
