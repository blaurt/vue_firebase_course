<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item v-for="(ad,i) in promoAds" :key="i" :src="ad.src">
            <div class="car-link">
              <v-btn class="error" :to="`/ad/${ad.id}`">{{ad.title}}</v-btn>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="(ad,i) in ads" :key="i">
          <v-card>
            <v-img :src="ad.src" aspect-ratio="2.75" height="200px"></v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                <div>{{ ad.title }}</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat>Open</v-btn>
              <v-btn raised class="primary">Buy</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 class="text-xs-center pt-5">
          <v-progress-circular :width="3" :size="100" :color="'green'" indeterminate></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    promoAds() {
      return this.$store.getters.promoAds;
    },
    ads() {
      return this.$store.getters.ads;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style scoped>
.car-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  background: rgba(0, 0, 0, 0.5);
  transform: translate(-50%, 0);
  padding: 5px 15xp;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
</style>
