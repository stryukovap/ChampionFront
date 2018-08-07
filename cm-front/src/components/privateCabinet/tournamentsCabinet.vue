<template>
    <div class="tournaments-cabinet container mt-3">
        <h1>Tournaments</h1>
        <div class="row text-left mt-3 mb-3">
            <h2 class="title col">{{tournament.title}}</h2>
            <button class="col btn btn-success">Start</button>
        </div>
        <div class="row">
            <div class="col">
                <h3>Description</h3>
                <p>{{tournament.description}}</p>
                <p>{{tournament.dateStart}} - {{tournament.dateEnd}}</p>
            </div>
            <div class="col">
                <h3>Referees</h3>
                <div class="col" style="display: flex; flex-wrap: wrap; justify-content: flex-start">
                    <div class="card__referee"
                         v-for="referee in tournament.referees"
                         style=" margin-right: 15px;display: flex; flex-direction: column;align-items: center;">
                        <img src="img/github-mark_560x560.png" width="100px" height="100px"
                             alt="foto referee"
                             class="card__img">
                        <span class="card__desc">{{referee.desc}}</span>
                    </div>
                </div>
            </div>
        </div>
        <Tabs>
            <Tab name="Brackets">Brackets</Tab>
            <Tab name="Participants">
                    <div class="row mt-2">
                        <div class="col-9">
                            <nav class="navbar navbar-light">
                                <form class="form-inline">
                                    <input class="form-control mr-sm-2" type="search" placeholder="Enter name" aria-label="Search">
                                    <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            </nav>
                        </div>
                        <div class="col-2">
                            <button type="button" class="btn btn-outline-primary">Save Changes</button>
                        </div>
                        <div class="col-1">
                            <button type="button" class="btn btn-outline-primary">Add</button>
                        </div>
                    </div>

                    <div class="row ml-2">
                        <table class="table table-hover table-sm">
                            <tbody :list="$store.state.sportsmanList">
                            <tr class="row" v-for="item in $store.state.sportsmanList" :key="item.id">
                                <td class="col-2 text-left">{{item.first_name}} {{item.last_name}}</td>
                                <td class="col-1 text-left">{{item.gender}}</td>
                                <td class="col-2 text-left">{{item.date_of_birth}}</td>
                                <td class="col-1 text-left"><input class="form-control form-control-sm" width="50px"></td>
                                <td class="col-5 text-right"> <button type="button" class="btn btn-outline-primary btn-sm">Submit</button></td>
                                <td class="col-1 text-left"> <button type="button" class="btn btn-outline-primary btn-sm">Delete</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
            </Tab>
        </Tabs>
    </div>
</template>
<script>
    import axios from "axios";
    import {Tabs, Tab} from "vue-tabs-component";

    export default {
        components: {
            Tab,
            Tabs
        },
        data: function () {
            return {
                beforeMount() {
                    this.$store.state.sportsmanList = {};
                },
                mounted() {
                    axios.get("https://champion-api.herokuapp.com/api/sportsman/list")
                        .then(response => {
                            this.$store.commit('setSportsmanList', response.data);
                            window.console.log(response.data)
                        })
                        .catch(error => window.console.log(error));
                },
                tournament: {
                    referees: [
                        {
                            id: 1,
                            desc: "Denis Ermolin",
                        },
                        {
                            id: 2,
                            desc: "Ermolin Denis",
                        },
                        {
                            id: 3,
                            desc: "Nastya Kolobok",
                        }],
                    title: "White Lion Cup",
                    description: "lorem lorem lorem lorem lorem lorem lorem",
                    dateStart: "01.07.2018",
                    dateEnd: "21.07.2018",
                },
            }},}
</script>

<style lang="scss">
    .table {
        &__head-item {
            cursor: pointer;
        }
    }
    .navbar-light {
        margin-top: -8px;
    }
</style>