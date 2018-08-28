<template>
    <div class="container">
        <div class="user">
            <div class="user__social-info">
                <!--<img class="user__photo" src="../../assets/competition_medium.jpg" alt="photo" width="185" height="185"-->
                <img class="user__photo" alt="photo" width="185" height="185"
                v-bind:src="this.sportsman.photo.url">
                <div class="user__social">
                    <a href="#" class="user__link user__link--in"></a>
                    <a href="#" class="user__link user__link--fa"></a>
                </div>
            </div>
            <div class="user__info">
                <h4 class="user__title">{{this.sportsman.first_name}}
                    {{this.sportsman.last_name}}</h4>
                <div class="user__wrapper">
                    <ul class="user__list">
                        <h4 class="user__role">{{this.$store.state.role}}</h4>
                        <li class="user__item">
                            <p class="user__belt">is not specified</p>
                            <p class="user__degree">is not specified</p>
                        </li>
                        <li class="user__item">
                            <p class="user__weight">{{this.sportsman.weight}} kg</p>
                        </li>
                        <li class="user__item">
                            <p class="user__city">{{this.sportsman.city}}</p>
                            <p class="user__federation">{{this.$store.state.federationInfo.name}}</p>
                        </li>
                    </ul>
                    <ul class="user__coaches">
                        <h4 class="user__coaches-title">Coaches</h4>
                        <li class="user__coach">is not specified</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!--<div class="row  cm-sp-info">-->
    <!--<div class="col-2 cm-sp-info-photo">-->
    <!--<img v-bind:src="userAvatar" width="150" height="150" alt ="user photo" class = "user__photo">-->
    <!--<user-contacts v-if="userIsCoach"></user-contacts>-->
    <!--</div>-->

    <!--<div class="col-7 cm-sp-info-user user">-->
    <!--<h2 class="user__full-name">{{ userFullName }}</h2>-->
    <!--<p class="user__role">{{ userRole }}</p>-->
    <!--<p class="user__level">-->
    <!--<img src = "img/belt.png" width="25" height="25" alt = "user belt" class = "user__belt">-->
    <!--<span class="user__belt-description"> {{ userLevel }}</span>-->
    <!--</p>-->
    <!--<p class="user__rank">{{ userRank }}</p>-->
    <!--<p class="user__weight">{{ userWeight }}</p>-->
    <!--<p class="user__city">{{ userCity }}</p>-->
    <!--<p class="user__federation">{{ userFederation }}-->
    <!--<a v-bind:href="federationLocation">Show on map</a>-->
    <!--</p>-->
    <!--</div>-->

    <!--<user-coaches></user-coaches>-->
    <!--</div>-->

</template>

<script>
    import axios from "axios";
    // import UserCoaches from "./userCoaches";
    // import UserContacts from "./userContacts";

    export default {
        name: "user-info",
        components: {
            // UserCoaches,
            // UserContacts
        },
        props: ["userIsCoach"],
        data: function () {
            return {
                sportsman:{
                    photo:{
                        url:""
                    }
                }
                // userID: "22",
                // userAvatar: "img/user-photo.PNG",
                // userFullName: "userFullName",
                // userPatronymicName: "userPatronymicName",
                // userDOB: "DOB",
                // userGender: "userGender",
                // userRole: "userRole",
                // userLevel: "userLevel",
                // userRank: "userRank",
                // userWeight: "userWeight",
                // userCity: "userCity",
                // userFederation: "userFederation",
                // federationLocation: "federationLocation"
            };
        },
        beforeCreate() {
            axios
                .get("https://champion-api.herokuapp.com/api/sportsman/" + this.$store.state.authUser.my_profile_id)
                .then(response => {
                    console.log(response.data);
                    if (response.data) {
                        this.sportsman = response.data;
                    }
                })
                .catch(error => console.log(error.message));
            //     .get(`https://champion-api.herokuapp.com/api/sportsman/${this.userID}`)
            //     .then(response => {
            //         this.userFullName =
            //             response.data.first_name + " " + response.data.last_name;
            //         this.userDOB = response.data.date_of_birth;
            //         this.userGender = response.data.gender;
            //         this.userPatronymicName = response.data.patronymic_name;
            //         this.userRole = response.data.username;
            //         this.userLevel = response.data.suite;
            //         this.userRank = response.data.street;
            //         this.userWeight = response.data.zipcode;
            //         this.userCity = response.data.city;
            //         this.userFederation = response.data.company.name;
            //         this.federationLocation = response.data.geo;
            //     })
            //     .catch(error => {
            //         window.console.log(error);
            //     });
        }
    };
</script>

<style scoped lang="scss">
    h3, p {
        margin: 0;
        padding: 0;
    }
    @mixin reset-ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .user {
        /*font-family: "Roboto", sans-serif;*/
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        &__role, &__coaches-title{
            font-family: "Roboto", sans-serif;
            font-size: 18px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #262626;
        }
        &__title{
            text-align: left;
            font-family: 'Nova Square', cursive;
            font-size: 32px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #262626;
        }
        &__info{
            margin-left: 32px;
        }
        &__wrapper{
            display: flex;
        }
        &__list, &__coaches{
            @include reset-ul();
            text-align: left;
        }
        &__list{
            margin-right: 300px;
        }
        &__item{
            padding-left: 30px;
            margin-top: 30px;
        }
        &__coach{
            padding-left: 63px;
        }
        &__belt, &__degree, &__weight, &__city, &__federation, &__coach{
            font-family: "Roboto", sans-serif;
            font-size: 14px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #262626;
        }
        &__link{
            margin-right: 14px;
            width: 25px;
            height: 25px;
            background-size: 25px 25px;
            background-repeat: no-repeat;
            background-position: center center;
            &--in{
                background-image: url("../../assets/instagram-logo.svg");
            }
            &--fa{
                background-image: url("../../assets/facebook-logo-button.svg");
            }
            &:last-child{
                margin-right: 0;
            }
        }
        &__social{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 22px;
        }
        &__photo{
            width: 185px;
            height: 185px;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0 2px 10px 0 #e9e9e9;
        }
    }
</style>
