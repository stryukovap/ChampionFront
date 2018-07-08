<template>
    <div class="cm-form__content cm-form__content--one">
        <h1>Registration</h1>
        <div class="row cm-form__wrapper text-center">
            <div class="col">
                <input class="form-control" type="radio" name="as-role" id="as-role-f"
                v-model="userRole"
                value="1">
                <label for="as-role-f">As federation</label>
            </div>
            <div class="col">
                <input class="form-control" type="radio" name="as-role" id="as-role-s" checked
                v-model="userRole"
                value="2">
                <label for="as-role-s">As sportsman</label>
            </div>
            <span>value: {{userRole}}</span>
        </div>
        <div class="cm-form__wrapper">
            <input class="form-control" type="email" name="user-email" id="user-email" required autofocus
                   autocomplete="off" placeholder="E-mail">
        </div>
        <div class="cm-form__wrapper">
            <input class="form-control" type="password" name="user-pass" id="user-pass" required autocomplete="off"
                   placeholder="Password">
        </div>
        <div class="cm-form__wrapper">
            <input class="form-control" type="password" name="user-confpass" id="user-confpass" required
                   autocomplete="off" placeholder="Confirm password">
        </div>
        <div class="cm-form__wrapper text-center">
            <button class="btn btn-primary" id="next-step">Next</button>
        </div>
        <div class="cm-form__wrapper text-center">
            <router-link class="cm_form__link" to="/auth">Already registered?</router-link>
        </div>
    </div>
</template>
<script>
export default {
  name: "registration_user",
  data() {
    return {
      userRole: 0,
      userEmail: "",
      userPassword: ""
    };
  }
};
</script>
<style scoped lang="scss">
.cm-form__wrapper {
  margin-top: 10px;
  text-align: left;
}
</style>
