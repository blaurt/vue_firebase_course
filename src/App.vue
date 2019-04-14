<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="showDrawer">
      <v-list>
        <v-list-tile v-for="link in links" :key="link.url" :to="link.url">
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="onLogout" v-if="isUserLoggedIn">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Log out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon @click="showDrawer = !showDrawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link :to="{name: 'home'}" class="home-link">Vue Ads</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="link in links" :key="link.url" :to="link.url">
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn flat @click="onLogout" v-if="isUserLoggedIn">
          <v-icon left>exit_to_app</v-icon>Log out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>

    <template v-if="error">
      <v-snackbar
        :multi-line="mode === 'multi-line'"
        :timeout="3000"
        :bottom="true"
        :right="true"
        color="error"
        :value="true"
      >
        {{ error }}
        <v-btn dark flat @click="closeSnackbar">Close</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  data: function() {
    return {
      showDrawer: false
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      const authedLinks = [
        { title: "Orders", icon: "bookmark_border", url: "/orders" },
        { title: "New ad", icon: "note_add", url: "/new" },
        { title: "My ads", icon: "list", url: "/list" }
      ];

      const notAuthedLinks = [
        { title: "Login", icon: "lock", url: "/login" },
        { title: "Registration", icon: "face", url: "/register" }
      ];

      return this.isUserLoggedIn ? authedLinks : notAuthedLinks;
    }
  },
  methods: {
    closeSnackbar() {
      this.$store.dispatch("clearError");
    },
    onLogout() {
      this.$store.dispatch("logoutUser")
      .then(()=>this.$router.push({name: 'home'}));
    }
  }
};
</script>

<style lang="scss" scoped>
.home-link {
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
}
</style>
