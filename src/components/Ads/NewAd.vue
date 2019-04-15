<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 md6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new add</h1>
        <v-switch label="Add to carousel" v-model="addToCarousel" color="primary"></v-switch>
        <v-form v-model="valid" ref="form" validation>
          <v-text-field
            name="title"
            label="Add title"
            type="text"
            v-model="title"
            required
            :rules="[v=>!!v || 'Title is required']"
          ></v-text-field>
          <v-textarea
            name="description"
            label="Add description"
            type="text"
            :rules="[v=>!!v || 'Description is required']"
            v-model="description"
            multi-line
          ></v-textarea>
        </v-form>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-btn color="success">
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img
              :style="{margin:'8px'}"
              src="http://img10.joyreactor.cc/pics/post/Tofu93-furry-artist-furry-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-5131385.png"
              alt
              height="100px"
            >
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="handleSubmit"
            :loading="loading"
            :disabled="!valid || loading"
          >Create add</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      addToCarousel: true,
      valid: false
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    handleSubmit() {
      console.log("handleSubmit");

      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.addToCarousel
        };

        this.$store
          .dispatch("createAd", ad)
          .then(() => this.$router.push({ name: "list" }));
      }
    }
  }
};
</script>
