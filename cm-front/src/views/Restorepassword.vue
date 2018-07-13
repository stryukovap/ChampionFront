<template>
    <div class="restorepassword">
        <div class="col-12 col-md-6 col-lg-4 col-xl-4 wrapper">
            <h1 class="cm-form__title">{{ message}}</h1>
            <span class="cm-form__desc">Check your mail to restore account access.</span>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      message: "We have e-mailed your password"
      // email: "stryukovap@gmail.com"
    };
  }
  // mounted: {
  //     sendDataOnServer: function () {
  //         axios
  //             .post("https://champion-api.herokuapp.com/api/password/email", {
  //                 email: this.email,
  //             })
  //             .then(function (response) {
  //                 window.console.log(response);
  //                 this.message = response.data.message;
  //                 window.console.log("test");
  //             })
  //             .catch(function (error) {
  //                 window.console.log(error);
  //             });
  //     }
  // },
};
</script>
<style scoped lang="scss">
.cm-form__desc {
  display: inline-block;
  margin: 50px;
}

.wrapper {
  margin: 100px auto;
  border: 2px solid #000;
  border-radius: 5px;
}

.cm-form__title {
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}
</style>
