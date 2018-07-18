<template>
    <div class="buy-subscription row">
        <table class="table table-hover">
            <thead>
            <tr>
                <th class="table__head-item" scope="col" @click="sortItems('sportsman')">Sportsman</th>
                <th class="table__head-item" scope="col" @click="sortItems('active')">Active</th>
                <th class="table__head-item" scope="col" @click="sortItems('subscription')">Subscription expiry date</th>
            </tr>
            </thead>
            <tr v-for="item in $store.state.selectedSportsmans">
                <td>{{item.name}}</td>
                <td>{{item.username}}</td>
                <td>{{item.id}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import axios from "axios";

    export default {
        name: "buysubscription",
        mounted() {}
    };
</script>
