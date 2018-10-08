<template>
    <div class="popup">
        <div class="inner">
            <div class="edit">
                <div class="group">
                    <h2>Group</h2>
                    <input type="text" name="group_title" id="group_title" placeholder="Group name"
                           v-model="group.name">
                    <input type="text" name="month_cost" id="month_cost" placeholder="Month cost"
                           v-model="group.price_monthly">
                    <input type="text" name="day_cost" id="day_cost" placeholder="Day cost"
                           v-model="group.price_single">
                    <!--<button @click="deleteGroup">deleteGroup</button>-->
                    <button @click="createGroup">createGroup</button>
                </div>
                <div class="days">
                    <h2>Days</h2>
                    <div class="day">
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
                        <div class="schedule" v-for="(schedule, key) in schedules">
                            <span>class.day</span><span>class.time</span>
                            <button @click.prevent="deleteSchedule(key)"><b>X</b></button>
                        </div>
                    </div>
                    <button @click.prevent="createSchedule">createSchedule</button>
                </div>
                <!--<button @click="deleteSchedule">deleteSchedule</button>-->
                <button v-on="$listeners">Save</button>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "PopupGroup",
        data() {
            return {
                schedules: [],
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
        mounted() {
            // this.getSchedule()
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
            getSchedule: function () {
                this.http
                    .get("https://champion-api.herokuapp.com/api/schedule/" + this.group_id)
                    .then(response => {
                        this.schedules = response.data;
                    })
            },
            createSchedule: function () {
                this.http
                    .post("https://champion-api.herokuapp.com/api/schedule", {
                        day: this.day,
                        time: this.time,
                        group_id: this.group_id,
                        comment: "schedule"
                    })
                    .then(respons => {
                        console.log(respons.data);
                        // this.getSchedule()
                    })
            },
            deleteSchedule: function (key) {
                this.schedule.splice(key, 1);
                // this.http
                //     .delete("https://champion-api.herokuapp.com/api/schedule/1")

            }
        }
    }
</script>

<style scoped lang="scss">
    input, select, button {
        margin-top: 10px;
    }

    .days, .group {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .popup {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 100vw;
        height: 100vh;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 2;
        overflow: hidden;
        transition: 0.64s ease-in-out;
        &__inner {
            position: relative;
            display: flex;
            align-items: center;
            max-width: 800px;
            max-height: 600px;
            width: 80%;
            height: 80%;
            background-color: #fff;
            transition: 0.64s ease-in-out;
            overflow-y: auto;
        }
        &__edit {
            flex-direction: column;
            justify-content: center;
            width: 90%;
            height: 90%;
            padding: 1rem;
        }
    }
</style>