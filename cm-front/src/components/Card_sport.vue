<template>
    <div class="card_sport">
        <div class="card card-item">
            <img class="card-img-top"
                 v-bind:src="'cm-front/src/assets/' + sportImage"
                 alt="Card image cap">
            <div class="card-body">
                <a href="#" class="btn btn-primary">{{ sportName }}</a>
            </div>
        </div>
    </div>
</template>
<!--<style scoped lang="scss">-->
<style lang="scss">
.card {
  margin: 50px 0;
}
</style>
<script>
export default {
  name: "card_sport",
  props: ["sportName", "sportImage"]
};
</script>
