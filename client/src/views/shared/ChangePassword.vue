<template>
  <v-container>
    <v-layout align-center justify-center text-xs-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card elevation-1>
          <v-card class="elevation-1 pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <h1 class="flex mb-4 grey--text text--darken-3">Change Password</h1>
              </div>
              <v-form ref="changePasswordForm" lazy-validation>
                <v-text-field
                  :append-icon="currentPassVisible ? 'visibility' : 'visibility_off'"
                  @click:append="() => (currentPassVisible = !currentPassVisible)"
                  :type="currentPassVisible ? 'text' : 'password'"
                  label="Current Password"
                  v-model="creds.currentPassword"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
                <div class="my-3"></div>
                <v-text-field
                  :append-icon="newPassVisible ? 'visibility' : 'visibility_off'"
                  @click:append="() => (newPassVisible = !newPassVisible)"
                  :type="newPassVisible ? 'text' : 'password'"
                  label="New Password"
                  v-model="creds.newPassword"
                  :rules="[rules.required, rules.password]"
                  required
                ></v-text-field>
                <v-text-field
                  type="password"
                  label="Re-enter Password"
                  v-model="retypedPassword"
                  :rules="[rules.required, rules.matchPasswords(retypedPassword ,this.creds)]"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="mx-1">
              <v-spacer></v-spacer>
              <v-btn
                style="min-width: 120px"
                class="primary"
                @click="changePassword"
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
    currentPassVisible: false,
    newPassVisible: false,
    retypedPassword: "",
    creds: {
      currentPassword: "",
      newPassword: ""
    },
    rules: {
      required: value => !!value || "This field is required.",
      password: value =>
        (value && value.length >= 8) || "Minimum 8 characters required.",
      matchPasswords: (value, creds) =>
        value === creds.newPassword || "Passwords do not match!"
    }
  }),
  methods: {
    changePassword () {
      if (this.$refs.changePasswordForm.validate()) {
        this.loading = true;
        setTimeout(() => {
          this.$router.push("/admin/1234");
          this.loading = false;
        }, 1000);
      }
    }
  }
};
</script>

<style scoped>
</style>
