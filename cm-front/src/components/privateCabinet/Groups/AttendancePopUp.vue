<template>
    <div class='attendance-wrapper'>
        <button
                class='btn btn-success btn-save'
                type='submit'
                @click="$emit('close')"
        >
        Save
        </button>
        <button
            class='close'
            @click="$emit('close')"
        >
            ✖
        </button>
        <h2 class='training--date'>Пн 19:00</h2>
        <div class='training-status'>
            <h4>Status</h4>
            <input class='status--input' type='radio' name='training-status' id='training-status1'>
            <label for='training-status1'>As planned</label>
            <input class='status--input' type='radio' name='training-status' id='training-status2'>
            <label for = 'training-status2'>Canceled</label>
        </div>
        <div class='training-attendance'>
            <h4>Attendees</h4>
            <ul>
                <li>
                    <img src = '../../../assets/345x345_26.jpg'
                         alt = 'user-avatar'
                         class = 'user-avatar__little'
                         width='44'
                         height='44'>
                    <p class='user-fullname'>User Fullname</p>
                    <input type = 'checkbox' class='user-attendance'>
                </li>
                <li>
                    <img src = '../../../assets/345x345_26.jpg'
                         alt = 'user-avatar'
                         class = 'user-avatar__little'
                         width='44'
                         height='44'>
                    <p class='user-fullname'>User Fullname</p>
                    <input type = 'checkbox' class='user-attendance'>
                </li>
                <li>
                    <img src = '../../../assets/345x345_26.jpg'
                         alt = 'user-avatar'
                         class = 'user-avatar__little'
                         width='44'
                         height='44'>
                    <p class='user-fullname'>User Fullname</p>
                    <input type = 'checkbox' class='user-attendance'>
                </li>
                <li>
                    <img src = '../../../assets/345x345_26.jpg'
                         alt = 'user-avatar'
                         class = 'user-avatar__little'
                         width='44'
                         height='44'>
                    <p class='user-fullname'>User Fullname</p>
                    <input type = 'checkbox' class='user-attendance'>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AttendancePopUp'
}
</script>

<style scoped>
.attendance-wrapper {
    display : flex;
    flex-direction : column;
    align-items: stretch;
    justify-content : flex-start;
    /*position : absolute;*/
    height : 100%;
    width : 500px;
    padding : 20px;
    border : 1px solid #28a745;
    border-radius: 15px 0 0 15px;
    background : #fff;
    right : 0;
    }

.btn-save {
    width : 100px;
    }

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

.training--date {
    margin : 20px;
    text-align: left;
    color : #28a745;
    }

h4{
    text-align : left;
    }

.status--input + label {
    width : 40%;
    padding-left: 10px;
    text-align : left;
    }

.training-attendance li {
    position : relative;
    }

.training-attendance ul{
    padding-left : 0;
    list-style: none;
    }

.user-avatar__little {
    width : 44px;
    height : 44px;
    border-radius: 50%;
    margin : 5px;
    }

.user-fullname {
    display : inline-block;
    width : 340px;
    padding-left : 5px;
    text-align: left;
    }

.user-attendance {
    margin-right : 10px;
    }

.user-attendance:checked:after {
    content: 'Был';
    position : absolute;
    top : 20%;
    right : 0;
    }
</style>