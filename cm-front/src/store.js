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
    getEmailValidation:
      "https://champion-api.herokuapp.com/api/user/find?email=", //+userEmail, 200 true, 404 false
    sportsmanList: {},
    sportsmanIds: [],
    searchingSportsman: "",
    selectedSportsmen: [],
    federationBelts: {},
    sportsman: {
      first_name: "",
      last_name: "",
      patronymic_name: "",
      gender: "",
      date_of_birth: "",
      degree: "",
      weight: "",
      city: "",
      coaches: ""
    },
    // <<<<<<< HEAD
    roles: {},
      role:"",
    federationInfo: {
      id: 62,
      name: "front end",
      president_name: "notebook",
      logo_id: null,
      sub_domain: "end",
      contact_telephone: "+122223333333",
      contact_email: "stryukovap1981@gmail.com",
      sport_id: 2,
      is_active: 0,
      created_at: "2018-08-06T12:39:43+00:00",
      updated_at: "2018-08-06T12:39:43+00:00",
      belts: [
        {
          id: 21,
          name: "1 DAN",
          federation_id: 62,
          icon_id: null,
          created_at: null,
          updated_at: null
        }
      ],
      logo: null
    },
    tournamentsList: []
  },
  mutations: {
    setSportsmanList(state, sportsmanList) {
      state.sportsmanList = sportsmanList.reduce(
        (acc, sportsman) => ({
          ...acc,
          [sportsman.id]: sportsman
        }),
        {}
      );
      state.sportsmanIds = Object.getOwnPropertyNames(state.sportsmanList);
      window.console.log(state.sportsmanList);
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
        date_of_birth: "",
          title: "",
        weight: "",
        city: "",
          coaches: "",
          my_sportsmen_profile: []
      };
    },
    setTournamentsList(state, tournamentsList) {
      state.tournamentsList = Object.values(tournamentsList).sort(function(a, b) {return new Date(b.dates.dateStart) - new Date(a.dates.dateStart);});
    }
  },
  actions: {}
});
