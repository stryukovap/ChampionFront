<template>
    <div>
        <groups
            v-if='GroupsShow'
            v-on:open="openGroup"
        ></groups>
        <attendance
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
        };
    },
    methods: {
        openGroup() {
        this.GroupsShow = false;
        this.AttendanceShow = true
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