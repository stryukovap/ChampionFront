<template>
    <div>
        <groups
            v-bind:cards = 'cards'
            v-if='GroupsShow'
            v-on:open="openGroup"
        ></groups>
        <attendance
                v-bind:card = 'cardPassed'
                v-if='AttendanceShow'
            v-on:close='closeAttendance'
        ></attendance>

    </div>
</template>

<script>
import Groups from './Groups/Groups';
import Attendance from './Groups/Attendance';

export default {
    name: "coach-groups",
    components: {
        Attendance,
        Groups,
    },
    data: function () {
        return {
            GroupsShow: true,
            AttendanceShow: false,
            classPassed: null,
            cards : [
                {
                    title: 'Здоровье',
                    members: '8',
                    classes: {
                            Mon: '18:00',
                            Wed: '18:00',
                            Fri: '18:00'
                            }
                },
                {
                    title: 'Veterans',
                    members: '5',
                    classes: {
                        Tue: '19:00',
                        Thu: '19:00'
                    }
                }
            ]
        };
    },
    methods: {
        openGroup(index) {
        this.GroupsShow = false;
        this.AttendanceShow = true;
        // this.cardPassed = this.cards[index];
        this.cardPassed = this.cards[0];
        },
        closeAttendance() {
            this.GroupsShow = true;
            this.AttendanceShow = false;
        }
    }

}
</script>

<style lang="scss">

</style>