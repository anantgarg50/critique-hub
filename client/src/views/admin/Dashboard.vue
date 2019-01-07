<template>
  <v-app>
    <toolbar></toolbar>
    <navbar></navbar>
    <v-container fluid>
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </v-container>
  </v-app>
</template>

<script>
export default {
  methods: {
    log () {
      console.log(this);
    }
  },

  computed: {
    test () {
      return this.$router.currentRoute.fullPath;
    }
  }
};
</script>
