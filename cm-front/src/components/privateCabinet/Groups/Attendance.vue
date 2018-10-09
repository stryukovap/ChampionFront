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
.calendar {
    position : relative;
    }

.back-button {
    margin-right: 30px;
}

.attendance-header {
    display: flex;
    margin-top: 30px;
}

.comp-full-calendar {
    background-color: transparent;
}
</style>