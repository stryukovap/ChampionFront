import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem("lbUser")
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
