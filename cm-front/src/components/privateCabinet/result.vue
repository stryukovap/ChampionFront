<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-sm-3 col-sm-3 col-xs-6">
                    <img  class="img" alt="participant_1">
                    <h3 class="text-center">
                        Denis Yermolin
                    </h3>
                    <label class="col-lg-6 col-sm-6 col-sm-6 col-xs-6">
                        <input class="input" type="number" v-model="score1" value="0" min="0" max="1000" step="1">
                    </label>
                    <div class="col-lg-6 col-sm-6 col-sm-6 col-xs-6">
                        <p class="p_input text-center">Points</p>
                    </div>
                    <div class="radio" style="clear: both;" >
                        <label style="font-size: 3.5em">
                            <input type="radio" name="o5" v-model="winner" value="sportsman1">
                            <span class="cr"><i class="cr-icon fa fa-check">&#10004;</i></span>
                        </label>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-3 col-sm-3 col-xs-6">
                    <img  class="img"  alt="participant_1">
                    <h3 class="text-center">
                        Denis Yermolin
                    </h3>
                    <label class="col-lg-6 col-sm-6 col-sm-6 col-xs-6">
                        <input class="input" type="number" v-model="score2" value="0" min="0" max="1000" step="1">
                    </label>
                    <div class="col-lg-6 col-sm-6 col-sm-6 col-xs-6">
                        <p class="p_input text-center">Points</p>
                    </div>
                    <div class="radio" style="clear: both;" >
                        <label style="font-size: 3.5em">
                            <input type="radio" name="o5" v-model="winner" value="sportsman2">
                            <span class="cr"><i class="cr-icon fa fa-check">&#10004;</i></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-6 text-center">
                    <button type="button" class="btn btn-default btn-lg button">Save</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "result",
        data () {
            return {
                score1: null,
                score2: null,
                winner: null
            }
        }
    }

</script>

<style scoped lang="scss">

    .img{
        display: block;
        margin-left: auto;
        margin-right: auto
    }

    .div_result{
        display: block;
        margin-left: auto;
        margin-right: auto
    }

    .input{
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 70px;
    }

    .p_input{
        font-size: 16pt;
    }


    i {
        color: #000000;
        margin-left: 62px;
    }

    .radio {
        position: relative;
        display: block;
        margin-left: 80px;
        margin-top: 65px;
        height: 90px;

    }

    .radio label:after {
        content: '';
        display: table;
        clear: both;
    }


    .radio .cr {
        position: relative;
        display: inline-block;
        border: 1px solid #a9a9a9;
        border-radius: .25em;
        width: 1.3em;
        height: 1.3em;
        float: left;
        margin-right: .5em;
    }

    .radio .cr {
        border-radius: 0;
    }


    .radio .cr .cr-icon {
        position: absolute;
        font-size: .8em;
        line-height: 0;
        top: 50%;
        left: 20%;
    }

    .radio .cr .cr-icon {
        margin-left: 0.04em;
    }


    .radio label input[type="radio"] {
        display: none;
    }


    .radio label input[type="radio"] + .cr > .cr-icon {
        transform: scale(3) rotateZ(-20deg);
        opacity: 0;
        transition: all .3s ease-in;
    }


    .radio label input[type="radio"]:checked + .cr > .cr-icon {
        transform: scale(1) rotateZ(0deg);
        opacity: 1;
    }


    .radio label input[type="radio"]:disabled + .cr {
        opacity: .5;
    }

    .button{
        border-radius: 2px;
        width: 135px;
        margin:10px 135px;
    }
    
</style>