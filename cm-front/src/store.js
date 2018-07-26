import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem("lbUser"),
    // authUser:localStorage.getItem("lbUser"),
    authUser: JSON.parse(localStorage.getItem("lbUser")),
    postLoginUrl: "https://champion-api.herokuapp.com/api/login",
    postRegistrationUserUrl: "https://champion-api.herokuapp.com/api/user",
    postResetEmail: "https://champion-api.herokuapp.com/api/password/email",
    deleteSportsman: "https://champion-api.herokuapp.com/api/sportsman/22",
    getSportsman: "https://champion-api.herokuapp.com/api/sportsman/22",
    postSportsman: "https://champion-api.herokuapp.com/api/sportsman",
    getEmailValidation: "https://champion-api.herokuapp.com/api/user/find?email=", //+userEmail, 200 true, 404 false
    roles: {
      userIsSportsman: false,
      userIsCoach: false,
      userIsFederation: true
    }
  },
  mutations: {},
  actions: {}
});
