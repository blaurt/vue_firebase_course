<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit="handleSubmit" v-model="valid">
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="text"
                v-model="email"
                :rules="rules.email"
              ></v-text-field>
              <v-text-field
                validate-on-blur
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                :rules="rules.password"
                v-model="password"
              ></v-text-field>
              <v-text-field
                validate-on-blur
                prepend-icon="lock"
                name="passwordRepeat"
                label="Repeat password"
                type="password"
                :rules="rules.passwordRepeat"
                v-model="passwordRepeat"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const MIN_PASSWORD_LENGTH = 3;
const MAX_PASSWORD_LENGTH = 5;

export default {
  data() {
    return {
      email: "",
      password: "",
      passwordRepeat: "",
      valid: false
    };
  },
  computed: {
    MIN_PASSWORD_LENGTH: () => MIN_PASSWORD_LENGTH,
    rules() {
      return {
        email: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ],
        password: [
          v => !!v.trim().length || "Password is required",
          v =>
            (v.length >= MIN_PASSWORD_LENGTH &&
              v.length <= MAX_PASSWORD_LENGTH) ||
            `Password must be more ${MIN_PASSWORD_LENGTH} and less ${MAX_PASSWORD_LENGTH} symbols`
        ],
        passwordRepeat: [v => this.password === v || "Passwords do not match"]
      };
    }
  },
  methods: {
    handleSubmit(data) {
      console.log("submit data", data);
    }
  }
};
</script>
