<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-responsive>
            <v-img
              src="http://img10.joyreactor.cc/pics/post/Tofu93-furry-artist-furry-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-5131385.png"
              height="300px"
            />
          </v-responsive>
          <v-card-text>
            <h1 class="text--primary">Lorem</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam non dolore consequuntur beatae pariatur aut sint obcaecati facilis veritatis consectetur nemo saepe fugiat repudiandae perferendis minus quasi, cumque unde iste!</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="warning" flat>Edit</v-btn>
            <v-btn class="success">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
        }
      ]
    };
  }
};
</script>
