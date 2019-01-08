<template>
  <v-app>
    <v-content>
      <transition mode="out-in">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data () {
    return {};
  },

  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });

    console.log("Logged in: " + this.$store.getters.isLoggedIn);
  }
};
</script>

<style>
#app {
  background-color: #efefef;
}
</style>
