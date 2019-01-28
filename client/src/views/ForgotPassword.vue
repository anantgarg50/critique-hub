<template>
  <v-container fill-height>
    <v-layout align-center justify-center text-xs-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card elevation-1>
          <v-card class="elevation-1 pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <h1 class="flex mb-4 grey--text text--darken-3">Reset Password</h1>
              </div>
              <v-form ref="resetPasswordForm" lazy-validation>
                <v-text-field
                  append-icon="email"
                  label="E-mail"
                  type="text"
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="mx-1">
              <v-btn class="grey--text text-capitalize" flat small to="/">Go Back?</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                style="min-width: 120px"
                class="primary"
                @click="resetPassword"
                :loading="loading"
              >Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    email: "",
    rules: {
      required: value => !!value || "This field is required.",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Enter a valid E-mail.";
      }
    }
  }),
  methods: {
    resetPassword () {
      if (this.$refs.resetPasswordForm.validate()) {
        this.loading = true;
        setTimeout(() => {
          console.log("This thing isn't working yet!");
          this.$router.push("/");
          this.loading = false;
        }, 1000);
      }
    }
  }
};
</script>
