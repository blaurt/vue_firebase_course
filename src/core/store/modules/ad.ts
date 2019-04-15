import * as fb from "firebase";

class Ad {
  title: string;
  description: string;
  ownerId: string;
  src: string;
  promo: boolean;
  id: string;

  constructor({
    title,
    description,
    ownerId,
    src = "http://img10.reactor.cc/pics/post/furry-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-furry-art-furry-artist-5105679.jpeg",
    promo = false,
    id = ""
  }) {
    this.title = title;
    this.description = description;
    this.ownerId = ownerId;
    this.src = src;
    this.promo = promo;
    this.id = id;
  }
}

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
      src:
        "http://img10.reactor.cc/pics/post/furry-%D1%84%D1%8D%D0%BD%D0%B4%D0%BE%D0%BC%D1%8B-furry-art-furry-f-5131451.png"
    }
  ]
};

const adsState: any = {
  state: {
    ads: []
  },
  mutations: {
    createAd(state, ad) {
      state.ads.push(ad);
    },
    setAds(state, payload) {
      state.ads = payload;
    }
  },
  actions: {
    async createAd({ commit, getters }, ad) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const newAd = new Ad({ ...ad, ownerId: getters.user.id });
        console.log("getters.user.id", getters.user.id);

        const fbResponse = await fb
          .database()
          .ref("ads")
          .push(newAd);
        commit("createAd", { ...newAd, id: fbResponse.key });
      } catch (error) {
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },
    async fetchAds({ commit }) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const fbResponse = await fb
          .database()
          .ref("ads")
          .once("value");
        const ads = fbResponse.val();
        console.log("ads", ads);

        const adsArray = [] as any;
        for (const key in ads) {
          adsArray.push({...ads[key], id:key});
        }
        commit("setAds", adsArray);
      } catch (error) {
        throw error;
      } finally {
        commit("setLoading", false);
      }
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
