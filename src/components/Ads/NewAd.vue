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
            <v-btn color="success" @click="triggerUpload">
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input
              type="file"
              class="file-input"
              accept="image/*"
              ref="fileInput"
              @change="onFileChange"
            >
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img :style="{margin:'8px'}" v-if="imageSrc" :src="imageSrc" alt height="100px">
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="handleSubmit"
            :loading="loading"
            :disabled="(!valid || !image) || loading"
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
      valid: false,
      image: null,
      imageSrc: ""
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    handleSubmit() {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.addToCarousel,
          image: this.image
        };

        this.$store
          .dispatch("createAd", ad)
          .then(() => this.$router.push({ name: "list" }));
      }
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
    }
  }
};
</script>

<style lang="scss" scoped>
.file-input {
  display: none;
}
</style>
