<template>
    <div class="auth">
        <form class="form-signin"
              @submit.prevent="loginUser">
            <h2 class="h2 mb-3 font-weight-normal">Please sign in</h2>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail"
                   class="form-control"
                   placeholder="Email address"
                   required
                   autofocus
                   v-model="email"
                   @input="$v.email.$touch()"
                   :class="{'is-invalid': $v.email.$error}">
            <div class="invalid-feedback"
                 v-if="!$v.email.required">Email field is required
            </div>
            <div class="invalid-feedback"
                 v-if="!$v.email.email">This field should be an email
            </div>
            <div class="cm-pass-wrapper">
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword"
                       class="form-control"
                       placeholder="Password"
                       required
                       v-model="password"
                       @input="$v.password.$touch()"
                       :class="{'is-invalid' :$v.password.$error}">
                <input type="checkbox" id='show-pass' @click='showPass'>
                <label for="show-pass" id='toggle-show-pass'>Show
                </label>
            </div>
            <div class="checkbox mb-3 remember">
                <label>
                    <input type="checkbox" value="remember-me">Remember me </label>
            </div>
            <button class="btn btn-lg btn-success btn-block"
                    :disabled="$v.$invalid">Sign in
            </button>
            <router-link class="form-signin__link" to="/forgotpassword">Forgot password?</router-link>
            <router-link class="form-signin__link" to="/registration">Don`t have an account?</router-link>
        </form>
        <modal-form
                v-bind:title="this.modal.title"
                v-bind:message="this.modal.message"
                v-if="modal.show"
                @clicked="closeModal"
                @click.prevent="closeModal">
        </modal-form>
    </div>
</template>
<script>
import axios from "axios";
import { required, email, minLength } from "vuelidate/lib/validators";
import ModalForm from "../views/modalOkError.vue";

export default {
  name: "Auth",
    components: {
        ModalForm
    },
  data() {
    return {
        modal: {
            show: false,
            title: "",
            message: ""
        },
      // email: "alex1@alexandrz.com",
      email: "",
      // password: "123456"
      password: ""
    };
  },
  validations: {
    email: {
      required: required,
      email: email
    },
    password: {
      minLength: minLength(6)
    }
  },
  // mounted: function () {
  //     this.loginAuth();
  // },
  methods: {
      closeModal: function () {
          this.modal.show = false;
      },
      showModalOnError: function (title, message, type) {
          this.modal.show = true;
          this.modal.title = title;
          this.modal.message = message;
          // if (type === 200) {
          //     this.$router.push("/");
          // } else {
              this.$router.push('/auth');
              this.email = "";
              this.password = ""
          // }
      },
    loginUser() {
      // const authUser = {};
      window.console.log("email", this.email);
      window.console.log("password", this.password);
      axios
        .post(this.$store.state.postLoginUrl, {
          email: this.email,
          password: this.password
        })
        .then(response => {
          window.console.log("response.status " + response.status);
            window.console.log(response.data);
          if (response.status === 200) {
            this.$store.state.authUser = response.data;
            window.console.log(
              "this.$store.state.authUser " + this.$store.state.authUser
            );
            this.$store.state.isLoggedIn = true;
            window.console.log(
              "store.state.isLoggedIn value - " + this.$store.state.isLoggedIn
            );
            window.localStorage.setItem(
              "lbUser",
              JSON.stringify(this.$store.state.authUser)
            );
              // this.showModalOnError(response.status, response.data.message, 1)
              this.$router.push("/");
          }// else {
            //   this.$store.state.isLoggedIn = false;
            //   window.console.log(
            //     "store.state.isLoggedIn value - " + this.$store.state.isLoggedIn
            //   );
            // }
        })
          .catch(error => {
          window.console.log(error);
              if (error.response) {
                  window.console.log(error.response.data);
                  window.console.log(error.response);
                  window.console.log(error.response.data.message);
                  window.console.log(error.response.status);
                  window.console.log(error.response.headers);
                  this.showModalOnError(error.response.status, error.response.data.error, 0);
              }
        });
    },
    // loginAuth: function () {
    //     const status1 = JSON.parse(window.localStorage.getItem('lbUser'));
    //     if (status1 === null || status === undefined) {
    //         this.$router.push('/auth');
    //     } else {
    //         this.$router.push('/');
    //     }
    // }
      showPass: function() {
          let pass = document.getElementById("inputPassword");
          let toggleShowPass = document.getElementById('toggle-show-pass');
          if (pass.type === "password") {
              pass.type = "text";
              toggleShowPass.textContent = 'Hide';
          } else {
              pass.type = "password";
              toggleShowPass.textContent = 'Show';
          }
      }
  }
};
</script>
<style scoped lang="scss">
.form-signin {
  width: 330px;
  padding: 15px;
  margin: auto;
  text-align: center;
  margin-top: 50px;
  &__link {
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
  margin: 0;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.show-password {
    text-align: center;
}

.show-password input {
    margin-right: 5px;
}

.cm-pass-wrapper {
    margin-top: 10px;
    position: relative;
}

#show-pass {
    display: none;
}

#toggle-show-pass {
    z-index: 10;
    opacity: 0.5;
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 12px;
}

@media (max-width: 980px) {
    .form-signin {
        width: 100%;
        h2 {
            font-size: 2rem !important;
        }
        .form-control {
            margin-top: 30px;
            font-size: 2rem;
        }
        &__link {
            font-size: 1rem;
        }
    }
    #toggle-show-pass,
    .remember,
    .btn
    {
        font-size: 1.5rem;
    }
    .btn {
        margin: 0 auto;
        width: 350px;
    }
}
</style>
