<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 md6 offset-sm3 v-if="!loading && myAds.length !==0">
        <h1 class="text--secondary mb-3">Ad list</h1>
        <v-card v-for="ad in ads" class="elevation-10 mb-3" :key="ad.id">
          <v-layout row wrap>
            <v-flex xs4>
              <v-responsive>
                <img :src="ad.src" alt height="175px">
              </v-responsive>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">{{ad.title}}</h2>
                <p>{{ad.description}}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="info" :to="`/ad/${ad.id}`">Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 class="text-xs-center" v-else-if="!loading && myAds.length == 0">
        <h1 class="text--primary">You have no ads</h1>
      </v-flex>
      <v-flex v-else>
        <h1 class="text--primary">Loading</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    ads() {
      return this.$store.getters.ads;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
