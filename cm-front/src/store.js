import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem("lbUser"),
    postLoginUrl: "https://champion-api.herokuapp.com/api/login",
    postRegistrationUserUrl: "https://champion-api.herokuapp.com/api/user",
    postResetEmail: "https://champion-api.herokuapp.com/api/password/email",
    sportsmanList: [],
    selectedSportsmans: []
  },
  mutations: {
    setSportsmanList(state, sportsmanList) {
      state.sportsmanList = sportsmanList;
    },
    setSelectedSportsmans(state, sportsmans) {
        state.selectedSportsmans.push(sportsmans);
    }
  },
  actions: {}
});
// export const store = new Vuex.Store({
//     state: {
//         isLoggedIn: !!localStorage.getItem('lbUser')
//     }
//
// });
