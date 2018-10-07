<template>
    <div>
        <h2 class="groups">Groups</h2>
        <button class="group__button" @click="ModalShow">Create Group</button>
        <div class="groups-wrapper">
            <div
                    class="group__content"
                    @click="$emit('open', index)"
                    v-for='(card, index) in cards'
            >
                <img src="../../../assets/run.jpg" alt="picture" width="224" height="154">
                <h3 class="group__desc">{{card.title}}</h3>
                <p class="group__text__fon"
                    v-for='(clas, key) in card.classes'
                >{{key}} {{clas}}</p>
                <div class="group__mask">
                    <div class="group__top">
                    </div>
                    <h3 class="group__text">{{card.members}}
                        <img class="group__img" src="../../../assets/2people.png"/>
                    </h3>
                </div>

            </div>
            <div class="test" v-for="group in groups">
                <div>{{group.name}}</div>
            </div>
        </div>

        <popup-group
                v-if="groupModalShow"
                @click.prevent="ModalClose"
                @clicked="ModalClose">
        </popup-group>
    </div>
</template>
<style scoped lang="scss">
    .groups {
        display: inline-block;
    }

    .groups-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 10px 10px 10px 50px;
    }

    .group__button {
        width: 200px;
        height: 50px;
        background-color: #28a745;
        border-radius: 5px;
        margin-top: 10px;
        color: #fff;
        font-size: 25px;
        margin-left: 670px;
    }

    .group {
        &__img {
            width: 25px;
            height: 25px;
            margin-bottom: 9px;
            margin-left: 5px;
            filter: invert(100%);
        }
        &__top {
            height: 5px;
            width: 100%;
            -webkit-backdrop-filter: blur(4px);
            backdrop-filter: blur(4px);
            background-color: #f77f00;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            margin-bottom: auto;
        }
        &__text,
        &__title,
        &__desc {
            margin: 0;
            font-family: "Roboto", sans-serif;
            font-size: 30px;
        }

        &__h {
            font-family: "Roboto", sans-serif;
            font-size: 20px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #262626;
            padding: 6.2px 0 13.9px 0;
        }

        &__desc {
            font-family: "Roboto", sans-serif;
            font-size: 20px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #262626;
            padding: 6.2px 0 13.9px 0;
        }
        &__title {
            font-size: 20px;
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #ffffff;
        }
        &__text {
            font-size: 30px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.05;
            letter-spacing: normal;
            color: #ffffff;
            padding: 10px;
        }

        &__text__fon {
            font-size: 15px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: 0.01;
            letter-spacing: normal;
            color: #000000;
            padding: 2px;
        }

        &__content {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 10px;
            border-radius: 5px;
            background-color: #ffffff;
            border: solid 1px #e9e9e9;
            width: 224px;
            text-align: center;
            position: relative;
            -webkit-box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.7);
            -moz-box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.7);
            box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.7);
            &:hover {
                cursor: pointer;
            }
            &:hover .group__mask {
                display: flex;
            }
            &:hover {
                border: none;
            }
        }
        &__mask {
            /*display: flex;*/
            display: none;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            -webkit-backdrop-filter: blur(6px);
            backdrop-filter: blur(6px);
            background-image: linear-gradient(
                            to top,
                            #000000,
                            rgba(255, 255, 255, 0.42)
            );
            -webkit-box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.7);
            -moz-box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.7);
            box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.7);
        }
    }
</style>
<script>
    import PopupGroup from '../Groups/PopupGroup';
    import axios from 'axios';
    export default {
        name: "group",
        components: {
            PopupGroup
        },
        props: ["cards"],
        data() {
            return {
                groups: [],
                groupModalShow: false,
                http: axios.create({
                    headers: {
                        Authorization: "Bearer " + this.$store.state.authUser.auth_token
                    }
                })
            };
        },
        mounted() {
            this.getGroups()
        },
        methods: {
            getGroups: function () {
                const coach = this.$store.state.authUser.my_sportsmen_profile.federation_sportsmen[0].sportsman_id;
                this.http
                    .get("https://champion-api.herokuapp.com/api/groups-by-coach/" + coach)
                    .then(response => {
                        this.groups = response.data;
                    })
            },
            ModalShow: function () {
                this.groupModalShow = true
            },
            ModalClose: function () {
                this.groupModalShow = false
            },

        }
    };
</script>
