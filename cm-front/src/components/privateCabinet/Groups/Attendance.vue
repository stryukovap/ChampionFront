<template>
    <div>
        <div class="attendance-header">
            <button
                class="back-button info__btn btn btn-primary"
                @click="$emit('close')"
            >Back</button>
            <h2>{{card["title"]}}</h2>
        </div>
        <div>
            <calendar-view
                    v-bind:events='events'
                    v-bind:enableDragDrop='enableDragDrop'
                    v-bind:showEventTimes='showEventTimes'
                    v-bind:startingDayOfWeek='startingDayOfWeek'
                    v-bind:locale='locale'
                    @click-event='clickEvent'
                    :show-date="showDate"
                    class="theme-default groups-calendar">
                <calendar-view-header
                        slot="header"
                        slot-scope="t"
                        :header-props="t.headerProps"
                        @input="setShowDate" />
            </calendar-view>
                <attendance-pop-up
                    class='attendance-popup'
                    v-if='popUpShow'
                    v-bind:title='classTitle'
                    v-bind:time='classTime'
                    v-on:close='closePopUp'
                ></attendance-pop-up>
        </div>

    </div>
</template>

<script>
    import AttendancePopUp from './AttendancePopUp';
    import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
    require("vue-simple-calendar/static/css/default.css");
    require("vue-simple-calendar/static/css/holidays-us.css");

    export default {
        name: "attendance",
        props: ['card'],
        components: {
            AttendancePopUp,
            // fullCalendar
            CalendarView,
            CalendarViewHeader,
        },
        data: function () {
            return {
                classTitle: '',
                classTime: '',
                popUpShow: true,
                showDate: new Date(),
                enableDragDrop: true,
                showEventTimes: true,
                startingDayOfWeek: 1,
                locale: 'en',
                events: [
                    {
                        startDate: '2018-10-15 18',
                        title: 'ololo',
                        id: 1,
                        classes: 'ololo',
                        url: '#'
                    },{
                        startDate: '2018-10-18 18',
                        title: 'ololo',
                        id: 2,
                        classes: 'ololo'
                    },
                    {
                        startDate: '2018-10-14 13',
                        title: 'kokoko',
                        id: 3,
                        classes: 'ololo'
                    },
                    {
                        startDate: '2018-10-14 20',
                        title: 'atata',
                        id: 4,
                        classes: 'ololo'
                    },
                    {
                        startDate: '2018-10-14 21',
                        title: 'papap',
                        id: 5,
                        classes: 'ololo'
                    }
                ]


            }
        },
        methods: {
            setShowDate(d) {
                this.showDate = d;
            },
            closePopUp() {
                this.popUpShow = false;
            },
            clickEvent (event) {
                this.popUpShow = true;
                this.classTitle = event.title;
                this.classTime = event.startDate.getHours() + ':00';
                window.console.log(event)
            }
        }
    }
</script>


<style lang="scss">

.attendance-popup {
    position : absolute;
    top: 85px;
    right: 0;
    }
.groups-calendar {
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

.cv-day {
    overflow-y: visible !important;
}

.cv-weeks {
    height: 470px !important;
}
</style>