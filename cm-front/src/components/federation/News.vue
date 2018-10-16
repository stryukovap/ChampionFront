<template>
    <div>
        <div class="news__content"
             v-for='(post, index) in newsList'
             v-if='index < 2 || isAllPostsShown'
             :key='post.index'>
            <router-link tag="div" v-bind:to="'/about'" class="text-secondary">
                <img src="../../assets/345x345_26.jpg"  class="news__img">
                <div>
                    <h4 class="news__desc">{{ post.name }}</h4>
                </div>
            </router-link>
            <router-link tag="a" v-bind:to="'/about'" class="news__mask">
                <div class="news__top"></div>
                <h3 class="news__title">{{post.name}}</h3>
                <p class="news__date">{{ post.date }}</p>
                <p class="news__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere vestibulum posuere
                    pulvinar blandit...
                </p>
            </router-link>
        </div>
        <div class="news__wrapper">
            <a class="news__more" v-on:click.prevent="togleNewsState" href="#">{{ linkText }}...</a>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        name: "news",
        props: ["newsList"],
        data: function() {
            return {
                isAllPostsShown: false
            };
        },
        methods: {
            togleNewsState() {
                this.isAllPostsShown = !this.isAllPostsShown;
            }
        },
        computed: {
            linkText: function() {
                return this.isAllPostsShown ? "Less" : "More";
            }
        }
    };
</script>
<style scoped lang="scss">

    .news {
        &__wrapper{
            margin-top: 34px;
            text-align: right;
        }
        &__more{
            font-family: "Roboto", sans-serif;
            font-size: 16px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #3f88c5;
        }
        &__top{
            height: 5px;
            width: 100%;
            -webkit-backdrop-filter: blur(4px);
            backdrop-filter: blur(4px);
            background-color: #f77f00;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            margin-bottom: auto;
        }
        &__text,&__title,&__desc{
            margin: 0;
            font-family: "Roboto", sans-serif;
        }
        &__desc{
            font-size: 20px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #262626;
            margin-top: 12.4px;
            margin-bottom: 12.4px;
            padding-left: 19px;
            text-align: left;
        }
        &__title{
            font-size: 20px;
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #ffffff;
        }
        &__text{
            font-size: 12px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.05;
            letter-spacing: normal;
            color: #ffffff;
            padding: 10px;
        }
        &__date{
            color: #ffffff;
        }
        &__content{
            margin-top: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 5px;
            overflow: hidden;
            background-color: #ffffff;
            width: 213px;
            height: 100%;
            text-align: center;
            position: relative;
            -webkit-box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
            -moz-box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
            box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
            &:hover{
                cursor:pointer;
            }
            &:hover .news__mask{
                display: flex;
            }
            &:hover{
                border: none;
            }
        }
        &__mask{
            text-decoration: none;
            /*display: flex;*/
            display: none;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            position: absolute;
            top: 0;
            left:0;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            -webkit-backdrop-filter: blur(6px);
            backdrop-filter: blur(6px);
            background-image: linear-gradient(to top,#000000 , rgba(255, 255, 255, 0.42));
            -webkit-box-shadow: 5px 5px 10px 1px rgba(0,0,0,0.7);
            -moz-box-shadow: 5px 5px 10px 1px rgba(0,0,0,0.7);
            box-shadow: 5px 5px 10px 1px rgba(0,0,0,0.7);
        }
        &__img{
            width: 100%;
            height: 200px;
            /*border-radius: 5px;*/
        }
    }

    @media (max-width: 980px) {
        .news {
            &__content {
                flex-direction: row;
                width: 100%;
            }
            &__img {
                width: 200px;
                height: 100%;
            }
            &__desc {
                font-size: 3em;
            }
            &__title,
            &__date,
            &__text {
                font-size: 2em;
            }
            &__more {
                width: 100%;
                font-size: 3em;
            }
        }
        .text-secondary {
            display: flex;
            flex-direction: row;
        }
    }
</style>
