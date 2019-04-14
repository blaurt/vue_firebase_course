const adsState: any = {
  state: {
    user: null
  },
  mutations: {
    createAd(state, ad) {
      state.ads.push(ad);
    }
  },
  actions: {
    createAd({ commit }, ad) {
      ad.id = Math.random();
      commit("createAd", ad);
    }
  },
  getters: {
    user(state: any) {
      return state.user;
    }
  }
};

export default adsState;
