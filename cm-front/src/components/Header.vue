<template>
    <div class="header__wrapper">
        <nav class="main-nav">
            <ul class="nav-list nav-list--top">
                <li class="nav-item">
                    <a v-if="this.role==='federation' || this.role==='coach' || this.role==='sportsman'"
                       :href="'mailto:' + this.$store.state.federationInfo.contact_email" class="header__toplink header__toplink--email">
                        {{this.$store.state.federationInfo.contact_email }}
                    </a>
                    <a v-else href="mailto:admin@champion.com" class="header__toplink header__toplink--email">admin@champion.com</a>
                </li>
                <li class="nav-item">
                    <a v-if="this.role==='federation' || this.role==='coach' || this.role==='sportsman'"
                       :href="'tel:' + this.$store.state.federationInfo.contact_telephone" class="header__toplink header__toplink--tel">
                        {{this.$store.state.federationInfo.contact_telephone }}
                    </a>
                    <a v-else href="tel:38067000001" class="header__toplink header__toplink--tel">+38067000001</a>
                </li>
            </ul>
            <div class="container">
                <ul class="nav-list nav-list--bottom">
                    <li class="nav-item nav-item--logo">
                        <router-link class="nav-link" to="/">
                            <img class="header__logo" src="../assets/logo.svg" alt="Logo" width="103" height="58.2">
                        </router-link>
                    <li class="nav-item" v-if="checkLogin">
                        <div class="user">
                            <div class="user__date">Valid until
                                <time class="user__time">{{ userData.validUntil }}</time>
                            </div>
                            <div class="user__wrap">
                                <div class="user__wrap-inner">
                                    <img src="img/user-photo.png" alt="User" class="user__photo">
                                    <div class="user__menu">
                                        <!--<div class="user__name">-->
                                        <!--<span v-if="this.role ==='federation'"></span>-->
                                        <!--<span v-else-if="this.role==='coach' || this.role==='sportsman'"></span>-->
                                        <!--</div>-->
                                        <ul class="user__menu-items"
                                            style="list-style: none; display: flex; justify-content: space-between;">
                                            <router-link tag="li" to="/federationcabinet" class="user__item"
                                                         v-if="this.role ==='federation'">

                                                <!--v-if="this.$store.state.authUser.federation_users.length !== 0">-->
                                                <a class="user__link">Cabinet</a></router-link>
                                            <router-link tag="li" to="/coachcabinet"
                                                         class="user__item"
                                                         v-else-if="this.role==='coach'">

                                                <!--v-else-if="!!this.$store.state.authUser.my_sportsmen_profile-->
                                                <!--.federation_sportsmen[0].is_coach">-->
                                                <a class="user__link">Cabinet</a>
                                            </router-link>
                                            <router-link tag="li" to="/userprofile" class="user__item"
                                                         v-else-if="this.role==='sportsman'">
                                                <a class="user__link">Profile</a>
                                            </router-link>
                                            <router-link tag="li" to="/settings"
                                                         class="user__item">
                                                <a class="user__link">Settings</a>
                                            </router-link>
                                            <li class="user__item">
                                                <a @click="logout()" class="user__link">Exit</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div class="nav-item nav-item-logout" v-if="checkLogin">
                        <button v-on:click="logout">Logout</button>
                    </div>
                    <div class="nav-item nav-item-buttons" v-else>
                        <router-link tag="button" to="/auth">Log in</router-link>
                        <router-link tag="button" to="/registration">Registration
                        </router-link>
                    </div>
                    </li>

                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Header",
  data: function() {
    return {
      languages: {
        selectedLang: "en",
        langList: ["en", "ru", "ua"],
        activeClass: false,
        activeClassMobile: false
      },
      role: "",
      // userObj: {},
      userData: {
        id: "",
        validUntil: "10.10.2020",
        userName: "Denis Yermolin",
        userLogo: "img/header/user.png"
      },
      user: {},
      menu: [
        {
          title: "My Profile",
          titleFederation: "Federation"
        },
        {
          titleCoach: "My Cabinet",
          titleSportsman: "Settings"
        },
        {
          title: "Exit"
        }
      ],
      headerLogo: {
        logoChampion: "img/header/logo_champion.png",
        logoFederation: "img/header/logo_federation.png"
      },
      toggleClass: {
        hamburger: false,
        mobileMenu: false
      }
    };
  },
  mounted() {
    // this.getRole();
  },
  methods: {
    logout: function() {
      localStorage.removeItem("lbUser");
      this.$store.state.isLoggedIn = false;
      // this.getRole();
      this.role = "";
      this.$router.push("/");
      window.console.log(
        "store.state.isLoggedIn value - " + this.$store.state.isLoggedIn
      );
    },
    getUserId: function() {
      window.console.log("getUserId");
    },
    setActiveLang(e) {
      this.languages.selectedLang = e.target.textContent.trim();
    },
    getFederationInfo: function() {
      window.console.log("getFederationInfo");
      axios
        .get(
          "https://champion-api.herokuapp.com/api/federation/" +
            this.$store.state.authUser.federation_users[0].federation_id
        )
        .then(response => {
          window.console.log(response.data);
          this.$store.federationInfo = response.data;
        })
        .catch(function(error) {
          //     // handle error
          window.console.log(error);
        });
    },
    getSportsmanInfo: function() {
      window.console.log("getSportsmanInfo");
      axios
        .get(
          "https://champion-api.herokuapp.com/api/federation/" +
            this.$store.state.authUser.my_sportsmen_profile
              .federation_sportsmen[0].federation_id
        )
        .then(response => {
          window.console.log(response.data);
          this.$store.federationInfo = response.data;
        })
        .catch(function(error) {
          //     // handle error
          window.console.log(error);
        });
    },
    getRole: function() {
      if (this.$store.state.authUser.federation_users.length !== 0) {
        this.role = "federation";
        window.console.log(this.role);
        this.getFederationInfo();
        // return role;
      } else if (
        this.$store.state.authUser.my_sportsmen_profile.federation_sportsmen[0]
          .is_coach
      ) {
        // if (
        //   this.$store.state.authUser.my_sportsmen_profile
        //     .federation_sportsmen[0].is_coach === true
        // ) {
        this.role = "coach";
        this.getSportsmanInfo();
        window.console.log(this.role);
        // return role;
        // }
      } else {
        this.role = "sportsman";
        this.getSportsmanInfo();
        window.console.log(this.role);
      }
    }
  },

  computed: {
    checkLogin() {
      if (this.$store.state.isLoggedIn) {
        this.getUserId();
        this.getRole();
        // this.getFederationInfo();
      }
      return this.$store.state.isLoggedIn;
    }
  }
};
</script>

<style lang="scss" scoped>
.header__toplink {
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #757373;
  margin-right: 40px;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 6px;
  padding-bottom: 7.5px;
  padding-left: 33px;
  &--email {
    background-image: url("../assets/e-moil_icon.svg");
    background-repeat: no-repeat;
    background-size: 23px 23px;
    background-position: center left;
  }
  &--tel {
    background-image: url("../assets/phone_icon.svg");
    background-repeat: no-repeat;
    background-size: 23px 23px;
    background-position: center left;
  }
}

.header__svg {
  margin-right: 10px;
}

.header__wrapper {
    background-color: #ffffff;
    box-shadow: 0 2px 10px 0 #e9e9e9;
}
.nav-list {
  outline: 1px solid green;
    display: flex;
    list-style: none;
    /*min-height: 80px;*/
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    &--top{
        background-color: #f5f5f5;
        display:flex;
        list-style: none;
        align-items: center;
        justify-content: center;
    }
    &--bottom{

    }
}
a {
  outline: 1px solid red;
}
    li{
        outline: 1px solid blue;
    }
</style>
