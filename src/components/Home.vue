<template>
  <div>
    <v-container fluid>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item v-for="(ad,i) in ads" :key="i" :src="ad.src">
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
              <v-space></v-space>
              <v-btn flat>Open</v-btn>
              <v-btn raised class="primary">Buy</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ads: [
        {
          id: 1,
          title: "1st",
          description: "11111111",
          promo: false,
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          id: 2,
          title: "2nd",
          description: "22222222222",
          promo: true,
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          id: 3,
          title: "3rd",
          description: "3333333333333",
          promo: true,
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        }
      ]
    };
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
