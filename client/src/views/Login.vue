<template>
  <v-container>
    <v-layout align-center justify-center text-xs-center row wrap>
      <v-flex xs12 my-5>
        <div class="display-2 font-weight-medium logo-title grey--text text--darken-3">Critique-Hub</div>
      </v-flex>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg4>
          <v-card elevation-1>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex mb-4 grey--text text--darken-3">Login</h1>
                </div>
                <v-form ref="loginForm" lazy-validation>
                  <v-text-field
                    append-icon="person"
                    label="E-mail"
                    type="text"
                    v-model="creds.email"
                    :rules="[rules.required, rules.email]"
                    required
                  ></v-text-field>
                  <v-text-field
                    :append-icon="passVisible ? 'visibility' : 'visibility_off'"
                    @click:append="() => (passVisible = !passVisible)"
                    :type="passVisible ? 'text' : 'password'"
                    label="Password"
                    v-model="creds.password"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="mx-1">
                <v-btn
                  class="grey--text text-capitalize"
                  flat
                  small
                  to="/reset-password"
                >Forgot Password?</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  style="min-width: 120px"
                  class="primary"
                  @click="login"
                  :loading="loading"
                >Login</v-btn>
              </v-card-actions>
              <div class="text-xs-center">
                <v-btn
                  class="grey--text"
                  style="text-transform: none"
                  flat
                  small
                  to="/register"
                >Not a member yet? Request Account</v-btn>
              </div>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    passVisible: false,
    creds: {
      email: "",
      password: ""
    },
    rules: {
      required: value => !!value || "This field is required.",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Enter a valid E-mail.";
      }
    }
  }),
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true;
        this.$http
          .post("login", this.creds)
          .then(response => {
            this.$store.dispatch("login", response.data).then(() => {
              let redirectRoute;
              let getters = this.$store.getters;

              if (getters.userRole === "admin") {
                redirectRoute = `/admin/${getters.userId}/profile`;
              } else {
                redirectRoute = `/user/${getters.userId}`;
              }

              console.log(redirectRoute);
              this.$router.push(redirectRoute);
            });
          })
          .catch(err => {
            console.log(err.response);
          });
      }

      this.loading = false;
    }
  }
};
</script>

<style scoped>
</style>
