<template>
    <section>
        <div class="container">
            <select class="form-control" name="federation" id="federation"
                    v-model="federationId" @change="updateNewsList()">
                <option v-for="federation in federations"
                        v-bind:value="federation.id"

                        :key="federation.id">{{federation.name}}
                </option>
            </select>
            <div class="row">
                <label>
                    <input type="text" class="text-p text-center" placeholder="Title" v-model="news.title">
                </label>
                <label>
                    <textarea name="text" class="input text-center" placeholder="Text" v-model="news.text"></textarea>
                </label>
                <label>
                    <input type="date" name="calendar" class="data text-center" v-model="news.date">
                </label>
                <label>
                    <input type="submit" value="Submit" @click="createNews" class="button_submit">
                </label>
            </div>
        </div>
        <h2 class="h2-1 ml-5">News</h2>
        <div class="row">
            <div class="col-md-6 col-lg-12"
                 v-for='post in newsList'>
                <div class="thumbnail">
                    <div class="caption">
                        <h4 class="text-center">{{ post.title }}</h4>
                        <p class="text-center">{{ post.date }}</p>
                        <p>{{ post.text }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
    import axios from "axios";
    import * as firebase from "firebase";


    export default {
        name: "news-cabinet",
        props: ["newsList"],
        data() {
            return {
                isAllPostsShown: true,
                federations: [],
                federationId: '',
                newsList: {},
                newsObj: {},
                news: {
                    title: "",
                    text: "",
                    date:""
                }
            };
        },
        beforeMount() {
            // this.federationId = this.$store.state.authUser.federation_users[0].federation_id;
        },
        mounted() {
            axios
                .get('https://champion-api.herokuapp.com/api/federations')
                .then(response => {
                    this.federations = response.data;
                    console.log(response.data);
                })
                .catch(error => console.log(error));
            // this.updateNewsList();
        },
        methods: {
            togleNewsState() {
                this.isAllPostsShown = !this.isAllPostsShown;
            },
            async createNews() {
                try {
                    await firebase
                        .database()
                        .ref('news')
                        .child(this.federationId)
                        .push(this.news)
                        .then(console.log("success"));

                } catch (error) {
                    throw error;
                }
                this.updateNewsList();
                this.news = {
                    title: "",
                    text: "",
                    date:""
                }
            },

            async updateNewsList() {
                try {
                    this.newsObj  = await firebase
                        .database()
                        .ref('news')
                        .child(this.federationId)
                        .once("value");
                } catch (error) {
                    throw error;
                }
                this.newsList = this.newsObj.val();
            }
        }
    };
</script>

<style scoped lang="scss">

    .text-p{
        line-height: 1.5;
        margin: 15px 0 0 430px;
        border: 1px solid #000000;
        color: #666666;
        font-size: 24px;
        font-weight: bold;
    }

    .button_submit{
        display: inline;
        margin-top: 17px;
        width: 160px;
        height: 38px;
        color: #666666;
        font-size: 24px;
    }

    .input{
        width: 600px;
        height: 145px;
        border: 1px solid #000000;
        color: #666666;
        font-size: 24px;
        font-weight: bold;
        line-height: 1.5;
        margin: 15px 266px;
    }

    .data{
        display: inline;
        margin: 15px 245px;
        border: 1px solid #000000;
        color: #666666;
        font-size: 24px;
    }

</style>
