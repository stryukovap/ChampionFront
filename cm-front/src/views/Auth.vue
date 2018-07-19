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
            <!--мне кажется понятнее будет вместо This field should be an email написать invalid email address-->
            <div class="invalid-feedback"
                 v-if="!$v.email.email">This field should be an email
            </div>
            <!--<pre>-->
            <!--{{$v.email}}-->
            <!--</pre>-->
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword"
                   class="form-control"
                   placeholder="Password"
                   required
                   v-model="password"
                   @input="$v.password.$touch()"
                   :class="{'is-invalid' :$v.password.$error}">
            <!--<div class="invalid-feedback"-->
            <!--v-if="!$v.password.minLength">Password field is required</div>-->
            <!--<pre>-->
            <!--{{$v.password}}-->
            <!--</pre>-->
            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me">Remember me
                </label>
            </div>
            <!--<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>-->
            <button class="btn btn-lg btn-success btn-block"
                    :disabled="$v.$invalid">
                Sign in
            </button>
            <router-link class="form-signin__link" to="/forgotpassword">Forgot password?</router-link>
            <router-link class="form-signin__link" to="/registration">Don`t have an account?</router-link>
        </form>
    </div>
</template>
<script>
import axios from "axios";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "Auth",
  data() {
    return {
      email: "alex1@alexandrz.com",
      password: "123456"
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
            this.$router.push("/");
          } else {
            this.$store.state.isLoggedIn = false;
            window.console.log(
              "store.state.isLoggedIn value - " + this.$store.state.isLoggedIn
            );
          }
        })
        .catch(function(error) {
          window.console.log(error);
        });
    }
    // loginAuth: function () {
    //     const status1 = JSON.parse(window.localStorage.getItem('lbUser'));
    //     if (status1 === null || status === undefined) {
    //         this.$router.push('/auth');
    //     } else {
    //         this.$router.push('/');
    //     }
    // }
  }
};
</script>
<style scoped lang="scss">
.form-signin {
  width: 100%;
  max-width: 330px;
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
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
