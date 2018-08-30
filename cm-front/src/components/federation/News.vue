<template>
    <div>
        <h2 class="h2-1 ml-5 news__desc">News</h2>
        <div class="row">
            <div class="col-md-6 col-lg-12 news__content"
                 v-for='(post, index) in newsList'
                 v-if='index < 2 || isAllPostsShown'
                 :key='post.index'>
                <a v-bind:href="post.link" class="text-secondary">
                    <img src="../../assets/345x345_26.jpg"  class="news__img">
                    <!--v-bind:src="post.avatar"-->
                    <!--alt="Card image cap">-->
                    <div>
                        <h4 class="text-center news__desk">{{ post.name }}</h4>
                        <p class="text-center">{{ post.date }}</p>
                    </div>
                </a>
                <!--<router-link tag="div" class="news__mask" v-bind:to="'/' + link_to">-->
                <router-link tag="div" class="news__mask" v-bind:to="'/'">
                    <div class="news__top"></div>
                    <h3 class="news__title">{{post.name}}</h3>
                    <p class="news__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere vestibulum posuere pulvinar blandit...</p>
                </router-link>
            </div>
        </div>
        <div class="text-right">
            <a v-on:click.prevent="togleNewsState" href="#">{{ linkText }}...</a>
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
            padding: 6.2px 0 13.9px 0;
        }
        &__title{
            font-size: 25px;
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
        &__content{
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 5px;
            background-color: #ffffff;
            border: solid 1px #e9e9e9;
            width: 100%;
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
            width: 285px;
            height: 200px;
            border-radius: 5px;
        }
    }
</style>
