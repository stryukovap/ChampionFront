<template>
        <div class="card__content">
            <img src="../assets/karate-grey-silhouette.svg" alt="picture" class="card__img" width="224" height="154">
            <h3 class="card__desc">{{Name}}</h3>
            <router-link tag="div" class="card__mask" v-bind:to="'/' + link_to">
                <div class="card__top"></div>
                <h3 class="card__title">{{Name}}</h3>
                <p class="card__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere vestibulum posuere pulvinar blandit...</p>
            </router-link>
        </div>
</template>
<style scoped lang="scss">
.card{
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
        font-size: 20px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #ffffff;
    }
    &__text{
        font-size: 11px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.05;
        letter-spacing: normal;
        color: #ffffff;
        padding: 10px;
    }
    &__content{
        /*margin-top: 30px;*/
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
        background-color: #ffffff;
        /*border: solid 1px #e9e9e9;*/
        width: 224px;
        text-align: center;
        position: relative;
        -webkit-box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
        -moz-box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
        box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
        &:hover{
            cursor:pointer;
        }
        &:hover .card__mask{
            display: flex;
        }
        /*&:hover{*/
            /*border: none;*/
        /*}*/
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
}
</style>
<script>
export default {
  name: "card",
  props: ["Name", "Image", "link_to"]
};
</script>
