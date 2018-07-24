import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Registration from "./views/Registration.vue";
import Auth from "./views/Auth.vue";
import Forgotpassword from "./views/Forgotpassword.vue";
import Restorepassword from "./views/Restorepassword.vue";
import Restorepasswordfalse from "./views/Restorepasswordfalse.vue";
import Userprofile from "./views/Userprofile.vue";
import Federations from "./views/Federations.vue";
import CoachCabinet from "./views/CoachCabinet.vue";
import FederationCabinet from "./views/FederationCabinet.vue";
import BuySubscription from "./components/privateCabinet/buySubscribtion.vue";
import Federation from "./views/Federation.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/about",
            name: "about",
            component: About
        },
        {
            path: "/registration",
            name: "registration",
            component: Registration
        },
        {
            path: "/auth",
            name: "auth",
            component: Auth
        },
        {
            path: "/forgotpassword",
            name: "forgotpassword",
            component: Forgotpassword
        },
        {
            path: "/restorepassword",
            name: "restorepassword",
            component: Restorepassword
        },
        {
            path: "/userprofile",
            name: "userprofile",
            component: Userprofile
        },
        {
            path: "/federations",
            name: "federations",
            component: Federations
        },
        {
            path: "/federation",
            name: "federation",
            component: Federation
        },
        {
            path: "/restorepasswordfalse",
            name: "restorepasswordfalse",
            component: Restorepasswordfalse
        },
        {
            path: "/coachcabinet",
            name: "coach-cabinet",
            component: CoachCabinet
        },
        {
            path: "/federationcabinet",
            name: "federation-cabinet",
            component: FederationCabinet
        },
        {
            path: "/buysubscribtion",
            name: "buysubscription",
            component: BuySubscription,
            props: true
        }
    ],
    mode: "history"
})