<template>
    <div>
        <div class="attendance-header">
            <button
                class="back-button info__btn btn btn-primary"
                @click="$emit('close')"
            >Back</button>
            <h2>{{card["title"]}}</h2>
        </div>
        <div class="calendar">

            <div class='schedule-wrapper'>
                <full-calendar
                        :events="classes"
                        locale="ru"
                        first-day='1'
                        @eventClick="eventClick"
                        @dayClick="dayClick"
                        @moreClick="moreClick"
                >
               </full-calendar>

                <attendance-pop-up
                    v-bind:day-of-week="dayOfWeek"
                    class='popup'
                    v-if='popUpShow'
                    v-on:close='closePopUp'
                ></attendance-pop-up>
            </div>
        </div>

    </div>
</template>

<script>
    import AttendancePopUp from './AttendancePopUp';
    import fullCalendar from 'vue-fullcalendar';

    export default {
        name: "attendance",
        props: ['card'],
        components: {
            AttendancePopUp,
            fullCalendar
        },
        data: function () {
            return {
                daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                monthsOfYear: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                dayOfWeek: "Tue",
                popUpShow: false,
                classes: [
                            {
                                title: '',
                                start: ''
                            }
                        ]
            }
        },
        mounted: function () {
                for(let i = 1; i <= 31; i++) {
                    if("Mon" in this.card.classes) {
                        window.console.log("mon");
                    }
                }
        },
        methods: {
            // changeMonth (start, end, current) {
            //     window.console.log('changeMonth', start.format(), end.format(), current.format())
            // },
            eventClick (event, day, jsEvent, pos) {
                this.popUpShow = this.popUpShow ? false : true;
                let d = new Date(Date.parse(event.start));
                this.dayOfWeek = this.daysOfWeek[d.getDay()] + ", " + d.getDate() + " " + this.monthsOfYear[d.getMonth()];

            },
            dayClick (day, jsEvent) {
                // window.console.log('dayClick', 'день = ', day , jsEvent)
            },
            moreClick (day, events, jsEvent) {
                // window.console.log('moreCLick', day, events, jsEvent)
            },
            openPopUp() {
                this.popUpShow = true;
            },
            closePopUp() {
                this.popUpShow = false;
            }
        }
    }
</script>

<style lang="scss" scoped>

.popup {
    position : absolute;
    }
.schedule-wrapper {
    position : relative;
    }

.back-button {
    margin-right: 30px;
}

.month {
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    margin-left: 45%;
}

.month-name {
    margin-left: 10px;
    margin-right: 10px;
}

.attendance-header {
    display: flex;
    margin-top: 30px;
}

.show-border {
    border: 1px solid red;
}

.schedule {
    width: 100%;
    max-width: 1000px;;
    border-collapse:collapse;

    th {
        font-size: 1.3em;
        vertical-align: bottom;
    }

    td {
        border: 1px solid #cecfd5;
        width: 29%;
    }

    .week {
        border: none;
        font-size: 1.3em;
        width: 13%;
    }
}

.open-modal-attendance {
    color: #212529;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    &:hover {
        color: #212529;
        text-decoration: none;
    }

    .training-date {
        flex-grow: 2;
    }

    .training-stats {
        flex-grow: 3;
        position: relative;

    }

    .people-icon:before {
        content: "";
        display: block;
        position: absolute;
        left: 60%;
        width: 20px;
        height: 20px;
        background-image: url("../../../assets/2people.png");
        background-repeat: no-repeat;
        background-size: cover;
        }
}

.month-button {
    font-family: "Roboto", sans-serif;
    display: block;
    width: 37px;
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 37px;
    letter-spacing: normal;
    color: #000000;
    cursor: pointer;
    text-decoration: none;
    position: relative;
}

.month-back {
    height: 37px;
    &:before {
    content: "";
    display: block;
    position: absolute;
    top: 8.5px;
    left: 5.5px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 20px solid #3f88c5;
    border-bottom: 10px solid transparent;
    }
}

.month-forward {
    height: 37px;
    &:before {
    content: "";
    display: block;
    position: absolute;
    top: 8.5px;
    right: 5.5px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 20px solid #3f88c5;
    border-bottom: 10px solid transparent;
    }
}

td:not(.week):hover {
    background-color: rgba(250,128,64,0.5);
    cursor: pointer;
}

</style>