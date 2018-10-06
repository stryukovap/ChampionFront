<template>
    <div>
        <div class="col-12 col-md-6 col-lg-4 col-xl-4 wrapper">
            <h2 class="cm-form__title">{{ message}}</h2>
            <span class="cm-form__desc">Check mail</span>
            <button class="btn btn-danger"
                    @click="goPrevios">go previous page
            </button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      message: "We can't find user with that e-mail address"
    };
  },

  methods: {
    goPrevios: function() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>
<style scoped lang="scss">
.cm-form__desc {
  display: inline-block;
  margin: 50px;
}

.wrapper {
  margin: 100px auto;
    width: 300px;
    padding: 15px;
  border: 2px solid #000;
  border-radius: 5px;
}

.cm-form__title {
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}
</style>
