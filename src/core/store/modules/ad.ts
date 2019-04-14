const defaults = {
  ads: [
    {
      id: 1,
      title: "1st",
      description: "11111111",
      promo: false,
      src:
        "http://img10.joyreactor.cc/pics/post/Tofu93-furry-artist-furry-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-5131385.png"
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

const adsState: any = {
  state: {
    ads: defaults.ads
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
    ads(state: any) {
      return state.ads;
    },
    promoAds(state: any) {
      return state.ads.filter(item => item.promo);
    },
    myAds(state) {
      return state;
    },
    getById(state) {
      return adId => {
        return state.ads.find(ad => ad.id == adId);
      };
    }
  }
};

export default adsState;
