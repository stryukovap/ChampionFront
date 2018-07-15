import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem("lbUser"),
    postLoginUrl: "https://champion-api.herokuapp.com/api/login",
    postRegistrationUserUrl: "https://champion-api.herokuapp.com/api/user",
    postResetEmail: "https://champion-api.herokuapp.com/api/password/email"
  },
  mutations: {},
  actions: {}
});
// export const store = new Vuex.Store({
//     state: {
//         isLoggedIn: !!localStorage.getItem('lbUser')
//     }
//
// });
