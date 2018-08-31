<template>
    <ul class="tournament__list">
        <li class="tournament__item" v-for='(tournament) in $store.state.tournamentsList'>
            <div class="tournament__info">
                <img class="tournament__img"
                     :src="tournament.imageUrl">
                <div class="tournament__info-wrapper">
                    <h3 class="tournament__title">{{ tournament.name }}</h3>
                    <div class="tournament__subinfo">
                        <p class="tournament__desc">Start date:</p>
                        <p class="tournament__desc">{{ tournament.dates.dateStart }}</p>
                    </div>
                </div>
                <router-link tag="div" class="tournament__mask" v-bind:to="'/about'">
                    <div class="tournament__top"></div>
                    <h3 class="tournament__title">{{ tournament.name }}</h3>
                    <div class="tournament__subinfo">
                        <p class="tournament__desc">Start date:</p>
                        <p class="tournament__desc">{{ tournament.dates.dateStart }}</p>
                    </div>
                    <div class="tournament__subtitle">{{tournament.description}}</div>
                </router-link>
            </div>
            <div class="tournament__wrapper">
                <p class="tournament__registration">Registration</p>
                <div class="tournament__wrap">
                    <div class="tournament__date">
                        <p class="tournament__text">Starts:</p>
                        <p class="tournament__subtext">{{tournament.dates.dateStart}}</p>
                    </div>
                    <div class="tournament__date">
                        <p class="tournament__text">Finishes:</p>
                        <p class="tournament__subtext">{{tournament.dates.dateEnd}}</p>
                    </div>
                </div>
                <p class="tournament__participants">2/{{ tournament.maxParticipants }} Members</p>
            </div>
        </li>
    </ul>
</template>

<script>
    // import axios from "axios";
    import * as firebase from "firebase";
    export default {
        name: "card",
        data: function () {
            // console.log(tournamentKey);
            return {
                tournamentsShow: true,
                tournamentPageShow: false,
                // tournamentKey: "",
                federationId: this.$route.params.id,
            };
        },
        async mounted() {
            try {
                const fbObj = await firebase
                    .database()
                    .ref(this.federationId)
                    .once("value");
                this.$store.commit("setTournamentsList", fbObj.val());
            } catch (error) {
                throw error;
            }
        }
    }
</script>
<style scoped lang="scss">
    p, h3{
        margin: 0;
        padding: 0;
    }
    .tournament {
        font-family: "Roboto", sans-serif;
        &__list{
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
        }
        &__wrap{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &__wrapper{
            padding-right: 20px;
            padding-left: 20px;
            width: 100%;
        }
        &__registration{
            font-size: 14px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #262626;
            text-align: left;
            margin-top: 17px;
        }
        &__date{
            font-size: 12px;
            font-weight: 300;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #262626;
            margin-top: 10px;
            text-align: left;
        }
        &__subtext{
            font-size: 12px;
            font-weight: 300;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #757373;
            margin-top: 3px;
        }
        &__participants{
            font-weight: 300;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #8d8b8b;
            margin-top: 15px;
            padding-bottom: 10px;
        }
        &__img{
            width: 100%;
            height: auto;
        }
        &__item{
            display: flex;;
            flex-direction: column;
            align-items: center;
            margin-top: 30px;
            margin-bottom: 30px;
            margin-right: 20px;
            height: 300px;
            width: 250px;
            border-radius: 5px;
            overflow: hidden;
            background-color: #ffffff;
            -webkit-box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
            -moz-box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
            box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
            &:hover{
                cursor:pointer;
            }
            &:hover .tournament__mask{
                display: flex;
            }
            &:hover .tournament__info-wrapper{
                display: none;
            }
        }
        &__subtitle{
            font-size: 12px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.05;
            letter-spacing: normal;
            color: #ffffff;
            padding-bottom: 10px;
            padding-right: 20px;
            padding-left: 20px;
        }
        &__info{
            position: relative;
            height: 250px;
            width: 100%;
            overflow: hidden;
            &:before{
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background-image: linear-gradient(to bottom, rgba(196, 196, 196, 0), rgba(117, 115, 115, 0.6) 52%, #262626 96%);
            }
        }
        &__info-wrapper{
            position: absolute;
            width: 100%;
            bottom: 0;
            font-family: "Roboto", sans-serif;
            /*background-image: linear-gradient(to bottom, rgba(196, 196, 196, 0), rgba(117, 115, 115, 0.6) 52%, #262626 96%);*/
        }
        &__mask{
            font-family: "Roboto", sans-serif;
            /*display: flex;*/
            display: none;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            position: absolute;
            top: 0;
            left:0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.65);
        }
        &__top{
                height: 5px;
                width: 100%;
                -webkit-backdrop-filter: blur(4px);
                backdrop-filter: blur(4px);
                background-color: #f77f00;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                margin-bottom: auto;
        }
        &__title{
            font-family: "Roboto", sans-serif;
            font-size: 20px;
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #ffffff;
            padding-left: 30px;
            padding-right: 30px;
        }
        &__subinfo{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-top: 4px;
            padding-left: 30px;
            padding-right: 30px;
            padding-bottom: 9px;
        }
        &__desc{
            font-size: 12px;
            font-weight: 300;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #ffffff;
        }
    }
</style>
