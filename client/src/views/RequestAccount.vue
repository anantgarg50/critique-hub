<template>
  <v-container fill-height>
    <v-layout align-center justify-center text-xs-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card elevation-1>
          <v-card class="elevation-1 pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <h1 class="flex mb-4 grey--text text--darken-3">Request Account</h1>
              </div>
              <v-form ref="requestAccountForm" lazy-validation>
                <v-text-field
                  append-icon="person"
                  label="E-mail"
                  type="text"
                  v-model="creds.email"
                  :rules="[rules.required, rules.email]"
                  required
                ></v-text-field>
                <v-text-field
                  append-icon="phone"
                  label="Phone"
                  type="text"
                  maxlength="10"
                  v-model="creds.phone"
                  :rules="[rules.required, rules.phone]"
                  required
                ></v-text-field>
                <v-text-field
                  label="Country"
                  type="text"
                  v-model="creds.country"
                  :rules="[rules.required]"
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
                @click="requestAccount"
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
    creds: {
      email: "",
      phone: "",
      country: ""
    },
    rules: {
      required: value => !!value || "This field is required.",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Enter a valid E-mail.";
      },
      phone: value =>
        value.length === 10
          ? !isNaN(value)
            ? true
            : "Enter a valid Phone Number."
          : "Phone number should contain exactly 10 digits."
    }
  }),
  methods: {
    requestAccount () {
      if (this.$refs.requestAccountForm.validate()) {
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
