<template>
    <div class="forgotpassword">
        <div class="col-12 col-md-6 col-lg-4 col-xl-4 wrapper">
            <form action="#">
                <h1 class="cm-form__title">Restore password</h1>
                <div class="cm-form__wrapper">
                    <input class="form-control" type="email" name="forgot_password" id="forgot_password"
                           placeholder="Email" required>
                </div>
                <div class="cm-form__wrapper text-center">
                    <router-link class="btn btn-primary btn-user" to="/restorepassword">Restore</router-link>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
  name: "Forgotpass_step1"
};
</script>
<style scoped lang="scss">
.wrapper {
  margin: 100px auto;
  border: 2px solid #000;
  border-radius: 5px;
}

.btn-user {
  margin-bottom: 25px;
}

.cm-form__wrapper {
  margin-top: 50px;
  text-align: left;
}

.cm-form__title {
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}
</style>
