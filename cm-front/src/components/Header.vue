<template>
    <div class="header__wrapper">
        <nav class="main-nav">
            <ul class="nav-list">
                <li class="nav-item nav-item--logo">
                    <router-link class="nav-link" to="/">
                        <img v-if="checkLogin"
                             :src="headerLogo.logoFederation"
                             alt="logo" class="nav-logo--img">
                        <img v-else
                             :src="headerLogo.logoChampion"
                             alt="logo"
                             class="nav-logo--img">
                    </router-link>
                <li class="nav-item nav-item-contacts">
                    <ul class="nav-list nav-list--sub">
                        <li class="nav-item">
                            <a v-if="checkLogin" :href="'tel:' + userObj.contact_telephone">Phone: {{
                                userObj.contact_telephone }}</a>
                            <a v-else href="tel:38067000001">Phone: +38067000001</a>
                        </li>
                        <li class="nav-item">
                            <a v-if="checkLogin" :href="'mailto:' + userObj.contact_email">E-mail: {{
                                userObj.contact_email }}</a>
                            <a v-else href="mailto:admin@champion.com">E-mail: admin@champion.com</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item d-flex align-items-center nav-item-user" v-if="checkLogin">
                    <div class="user">
                        <div class="user__date">Valid until
                            <time class="user__time">{{ userData.validUntil }}</time>
                        </div>
                        <div class="user__wrap">
                            <div class="user__wrap-inner">
                                <img src="img/user-photo.png" alt="User" class="user__photo">
                                <div class="user__menu">
                                    <div class="user__name">userName</div>
                                    <ul class="user__menu-items">
                                        <router-link tag="li" to="/federationcabinet" class="user__item btn btn-primary btn-user"
                                                     v-if="this.role ==='federation'">
                                            <a class="user__link">Cabinet</a></router-link>
                                        <router-link tag="li" to="/coachcabinet"
                                                     class="user__item btn btn-primary btn-user"
                                                     v-else-if="this.role==='coach'">
                                            <a class="user__link">Cabinet</a>
                                        </router-link>
                                        <router-link tag="li" to="/userprofile" class="user__item btn btn-primary btn-user"
                                                     v-else-if="this.role==='sportsman'">
                                            <a class="user__link">Profile</a>
                                        </router-link>
                                        <router-link tag="li" to="/settings"
                                                     class="user__item btn btn-primary btn-user"
                                                     v-if="this.role==='coach' || this.role==='sportsman'">
                                            <a class="user__link">Settings</a>
                                        </router-link>
                                        <li @click="logout()" class="user__item c-pointer btn btn-primary btn-user">
                                            <a class="user__link">Exit {{this.role}}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="nav-item nav-item-logout" v-if="checkLogin">
                    <button class="btn btn-primary btn-user" v-on:click="logout">Logout</button>
                </li>
                <li class="nav-item nav-item-buttons" v-else>
                    <router-link tag="button" class="btn btn-primary btn-user" to="/auth">Log in</router-link>
                    <router-link tag="button" class="btn btn-primary btn-user" to="/registration">Registration
                    </router-link>
                </li>
                <!--<li class="nav-item nav-item-lang">-->
                    <!--<ul class="list-group list-group-show">-->
                        <!--<li class="list-group-item" :class="{'list-group-border-bottom': languages.selectedLang}"-->
                            <!--@click="languages.activeClass = !languages.activeClass">{{-->
                            <!--languages.selectedLang }}-->
                        <!--</li>-->
                        <!--<li class="list-group-item-display"-->
                            <!--:class="{'list-group-item-display-show': languages.activeClass}">-->
                            <!--<ul class="list-group list-group-border-none">-->
                                <!--<li class="list-group-item"-->
                                    <!--v-for="lang in languages.langList"-->
                                    <!--:key="lang"-->
                                    <!--v-if="lang !== languages.selectedLang"-->
                                    <!--@click="[setActiveLang($event), languages.activeClass = !languages.activeClass]">-->
                                    <!--{{ lang }}-->
                                <!--</li>-->
                            <!--</ul>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</li>-->
            </ul>
        </nav>
    </div>
</template>

<script>
// import axios from "axios";

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
      userObj: {},
      userData: {
        id: "",
        validUntil: "10.10.2020",
        userName: "Denis Yermolin",
        userLogo: "img/header/user.png"
      },
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
  methods: {
    checkRole: function() {
      // var role;
      if (this.$store.state.authUser.federation_users.length !== 0) {
        this.role = "federation";
        window.console.log(this.role);
        // return role;
      } else if (this.$store.state.authUser.my_sportsmen_profile) {
        if (
          this.$store.state.authUser.my_sportsmen_profile
            .federation_sportsmen[0].is_coach === true
        ) {
          this.role = "coach";
          window.console.log(this.role);
          // return role;
        }
      } else {
        this.role = "sportsman";
        window.console.log(this.role);
        // return role;
      }
    },
    logout: function() {
      localStorage.removeItem("lbUser");
      this.$store.state.isLoggedIn = false;
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
    }
  },
  computed: {
    checkLogin() {
      if (this.$store.state.isLoggedIn) {
        this.getUserId();
        this.checkRole();
      }
      return this.$store.state.isLoggedIn;
    }
  }
};
</script>

<style lang="scss" scoped>
$bg-color: #343a40;

