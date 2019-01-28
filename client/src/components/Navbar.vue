<template>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    v-model="drawer"
    :mini-variant="miniVariantDrawer"
    fixed
    dark
    app
    width="250"
    disable-resize-watcher
    disable-route-watcher
  >
    <v-list class="pa-1">
      <v-list-tile v-if="miniVariantDrawer" @click.stop="toggleMiniVariantDrawer">
        <v-list-tile-action>
          <v-icon>chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile avatar tag="div">
        <v-list-tile-avatar>
          <img src="../assets/user.png">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ userFullName }}</v-list-tile-title>
          <span class="caption">({{ userRole }})</span>
        </v-list-tile-content>
        <v-btn small flat icon class="mr-0" @click.stop="toggleMiniVariantDrawer">
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0">
      <v-divider light></v-divider>

      <v-list-tile
        v-for="item in navItems"
        :key="item.title"
        @click.stop="navigateTo(item.location)"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click.stop="logout">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    navItems: {
      type: Array,
      required: true
    }
  },

  methods: {
    toggleMiniVariantDrawer () {
      this.$store.commit("toggleMiniVariantDrawer");
    },

    logout () {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },

    navigateTo (route) {
      this.$store.commit("toggleDrawer");
      this.$router.push(route);
    },

    getProfileImage () {}
  },

  computed: {
    userFullName () {
      let user = this.$store.getters.user;
      let name = user.firstName + " " + (user.lastName ? user.lastName : "");
      return name.trim();
    },

    userRole () {
      let userRole = this.$store.getters.userRole;

      if (userRole === "admin") {
        return "Admin";
      } else if (userRole === "user") {
        return "User";
      } else if (userRole === "communityBuilder") {
        return "Community Builder";
      } else {
        return "Other";
      }
    },

    drawer: {
      get () {
        return this.$store.state.drawer;
      },

      set (state) {
        if (state !== this.$store.state.drawer) {
          this.$store.commit("toggleDrawer");
        }
      }
    },

    miniVariantDrawer: {
      get () {
        return this.$store.state.miniVariantDrawer;
      },

      set (state) {
        this.$store.commit("toggleMiniVariantDrawer");
      }
    }
  }
};
</script>
