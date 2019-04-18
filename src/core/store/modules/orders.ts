import fb from "firebase";
class Order {
  public name;
  public description;
  public adid;
  public done;
  public orderId;
  constructor({ name, description, id, done = false, orderId = "" }) {
    this.name = name;
    this.description = description;
    this.done = done;
    this.orderId = orderId;
    this.adid = id;
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    createOrder(state, payload) {
      state.orders.push(payload);
    },
    loadOrders(state, payload) {
      state.orders = payload;
    }
  },
  actions: {
    async createOrder({ commit }, payload) {
      const order = new Order({ ...payload });
      commit("clearError");

      try {
        const newOrder = fb
          .database()
          .ref(`/user/${payload.ownerId}/orders`)
          .push(order);
      } catch (error) {
        commit("setError", error.message);
        throw error;
      } finally {
      }
    },
    async fetchOrders({ commit, getters }) {
      commit("setLoading", true);
      try {
        const ordersResponse = (await fb
          .database()
          .ref(`/user/${getters.user.uid}/orders`)
          .once("value")).val();
        const orders = [] as any[];
        Object.keys(ordersResponse).forEach(key => {
          orders.push(new Order({ ...ordersResponse[key], orderId: key }));
        });

        commit("loadOrders", orders);
      } catch (error) {
        commit("setError", error.message);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    }
  },
  getters: {
    orders(state) {
      return state.orders;
    }
  }
};
