<template>
    <div>
        <h2>Group</h2>
        <input type="text" name="group_title" id="group_title" placeholder="Group name" v-model="group.name">
        <input type="text" name="month_cost" id="month_cost" placeholder="Month cost" v-model="group.price_monthly">
        <input type="text" name="day_cost" id="day_cost" placeholder="Day cost" v-model="group.price_single">
        <button @click="deleteGroup">deleteGroup</button>
        <button @click="createGroup">createGroup</button>
        <h2>Days</h2>
        <select v-model="day">
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
        </select>
        <select v-model="time">
            <option value="10:00">10:00</option>
            <option value="12:00">12:00</option>
            <option value="14:00">14:00</option>
        </select>
        <button @click="deleteSchedule">deleteSchedule</button>
        <button @click="createSchedule">createSchedule</button>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "PopupGroup",
        data() {
            return {
                group: {
                    name: "",
                    price_monthly: "",
                    price_single: ""
                },
                class: {
                    day: "",
                    time: ""
                },
                group_id: "",
                http: axios.create({
                    headers: {
                        Authorization: "Bearer " + this.$store.state.authUser.auth_token
                    }
                })
            }
        },
        methods: {
            createGroup: function () {
                this.http
                    .post("https://champion-api.herokuapp.com/api/group", {
                        name: this.group.name,
                        price_monthly: this.group.price_monthly,
                        price_single: this.group.price_single
                    })
                    .then(response => {
                        window.console.log(response.data);
                        this.group_id = response.data.id;
                    });
            },
            createSchedule: function () {
                this.http
                    .post("https://champion-api.herokuapp.com/api/schedule", {
                        day: this.day,
                        time: this.time,
                        group_id: this.group_id,
                        comment: "schedule"
                    });
            }
        }
    }
</script>

<style scoped>

</style>