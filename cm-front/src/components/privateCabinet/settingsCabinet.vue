<template>
    <section class="info-form">
        <div class="container">
            <div class="row justify-content-center">
                <div class="info col-6">
                    <div class="info__str row">
                        <div class="info__status">Status</div>
                        <div class="info__active">{{status}}</div>
                    </div>
                    <div class="info__str row">
                        <div class="info__subsc">Subscription</div>
                        <div class="info__wrap-text">
                            <div class="info__active">Expire in <span>{{subscription}}</span> days</div>
                            <button class="info__btn btn btn-success disabled">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form row justify-content-center">
                <div class="col-5 form__wrap">
                    <form @submit.prevent="">
                        <h3 class="form__header">Update password</h3>
                        <div class="form__fields">
                            <div class="form__field">
                                <input type="password"
                                       autocomplete="off"
                                       autofocus
                                       name="pass"
                                       placeholder="Old password"
                                       class="form-control"
                                       v-model="user.oldPassword"
                                       @input="$v.user.oldPassword.$touch()"
                                       @blur="$v.user.oldPassword.$touch()"
                                       :class="{'is-invalid' :$v.user.oldPassword.$error}">
                                <div class="invalid-feedback"
                                     v-if="!$v.user.oldPassword.required">Password field is required
                                </div>
                            </div>
                            <div class="form__field">
                                <input type="password"
                                       autocomplete="off"
                                       name="newPass"
                                       placeholder="New password"
                                       class="form-control"
                                       v-model="user.newPassword"
                                       @input="$v.user.newPassword.$touch()"
                                       @blur="$v.user.newPassword.$touch()"
                                       :class="{'is-invalid' :$v.user.newPassword.$error}">
                                <div class="invalid-feedback"
                                     v-if="!$v.user.newPassword.required">Password field is required
                                </div>
                                <div class="invalid-feedback" v-if="!$v.user.newPassword.minLength">
                                    Min length of password is {{ $v.user.newPassword.$params.minLength.min }}. Now it
                                    is {{ user.newPassword.length }}.
                                </div>
                                <div class="invalid-feedback" v-if="!$v.user.newPassword.maxLength">
                                    Max length of password is {{ $v.user.newPassword.$params.maxLength.max }}.
                                </div>
                            </div>
                            <div class="form__field">
                                <input type="password"
                                       autocomplete="off"
                                       name="confirmPass"
                                       placeholder="Confirm new password"
                                       class="form-control"
                                       v-model="user.confirmNewPassword"
                                       @input="$v.user.confirmNewPassword.$touch()"
                                       @blur="$v.user.confirmNewPassword.$touch()"
                                       :class="{'is-invalid' :$v.user.confirmNewPassword.$error}">
                                <div class="invalid-feedback"
                                     v-if="!$v.user.confirmNewPassword.required">Password field is required
                                </div>
                                <div class="invalid-feedback" v-if="!$v.user.confirmNewPassword.sameAs">
                                    Passwords should match
                                </div>
                            </div>
                            <div class="form__btn-wrap">
                                <!--<input type="submit"-->
                                <!--value="Update"-->
                                <!--class="form__btn btn btn-primary">-->
                                <button class="form__btn btn btn-success"
                                        :disabled="$v.user.confirmNewPassword.$error || $v.user.newPassword.$error"
                                        @click="updatePassword">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!--Successfully-->
        <modal-form
                v-bind:title="this.modal.title"
                v-bind:message="this.modal.message"
                v-if="modal.show"
                @clicked="closeModal"
                @click.prevent="closeModal">
        </modal-form>
    </section>
</template>

<script>
import axios from "axios";
import {
    required,
    minLength,
    maxLength,
    sameAs
} from "vuelidate/lib/validators";
import ModalForm from "./../../views/modalOkError.vue";

export default {
    components: {
        ModalForm
    },
  name: "settings",
  data: function() {
    return {
        modal: {
            show: false,
            title: "",
            message: ""
        },
      status: "",
      subscription: "",
        user: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        }
    };
  },
  validations: {
      user: {
          oldPassword: {
              required: required
          },
          newPassword: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(16)
          },
          confirmNewPassword: {
        required,
              sameAs: sameAs("newPassword")
          }
    }
  },
  methods: {
    updatePassword: function() {
      var HTTP = axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.authUser.auth_token
        }
      });
      HTTP.post("https://champion-api.herokuapp.com/api/password/change", {
          old_password: this.user.oldPassword,
          password: this.user.newPassword,
          password_confirmation: this.user.confirmNewPassword
      })
        .then(response => {
          window.console.log(response);
          localStorage.removeItem("lbUser");
          this.$store.state.isLoggedIn = false;
          window.console.log(
            "store.state.isLoggedIn value - " + this.$store.state.isLoggedIn
          );
            if (response.status) {
                this.showModalOnError(response.status, response.data.message, 'info');
            }
            // this.$router.push("/auth");
        })
          .catch(error => {
              // window.console.log(error);
              if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.data.message);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                  this.showModalOnError(
                      error.response.status,
                      error.response.data.message,
                      1
                  );
              }
        });
    },
      closeModal: function () {
          this.modal.show = false;
      },
      showModalOnError: function (title, message, type) {
          this.modal.show = true;
          this.modal.title = title;
          this.modal.message = message;
          if (type === 'info') {
          this.$router.push("/auth");
          }
          else {
              this.modal.show = true;
              this.modal.title = title;
              this.modal.message = message;
              this.user.oldPassword = "";
              this.user.newPassword = "";
              this.user.confirmNewPassword = "";
          }
      }
  },
  mounted() {
    // axios
    //   .get("https://jsonplaceholder.typicode.com/todos/1")
    //   .then(response => {
    //     this.status = response.data.completed;
    //     this.subscription = response.data.id;
    //   })
    //   .catch(error => window.console.log(error));
  }
};
</script>

<style scoped lang="scss">
.info {
  &__str {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__wrap-text {
    display: flex;
    align-items: center;
  }

  &__btn {
    margin-left: 20px;
  }
}

.info-form {
  padding-top: 50px;
}

.form {
  margin-top: 50px;

  &__header {
    text-align: center;
    margin-bottom: 25px;
  }

  &__field {
    width: 270px;
    margin: 0 auto 10px auto;
  }

  &__input {
    width: 100%;
  }

  &__btn-wrap {
    display: flex;
    justify-content: center;
  }
}
</style>
