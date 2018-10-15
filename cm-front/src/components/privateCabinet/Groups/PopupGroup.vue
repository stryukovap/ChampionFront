<template>
    <div class="popup">
        <div class="inner">
            <button
                    class='close'
                    @click="$emit('close')"
            >
                ✖
            </button>
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
                    <button class='btn btn-outline-success btn-create'
                            @click="createGroup"
                    >
                        create group
                    </button>
                </div>
                <div class="schedule">
                    <h2>Schedule</h2>
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
                        <select class='select-day'
                                v-model="time">
                            <option value="10:00">10:00</option>
                            <option value="12:00">12:00</option>
                            <option value="14:00">14:00</option>
                        </select>
                        <div class="schedule" v-for="(schedule, key) in schedules">
                            <span>class.day</span><span>class.time</span>
                            <button @click.prevent="deleteSchedule(key)"><b>X</b></button>
                        </div>
                    </div>
                    <button class='btn btn-outline-success btn-create'
                            @click.prevent="createSchedule"
                    >
                        create schedule
                    </button>
                </div>
                <!--<button @click="deleteSchedule">deleteSchedule</button>-->
                <button class='btn btn-success btn-save'
                        v-on="$listeners"
                        @click.prevent='getSchedule'
                >
                    Save
                </button>
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
                console.log('https://champion-api.herokuapp.com/api/schedule/' + this.group_id);
                this.http
                    .get("https://champion-api.herokuapp.com/api/schedule/" + this.group_id)
                    // .get("https://champion-api.herokuapp.com/api/group/" + this.group_id) it'll be new api
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
    .close {
        position : absolute;
        right : 20px;
        top : 20px;
        width : 30px;
        height : 30px;
        border-radius: 50%;
        background-color : #F00;
        color : #fff;
        font-size : 16px;
        text-align: center;
    }

    input, select, button {
        margin-top: 10px;
    }

    .select-day {
        margin-left: 10px;
    }

    .btn-create,
    .btn-save{
        margin: 10px auto !important;
    }

    .schedule, .group {
        display: flex;
        flex-direction: column;
        align-items: center;
        h2 {
            color: #28a745;
        }
    }

    .schedule {
        margin-top: 20px;
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
    }
    .inner {
        position: relative;
        display: flex;
        align-items: center;
        max-width: 800px;
        max-height: 600px;
        width: 80%;
        height: 80%;
        background-color: #fff;
        border-radius: 15px;
        border : 1px solid #28a745;
        transition: 0.64s ease-in-out;
        overflow-y: auto;
    }
    .edit {
        flex-direction: column;
        justify-content: center;
        width: 90%;
        height: 90%;
        padding: 1rem;
    }
</style>