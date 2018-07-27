<template>
    <div class="card card-item">
        <!--<img class="card-img-top"-->
             <!--v-bind:src="'img/' + Image"-->
             <!--alt="Card image cap">-->
        <div class="card-body">
            <!--<a href="#" class="btn btn-primary">{{ Name }}</a>-->
            <router-link tag="a" class="btn btn-success" v-bind:to="'/' + link_to">{{Name}}</router-link>
        </div>
    </div>
</template>
<!--<style scoped lang="scss">-->
<style lang="scss">
.card {
  margin: 25px 0;
  text-align: center;
}
</style>
<script>
export default {
  name: "card",
  props: ["Name", "Image", "link_to"]
};
</script>
