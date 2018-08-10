<template>
    <div>
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
                <tr class="row" v-for="item in $store.state.sportsmanList">
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
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "tournament-participants",
        data: function () {
            return {
            }
        },
        beforeMount() {
            this.$store.state.sportsmanList = {};
        },
        mounted() {
            axios.get("https://champion-api.herokuapp.com/api/sportsman/list")
                .then(response => {
                    this.$store.commit('setSportsmanList', response.data);
                })
                .catch(error => console.log(error));
        },
        methods: {

        }
    }
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