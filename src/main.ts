import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./core/router/router";
import store from "./core/store/store";
import "./registerServiceWorker";
import * as fb from "firebase";
import BuyModalComponent from './components/Shared/BuyModal.vue';

Vue.config.productionTip = false;
Vue.component('app-buy-modal', BuyModalComponent)
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    const firebaseConfig = {
      apiKey: "AIzaSyCQdyyr_JX6Gvoi0ISyYhpACi2BVIdDS_M",
      authDomain: "wfm-ads-340bd.firebaseapp.com",
      databaseURL: "https://wfm-ads-340bd.firebaseio.com",
      projectId: "wfm-ads-340bd",
      storageBucket: "wfm-ads-340bd.appspot.com",
      messagingSenderId: "67757651464"
    };

    fb.initializeApp(firebaseConfig);

    fb.auth().onAuthStateChanged(user=>{
      if(user){
        this.$store.dispatch('autologinUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
}).$mount("#app");
