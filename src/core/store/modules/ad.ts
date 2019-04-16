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
    src = "",
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
      src: ""
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
      src: ""
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
    async createAd({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const newAd = new Ad({ ...payload, ownerId: getters.user.id });
        const imageExt = payload.image.name.slice(
          payload.image.name.lastIndexOf(".") + 1
        );
        // create new entry
        const fbResponse = await fb
          .database()
          .ref("ads")
          .push(newAd);
        const fileName = `ads/${fbResponse.key}.${imageExt}`;
        // upload new image
        await fb
          .storage()
          .ref(fileName)
          .put(payload.image);
        // get image url
        const imageSrc = await fb
          .storage()
          .ref(fileName)
          .getDownloadURL();
        // update db entry
        await fb
          .database()
          .ref(`ads/${fbResponse.key}`)
          .update({
            imageSrc
          });
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
        const adsArray = [] as any;
        for (const key in ads) {
          adsArray.push({ ...ads[key], id: key });
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
