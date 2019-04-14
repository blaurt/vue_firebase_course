import Vue from "vue";
import Vuex from "vuex";

import AdModule from "./modules/ad";
import UserModule from "./modules/user";

import sharedModule from "./shared";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    AdModule,
    UserModule,
    sharedModule
  }
});
