<template>
  <v-app>
    <toolbar></toolbar>
    <navbar :navItems="navItems"></navbar>
    <v-container fluid>
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </v-container>
  </v-app>
</template>

<script>
export default {
  props: {
    navbarItems: {
      type: Object,
      required: true
    }
  },

  methods: {
    log () {
      console.log(this);
    }
  },

  computed: {
    navItems () {
      return this.$store.getters.userRole === "admin"
        ? this.navbarItems.adminNavItems
        : this.navbarItems.userNavItems;
    }
  }
};
</script>
