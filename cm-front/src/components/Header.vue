<template>
    <div class="header__wrapper">
        <nav class="header__menu menu">
            <ul class="menu__list menu__list--top">
                <li class="menu__item">
                    <!--<a v-if="this.role==='federation' || this.role==='coach' || this.role==='sportsman'"-->
                    <a v-if="this.$store.state.role==='federation' || this.$store.state.role==='coach' || this.$store.state.role==='sportsman'"
                       :href="'mailto:' + this.$store.state.federationInfo.contact_email"
                       class="menu__link menu__link--email">
                        {{this.$store.state.federationInfo.contact_email }}
                    </a>
                    <a v-else href="mailto:admin@champion.com"
                       class="menu__link menu__link--email">admin@champion.com</a>
                </li>
                <li class="menu__item">
                    <a v-if="this.$store.state.role==='federation' || this.$store.state.role==='coach' || this.$store.state.role==='sportsman'"
                       :href="'tel:' + this.$store.state.federationInfo.contact_telephone"
                       class="menu__link menu__link--tel">
                        {{this.$store.state.federationInfo.contact_telephone }}
                    </a>
                    <a v-else href="tel:38067000001" class="menu__link menu__link--tel">+38067000001</a>
                </li>
            </ul>
            <div class="container">
                <ul class="menu__list menu__list--bottom">
                    <li class="menu__item menu__item--logo">
                        <router-link class="menu__link" to="/">
                            <img class="menu__logo" src="../assets/logo.svg" alt="Logo" width="103" height="58.2">
                        </router-link>
                    </li>
                    <li v-if="!checkLogin" class="menu__item">
                        <ul class="menu__list menu__list--auth">
                            <li class="menu__item menu__item--auth">
                                <router-link class="menu__link menu__link--auth" tag="a" to="/auth">Log in</router-link>
                            </li>
                            <li class="user__nav-item menu__item--auth">
                                <router-link class="menu__link menu__link--auth" tag="a" to="/registration">Register
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="menu__item" v-if="checkLogin">
                        <div class="user">
                            <!--<div @click="showMenu" class="user">-->
                            <img class="user__photo" src="../assets/345x345_26.jpg" alt="user" width="44">
                            <div class="user__info">
                                <!--<h4 class="user__title">{{this.$store.state.role}}</h4>-->
                                <h4 v-if="this.$store.state.role==='federation'"
                                    class="user__title">{{this.$store.state.federationInfo.name}}</h4>
                                <h4 v-else class="user__title">{{this.$store.state.authUser.my_sportsmen_profile.first_name}}
                                    {{this.$store.state.authUser.my_sportsmen_profile.last_name}}</h4>
                                <p class="user__valid">Valid until 10.10.2020</p>
                            </div>
                            <ul class="user__list">
                                <li class="user__item"
                                    v-if="this.$store.state.role ==='federation'">
                                    <router-link tag="a"
                                                 to="/federationcabinet"
                                                 class="user__link">
                                        Cabinet
                                    </router-link>
                                </li>
                                <li class="user__item"
                                    v-if="this.$store.state.role==='coach'">
                                    <router-link tag="a"
                                                 to="/coachcabinet"
                                                 class="user__link">
                                        Cabinet
                                    </router-link>
                                </li>
                                <li class="user__item"
                                    v-if="this.$store.state.role==='sportsman' || this.$store.state.role==='coach'">
                                    <!--<router-link tag="a"-->
                                                 <!--to="/userprofile"-->
                                                 <!--class="user__link">-->
                                        <!--Profile-->
                                    <!--</router-link>-->
                                    <router-link tag="a"
                                                 :to="'/userprofile' + '/' + this.$store.state.authUser.my_sportsmen_profile.federation_sportsmen[0].sportsman_id"
                                                 class="user__link">
                                        Profile
                                    </router-link>
                                </li>
                                <li class="user__item">
                                    <router-link tag="a"
                                                 to="/settings"
                                                 class="user__link">
                                        Settings
                                    </router-link>
                                </li>
                                <li class="user__item">
                                    <!--<a class="user__link">Exit</a>-->
                                    <a @click="logout()" class="user__link">Exit</a>
                                </li>
                            </ul>
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
      federationInfo: {},
      // userData: {
      //     id: "",
      //     validUntil: "10.10.2020",
      //     userName: "Denis Yermolin",
      //     userLogo: "img/header/user.png"
      // },
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
    if (this.$store.state.isLoggedIn) {
      this.getRole();
    }
  },
  methods: {
    logout: function() {
      localStorage.removeItem("lbUser");
      this.$store.state.isLoggedIn = false;
      // this.getRole();
      this.role = "";
      this.$store.state.role = "";
      this.$router.push("/");
      window.console.log(
        "store.state.isLoggedIn value - " + this.$store.state.isLoggedIn
      );
    },
    // getUserId: function () {
    //     window.console.log("getUserId");
    // },
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
          this.$store.state.federationInfo = response.data;
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
          this.$store.state.federationInfo = response.data;
        })
        .catch(function(error) {
          //     // handle error
          window.console.log(error);
        });
    },
    getRole: function() {
      if (this.$store.state.authUser.federation_users.length !== 0) {
        this.role = "federation";
        this.$store.state.role = this.role;
        window.console.log(this.role);
        this.getFederationInfo();
      } else if (
          !this.$store.state.authUser.my_sportsmen_profile ||
          this.$store.state.authUser.my_sportsmen_profile.federation_sportsmen.length === 0
      ) {
        localStorage.removeItem("lbUser");
        this.$store.state.isLoggedIn = false;
        this.role = "";
        this.$store.state.role = "";
        this.$router.push("/erroronlogin");
      } else if (
        this.$store.state.authUser.my_sportsmen_profile.federation_sportsmen[0]
          .is_coach === 0
      ) {
        this.role = "sportsman";
        this.$store.state.role = this.role;
        this.getSportsmanInfo();
        window.console.log(this.role);
      } else if (
        this.$store.state.authUser.my_sportsmen_profile.federation_sportsmen[0]
          .is_coach === 1
      ) {
        this.role = "coach";
        this.$store.state.role = this.role;
        this.getSportsmanInfo();
        window.console.log(this.role);
      }
    }
  },
  computed: {
    checkLogin() {
      if (this.$store.state.isLoggedIn) {
        // this.getUserId();
        this.getRole();
        // this.getFederationInfo();
      }
      return this.$store.state.isLoggedIn;
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin reset-ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.menu {
  background-color: #ffffff;
  box-shadow: 0 2px 10px 0 #e9e9e9;
  &__item {
    &--logo {
      margin-right: auto;
      margin-top: 10px;
      margin-bottom: 8.7px;
    }
    &--auth {
      margin-right: 30px;
    }
  }
  &__list {
    @include reset-ul();
    display: flex;
    align-items: center;
    &--top {
      justify-content: center;
      background-color: #f5f5f5;
    }
    &--bottom {
      justify-content: flex-end;
    }
    &--auth {
      margin-right: 90px;
    }
  }
  &__link {
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    &--email {
      color: #757373;
      margin-right: 40px;
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-top: 6px;
      padding-bottom: 7.5px;
      padding-left: 33px;
      background-image: url("../assets/e-moil_icon.svg");
      background-repeat: no-repeat;
      background-size: 23px 23px;
      background-position: center left;
    }
    &--tel {
      color: #757373;
      margin-right: 40px;
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-top: 6px;
      padding-bottom: 7.5px;
      padding-left: 33px;
      background-image: url("../assets/phone_icon.svg");
      background-repeat: no-repeat;
      background-size: 23px 23px;
      background-position: center left;
    }
    &--auth {
      color: #333333;
      text-decoration: none;
      padding-bottom: 6.8px;
      &:hover {
        padding-bottom: 4.8px;
        border-bottom: 2px solid #f77f00;
      }
    }
  }
}

.user {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 175px;
  padding-right: 15px;
  background-image: url("../assets/Group.svg");
  background-repeat: no-repeat;
  background-size: 7px 3.6px;
  background-position: right center;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  &:hover .user__list {
    display: flex;
  }
  &__list {
    position: absolute;
    z-index: 5;
    top: 45px;
    right: 0;
    @include reset-ul();
    border-radius: 5px;
    background-color: #ffffff;
    -webkit-box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.7);
    -moz-box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.7);
    box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.7);
    /*display: flex;*/
    display: none;
    flex-direction: column;
    align-content: center;
    justify-content: flex-end;
    width: 100%;
    text-align: center;
    padding: 5px;
  }
  &__link {
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #333333;
    padding: 4px;
    text-decoration: none;
    display: block;
    &:hover {
      /*padding-bottom: 2px;*/
      /*border-bottom: 2px solid #f77f00;*/
      border-radius: 4px;
      background-color: #f77f00;
    }
  }
  &__photo {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-right: 10px;
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-top: auto;
  }
  &__title,
  &__valid {
    text-align: left;
  }
  &__title {
    margin: 0;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #262626;
  }
  &__valid {
    margin: 0;
    font-size: 11px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #c4c4c4;
  }
}

@media (max-width: 1200px) {
    .user {
        margin-right: 20px;
    }
}
@media (max-width: 980px) {
    .container {
        max-width: 950px;
        padding: 0;
        margin: 0 auto;
    }
    .menu {
        &__logo {
            width: 200px;
            height: 100px;
            margin: 10px;
        }
        &__list {
            &--top {
                display: none;
            }
            &--auth {
                justify-content: flex-end;
                margin-right: 0;
            }
        }
        &__link--auth {
            font-size: 4em;
            margin-left: 20px;
        }
    }
    .user {
        width: 400px;
        &__photo {
            width: 80px;
            height: 80px;
        }
        &__title,
        &__valid,
        &__link {
            font-size: 1rem;
        }
        &__list {
            top: 80px;
        }
    }
}
</style>
