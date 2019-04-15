<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="text"
                v-model="email"
                :rules="rules.email"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                :rules="rules.password"
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="!valid || loading"
              @click="handleSubmit"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 10;
export default {
  data() {
    return {
      email: "admin2@admin.com",
      password: "admin2",
      valid: false
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    MIN_PASSWORD_LENGTH: () => MIN_PASSWORD_LENGTH,
    rules() {
      return {
        email: [
          v => !!v || "E-mail is required",
          v => /.+@.+/.test(v) || "E-mail must be valid"
        ],
        password: [
          v => !!v.trim().length || "Password is required",
          v => {
            return (
              (v.length >= MIN_PASSWORD_LENGTH &&
                v.length <= MAX_PASSWORD_LENGTH) ||
              `Password must be more ${MIN_PASSWORD_LENGTH} and less ${MAX_PASSWORD_LENGTH} symbols`
            );
          }
        ]
      };
    }
  },
  methods: {
    handleSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("loginUser", user)
          .then(() => this.$router.push("/"));
      }
    }
  },
  created() {
    if (this.$route.query["loginError"]) {
      this.$store.dispatch("setError", "Please, login to access");
    }
  }
};
</script>
