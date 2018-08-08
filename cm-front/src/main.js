import Vue from "vue";
import Vuelidate from "vuelidate";
import BootstrapVue from "bootstrap-vue";
import VuePaginate from "vue-paginate";
import * as firebase from 'firebase';

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(VuePaginate);
Vue.use(BootstrapVue);

Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
      firebase.initializeApp({
          apiKey: "AIzaSyAEeWQim0ju2_EwfDd5YFXiYXPSKw9boVc",
          authDomain: "champion-tournaments.firebaseapp.com",
          databaseURL: "https://champion-tournaments.firebaseio.com",
          projectId: "champion-tournaments",
          storageBucket: "champion-tournaments.appspot.com",
          messagingSenderId: "899578314830"
      });
  }
}).$mount("#app");
