<template>
    <!--Это во vue принято писать классы корневых тегов компонентов,
    наименования компонентов и наименования файлов компонентов
     без разделений как class="forgotpassword"? Если нет, то, мне кажется,
    лучше разделять слова между собой. По большей степени это
    касается названий файлов. Потому что такой способ записи трудно
    читаем, и я раньше не видела подобной практики-->
    <div class="forgotpassword">
        <div class="col-12 col-md-6 col-lg-4 col-xl-4 wrapper">
            <form autocomplete="off" @submit.prevent="">
                <h1 class="cm-form__title">Restore password</h1>
                <div class="cm-form__wrapper">
                    <input class="form-control" type="email" name="forgot_password" id="forgot_password"
                           placeholder="Email"
                           v-model="email"
                           @input="$v.email.$touch()"
                           :class="{'is-invalid': $v.email.$error}">
                    <div class="invalid-feedback"
                         v-if="!$v.email.required">Email field is required
                    </div>
                    <div class="invalid-feedback"
                         v-if="!$v.email.email">This field should be an email
                    </div>
                </div>
                <div class="cm-form__wrapper text-center">
                    <button class="btn btn-primary btn-user"
                            :disabled="$v.$invalid"
                            @click="sendDataOnServer">sendDataOnServer
                    </button>
                    <!--<button class="btn btn-primary btn-user"-->
                    <!--@click="goRestore">goRestore-->
                    <!--</button>-->
                    <!--<router-link class="btn btn-primary btn-user"-->
                    <!--tag="button"-->
                    <!--:disabled="$v.$invalid"-->
                    <!--@click="sendDataOnServer"-->
                    <!--to="/restorepassword">Restore-->
                    <!--</router-link>-->
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Forgotpass_step1",
  data() {
    return {
      email: "stryukovap@gmail.com",
      message: ""
    };
  },
  validations: {
    email: {
      required: required,
      email: email
    }
  },
  methods: {
    goRestore: function() {
      this.$router.push("/restorepassword");
    },
    goFalse: function() {
      this.$router.push("/restorepasswordfalse");
    },
    sendDataOnServer: function() {
      window.console.log(this.email);
      axios
        .post(this.$store.state.postResetEmail, {
          email: this.email
        })
        .then(function(response) {
          window.console.log(response);
        }, this.goRestore())
        .catch(function(error) {
          window.console.log(error);
        });
    }
  }
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
