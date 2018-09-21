import Vue from "vue";
import Vuelidate from "vuelidate";
import BootstrapVue from "bootstrap-vue";
import VuePaginate from "vue-paginate";
import * as firebase from "firebase";

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
    window.addEventListener('beforeunload', this.logOut);
    firebase.initializeApp({
      apiKey: "AIzaSyB25AhdbYD1lwX9JcPb-H9tEaTIPojbKaM",
      authDomain: "champion-app-tournaments.firebaseapp.com",
      databaseURL: "https://champion-app-tournaments.firebaseio.com",
      projectId: "champion-app-tournaments",
      storageBucket: "champion-app-tournaments.appspot.com",
      messagingSenderId: "91933137040"
    });
  },
  methods: {
    logOut: function(event) {
      if(localStorage.getItem('rememberMe') === "false") {
        window.console.log("event", event);
        localStorage.removeItem("lbUser");
        this.$store.state.isLoggedIn = false;
        this.$store.state.role = "";
      }
      
    }
  }
}).$mount("#app");
