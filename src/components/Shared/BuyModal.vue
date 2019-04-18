<template>
  <v-dialog v-model="dialog" width="400px">
    <v-btn class="primary" flat slot="activator">Buy</v-btn>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Do you want to buy it?</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field name="name" label="Name" type="text" v-model="name" :rules="[v=>!!v]"></v-text-field>
              <v-text-field
                name="description"
                label="Description"
                type="text"
                multi-line
                v-model="editedDescription"
                :rules="[v=>!!v]"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="onCancel" :disabled="localLoading">Cancel</v-btn>
              <v-btn
                class="success"
                flat
                @click="onSave"
                :disabled="localLoading"
                :loading="localLoading"
              >BUY IT!</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["ad"],
  data() {
    return {
      dialog: false,
      name: "",
      editedDescription: "",
      localLoading: false
    };
  },
  methods: {
    onCancel() {
      this.dialog = false;
      this.name = "";
      this.editedDescription = "";
    },
    onSave() {

      if (this.name && this.editedDescription) {
        this.localLoading = true;
        const payload = {
          id: this.ad.id,
          name: this.name,
          description: this.editedDescription,
          ownerId: this.ad.ownerId
        };
        this.$store.dispatch("createOrder", payload).then(() => {
          this.name = "";
          this.editedDescription = "";
          this.localLoading = false;
          this.dialog = false;
        });
      }
    }
  }
};
</script>
