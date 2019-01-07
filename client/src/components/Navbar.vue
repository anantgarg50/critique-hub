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
          <img src="https://randomuser.me/api/portraits/men/85.jpg">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>John Leider</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn flat icon @click.stop="toggleMiniVariantDrawer">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0">
      <v-divider light></v-divider>

      <v-list-tile v-for="item in items" :key="item.title" @click.stop>
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {},

  methods: {
    toggleMiniVariantDrawer () {
      this.$store.commit("toggleMiniVariantDrawer");
    }
  },

  computed: {
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
