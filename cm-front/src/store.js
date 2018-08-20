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
    postSportsman: "http://champion-api.herokuapp.com/api/sportsman",
    getEmailValidation:
      "https://champion-api.herokuapp.com/api/user/find?email=", //+userEmail, 200 true, 404 false
    sportsmanList: {},
    sportsmenList: [],
    sportsmanIds: [],
    selectedSportsmen: [],
    sportsman: {
      first_name: "",
      last_name: "",
      patronymic_name: "",
      gender: "",
      date_of_birth: "2018-07-10",
      degree: "",
      weight: "",
      city: "",
      coaches: ""
    },
    roles: {
      userIsSportsman: false,
      userIsCoach: false,
      userIsFederation: true
    },
    tournamentsList: []
  },
  getters: {
    getFilteredSportsmenList: (state) => (search) => {
      return state.sportsmenList.filter(sportsman => {
        return (
            sportsman.first_name.toLowerCase().includes(search.toLowerCase()) || 
            sportsman.last_name.toLowerCase().includes(search.toLowerCase()) || 
            sportsman.patronymic_name.toLowerCase().includes(search.toLowerCase())
        )
      })
    }
  },
  mutations: {
    setSportsmenList(state, sportsmenList) {
      state.sportsmenList = sportsmenList;
    },
    setSportsmanList(state, sportsmanList) {
      state.sportsmanList = sportsmanList.reduce(
        (acc, sportsman) => ({
          ...acc,
          [sportsman.id]: sportsman
        }),
        {}
      );
      state.sportsmanIds = Object.getOwnPropertyNames(state.sportsmanList);
      console.log(state.sportsmanList);
    },
    setSelectedSportsmen(state) {
      state.selectedSportsmen = state.sportsmanIds;
    },
    removeSportsman(state) {
      state.selectedSportsmen.map(id => {
        delete state.sportsmanList[id];
        let index = state.sportsmanIds.indexOf(id);
        state.sportsmanIds.splice(index, 1);
      });
      state.selectedSportsmen = [];
    },
    clearSportsmanModel(state) {
      state.sportsman = {
        first_name: "",
        last_name: "",
        patronymic_name: "",
        gender: "",
        date_of_birth: "2018-07-10",
        degree: "",
        weight: "",
        city: "",
        coaches: ""
      };
    },
    setTournamentsList(state, tournamentsList) {
      state.tournamentsList = tournamentsList;
      console.log(state.tournamentsList);
    }
  },
  actions: {}
});
