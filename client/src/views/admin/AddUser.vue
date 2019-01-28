<template>
  <v-container>
    <v-layout align-center justify-center text-xs-center>
      <v-flex xs12 sm8 md6>
        <v-card elevation-1>
          <v-card class="elevation-1 pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <h1 class="flex mb-4 grey--text text--darken-3">Add User</h1>
              </div>
              <v-form ref="addUserForm" lazy-validation>
                <v-text-field
                  append-icon="person"
                  label="First Name"
                  type="text"
                  v-model="creds.firstName"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
                <v-text-field
                  append-icon="email"
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
                  append-icon="flag"
                  label="Country"
                  type="text"
                  v-model="creds.userAddress.country"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
                <v-select
                  v-model="creds.role"
                  :items="items"
                  label="User Role"
                  single-line
                  :rules="[rules.required]"
                ></v-select>
                <v-text-field
                  :append-icon="passVisible ? 'visibility' : 'visibility_off'"
                  @click:append="() => (passVisible = !passVisible)"
                  :type="passVisible ? 'text' : 'password'"
                  label="Password"
                  v-model="creds.password"
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
                @click="addUser"
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
    passVisible: false,
    retypedPassword: "",
    creds: {
      firstName: "",
      email: "",
      phone: "",
      userAddress: {
        country: ""
      },
      password: "",
      role: ""
    },
    rules: {
      required: value => !!value || "This field is required.",
      password: value =>
        (value && value.length >= 8) || "Minimum 8 characters required.",
      matchPasswords: (value, creds) =>
        value === creds.password || "Passwords do not match!",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Enter a valid E-mail.";
      },
      phone: value =>
        value && value.length === 10
          ? !isNaN(value)
            ? true
            : "Enter a valid Phone Number."
          : "Phone number should contain exactly 10 digits."
    },
    items: [
      {
        text: "User",
        value: "user"
      },
      {
        text: "Admin",
        value: "admin"
      },
      {
        text: "Community Builder",
        value: "communityBuilder"
      }
    ]
  }),
  methods: {
    addUser () {
      if (this.$refs.addUserForm.validate()) {
        this.loading = true;
        this.$http
          .post("admin/addUser", this.creds)
          .then(response => {
            this.loading = false;
            console.log(response.data);
            this.$refs.addUserForm.reset();
          })
          .catch(err => {
            this.loading = false;
            console.log(err.response);
          });
      }
    }
  }
};
</script>
