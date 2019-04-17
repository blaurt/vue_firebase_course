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
    },
    updateAd(state, { title, description, id }) {
      const ad = state.ads.find(a => a.id == id);
      ad.title = title;
      ad.description = description;
    }
  },
  actions: {
    async createAd({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const newAd = new Ad({ ...payload, ownerId: getters.user.id });
        console.log("newAd", newAd);
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
            src: imageSrc
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
    },
    async updateAd({ commit }, { title, description, id }) {
      commit("clearError");
      commit("setLoading", true);

      try {
        await fb
          .database()
          .ref("ads")
          .child(id)
          .update({
            title,
            description
          });
        commit("updateAd", {
          id,
          title,
          description
        });
      } catch (error) {
        commit("setError", error.message);
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
    myAds(state, getters) {
      return state.ads.filter(ad=> ad.ownerId == getters.user.id);
    },
    getById(state) {
      return adId => {
        return state.ads.find(ad => ad.id == adId);
      };
    }
  }
};

export default adsState;
