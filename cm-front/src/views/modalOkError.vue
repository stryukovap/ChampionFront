<template>
    <div class="popup">
        <div class="popup__inner">
            <h5>{{title}}</h5>
            <p>{{message}}</p>
            <button class="btn btn-success" v-on="$listeners">Ok</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "modalOkError",
        props: ["title", "message"]
    };
</script>

<style scoped lang="scss">
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
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            max-width: 300px;
            max-height: 300px;
            width: 80%;
            height: 80%;
            background-color: #fff;
            transition: 0.64s ease-in-out;
            overflow-y: auto;
        }
    }
</style>
