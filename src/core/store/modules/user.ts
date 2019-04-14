import * as fb from "firebase";

class User {
  id: any;
  constructor(id) {
    this.id = id;
  }
}

const adsState: any = {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await fb
          .auth()
          .createUserWithEmailAndPassword(email, password);
        user.user && commit("setUser", new User(user.user.uid));
      } catch (error) {
        commit("setError", error.message);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },
    async loginUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      console.log('setLoading');
      
      try {
        const user = await fb
          .auth()
          .signInWithEmailAndPassword(email, password);
        user.user && commit("setUser", new User(user.user.uid));
      } catch (error) {
        commit("setError", error.message);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
};

export default adsState;
