<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 class="text-xs-center pt-5" v-if="loading">
        <v-progress-circular :width="4" :size="100" :color="'green'" indeterminate></v-progress-circular>
      </v-flex>

      <v-flex v-else-if="!loading && orders.length !==0 " xs12 sm6 offset-sm3>
        <h1 class="text--secondary">Orders</h1>
        <v-list subheader two-line>
          <v-subheader>Hangout notifications</v-subheader>

          <v-list-tile @change="markDone(item)" v-for="item in orders" :key="item.id">
            <v-list-tile-action>
              <v-checkbox v-model="item.done" color="success"></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click="notifications = !notifications">
              <v-list-tile-title>{{item.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{item.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn color="primary" :to="`/ad/${item.id}`">open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--primary">No orders</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    orders() {
      return this.$store.getters.orders;
    }
  },
  created() {
    this.$store.dispatch("fetchOrders");
  },
  methods: {
    markDone(order) {
      order.done = true;
    }
  }
};
</script>
