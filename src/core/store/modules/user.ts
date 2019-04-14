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
    registerUser: async function({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await fb
          .auth()
          .createUserWithEmailAndPassword(email, password);
        console.log("user", user);
        user.user && commit("setUser", new User(user.user.uid));
      } catch (error) {
        console.log("error", error);

        commit("setError", error.message);
        throw error
      } finally {
        commit("setLoading", false);
      }
    }
  },
  getters: {
    user(state: any) {
      return state.user;
    }
  }
};

export default adsState;