.header__wrapper {
  padding: 5px 0;
  /*<!--background-color: $bg-color;-->*/
  background: #373b44; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #4286f4,
    #373b44
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4286f4, #373b44);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.c-pointer {
  cursor: pointer;
}
.nav {
  &-list {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    justify-content: center;
    align-items: center;
    &--sub {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &-item {
    margin-right: 10px;
    margin-left: 10px;
    position: relative;
    &--logo {
      margin-right: auto;
    }
  }
  &-logo--img {
    max-height: 32px;
  }
  &-link {
    background: none;
  }
}
.user {
  display: inline-flex;
  flex-direction: column;
  color: #fff;
  &__name {
    padding: 8px 0;
  }
  &__wrap {
    display: flex;
    justify-content: space-between;
  }
  &__photo,
  &__menu,
  &__menu-items {
    display: inline-block;
    vertical-align: middle;
  }
  &__menu-items {
    padding: 0;
    margin: 0;
    width: 100%;
    display: none;
    position: absolute;
    background-color: $bg-color;
    opacity: 0;
    z-index: 100;
  }
  &__photo {
    max-width: 100px;
  }
  &__menu {
    padding: 0;
    margin: 0 0 0 10px;
    list-style: none;
    position: relative;
    &:hover .user__menu-items {
      display: block;
      animation: showMenu 0.5s forwards;
    }
  }
  &__item {
    display: block;
    transition: background-color 0.1s;
    &:hover {
      background-color: #c8c8c8;
    }
    &:hover .user__link {
      color: #000;
    }
  }
  &__link {
    display: block;
    color: #fff;
    padding: 8px 0;
    &:hover {
      text-decoration: none;
      color: #fff;
    }
  }
}
.list-group {
  list-style: none;
  &-border-none &-item:first-child {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  & > &-border-bottom {
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
  &-item {
    cursor: pointer;
    padding: 0.35rem 0.95rem;
  }
  &-item-display {
    display: none;
    position: absolute;
    top: 103%;
    opacity: 0;
    z-index: 9 !important;
    &-show {
      display: block;
      animation: showMenu 0.5s forwards;
    }
  }
}
.list-group-border-bottom {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
@keyframes showMenu {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
// HAMBURGER
.nav-item-hamburger {
  z-index: 999;
}
.hamburger {
  display: none;
  cursor: pointer;
}
.menu-btn {
  display: inline-block;
  vertical-align: middle;
  width: 35px;
  height: 35px;
  background-color: #ffffff;
  border-radius: 50%;
  position: relative;
  span {
    position: absolute;
    top: 50%;
    margin-top: -1px;
    left: 50%;
    width: 20px;
    height: 2px;
    background-color: #222;
    margin-left: -10px;
    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      margin-top: -1px;
      left: 50%;
      width: 20px;
      height: 2px;
      background-color: #222;
      margin-left: -10px;
      display: block;
      transition: 0.3s;
    }
    &:before {
      transform: translateY(-5px);
    }
    &:after {
      transform: translateY(5px);
    }
  }
}
.menu-btn_active {
  span {
    height: 0;
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
}
.hamburger__fixed {
  position: fixed;
  left: 0;
}
// MOBILE MENU
.mobile {
  position: fixed;
  top: 0;
  box-shadow: initial;
  height: 100%;
  width: 400px;
  left: -600px;
  transition: left 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
  background-color: #fff;
  z-index: 9;
  &__nav {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__item {
    transition: background-color 0.1s linear;
    &-logo {
      margin-bottom: 10px;
    }
    &-contacts {
      margin-bottom: 30px;
    }
    &-user {
      padding: 10px 0;
    }
    .logo-container {
      width: 65px;
      height: 65px;
      margin: 0 auto;
      &-img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
    &:last-child {
      padding: 10px 0;
    }
    &-hover {
      cursor: pointer;
    }
    &-hover:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: center;
    width: 100%;
  }
  &__link {
    color: #000;
    display: block;
    padding: 10px 0;
    &:hover {
      color: inherit;
      text-decoration: none;
    }
  }
}
.mobile-slideIn {
  left: 0;
  box-shadow: 5px 1px 10px 0 rgba(0, 0, 0, 0.3);
}
.list-group {
  list-style: none;
  &-border-none &-item:first-child {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  & > &-border-bottom {
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
  &-item {
    cursor: pointer;
    padding: 0.35rem 0.95rem;
  }
  &-item-display,
  &-item-mobile {
    display: none;
    position: absolute;
    top: 103%;
    opacity: 0;
    z-index: 100;
    &-show {
      display: block;
      animation: showMenu 0.5s forwards;
    }
  }
  &-item-mobile {
    top: 45px;
  }
}
.list-group-border-bottom {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
@keyframes showMenu {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
// MEDIA QUERIES
@media screen and (min-width: 821px) {
  .mobile {
    display: none;
  }
}
@media screen and (max-width: 1140px) {
  .checkboxes {
    display: none !important;
  }
}
@media screen and (max-width: 836px) {
  .nav-item {
    &-user,
    &-logout,
    &-contacts,
    &-buttons {
      display: none;
    }
    &-hamburger {
      margin-right: auto;
    }
    &--logo {
      margin: 0 auto;
    }
  }
  .hamburger {
    display: inline-block;
  }
}
@media screen and (max-width: 545px) {
  .nav-item {
    &--logo {
      margin: 0 auto;
    }
  }
}
@media screen and (max-width: 474px) {
  .nav-item-user {
    display: none !important;
  }
}
@media screen and (max-width: 360px) {
  .mobile {
    width: 100%;
    height: 100%;
  }
}
</style>
