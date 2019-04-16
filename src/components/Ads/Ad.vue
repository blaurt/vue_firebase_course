<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-responsive>
            <v-img :src="ad.src" height="300px"/>
          </v-responsive>
          <v-card-text>
            <h1 class="text--primary">{{ad.title}}</h1>
            <p>{{ad.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <edit-ad-modal :ad="ad"></edit-ad-modal>
            <v-btn class="success">Buy</v-btn>
          </v-card-actions>
        </v-card>
        <div v-else>
          <v-progress-circular :width="3" :size="100" :color="'green'" indeterminate></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditAdModal from "./EditAdModal";
export default {
  props: ["id"],
  components: {
    EditAdModal
  },
  computed: {
    ad() {
      return this.$store.getters.getById(this.id);
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
