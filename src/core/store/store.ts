import Vue from "vue";
import Vuex from "vuex";

import AdModule from './modules/ad'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    AdModule
  }
});
