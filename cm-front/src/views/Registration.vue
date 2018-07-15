<template>
    <div class="registration">
        <div class="container">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6 wrapper">
                <!--<form class="cm-form" autocomplete="off" @submit.prevent="sendDataOnServer">-->
                <form class="cm-form" autocomplete="off" @submit.prevent="">
                    <tabs>
                        <tab name="First step">
                            <div class="cm-form__content cm-form__content--one">
                                <h1>Registration</h1>
                                <div class="row cm-form__wrapper text-center">
                                    <div class="col">
                                        <input class="form-control" type="radio" name="as-role" id="as-role-f"
                                               v-model="userSportsman"
                                               value="false">
                                        <label for="as-role-f">As federation</label>
                                    </div>
                                    <div class="col">
                                        <input class="form-control" type="radio" name="as-role" id="as-role-s" checked
                                               v-model="userSportsman"
                                               value="true">
                                        <label for="as-role-s">As sportsman</label>
                                    </div>
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" type="email" name="user-email" id="user-email"
                                           autofocus
                                           autocomplete="off"
                                           placeholder="E-mail"
                                           v-model="user.email"
                                           @input="$v.user.email.$touch()"
                                           :class="{'is-invalid': $v.user.email.$error}">
                                    <div class="invalid-feedback"
                                         v-if="!$v.user.email.required">Email field is required
                                    </div>
                                    <div class="invalid-feedback"
                                         v-if="!$v.user.email.email">This field should be an email
                                    </div>
                                    <!--<div class="invalid-feedback"-->
                                         <!--v-if="!$v.user.email.uniqemail">This email is already exist-->
                                    <!--</div>-->
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" type="password" name="user-pass" id="user-pass"
                                           autocomplete="off"
                                           placeholder="Password"
                                           v-model="user.password"
                                           @input="$v.user.password.$touch()"
                                           :class="{'is-invalid' :$v.user.password.$error}">
                                    <div class="invalid-feedback" v-if="!$v.user.password.minLength">
                                        Min length of password is {{ $v.user.password.$params.minLength.min }}. Now it
                                        is {{ user.password.length }}.
                                    </div>
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" type="password" name="user-confpass"
                                           id="user-confpass"
                                           autocomplete="off"
                                           placeholder="Confirm password"
                                           v-model="user.passwordConfirm"
                                           :class="{'is-invalid': $v.user.passwordConfirm.$error}"
                                           @input="$v.user.passwordConfirm.$touch()">
                                    <div class="invalid-feedback" v-if="!$v.user.passwordConfirm.sameAs">
                                        Passwords should match
                                    </div>
                                </div>
                                <div class="cm-form__wrapper text-center">
                                    <a class="btn btn-success"
                                            href="#second-step"
                                       :disabled="$v.$invalid"
                                       @click="sendDataOnServer">Next</a>
                                    <!--<button class="btn btn-success"-->
                                            <!--:disabled="$v.$invalid"-->
                                            <!--@click="sendDataOnServer">Next</button>-->
                                </div>
                                <div class="cm-form__wrapper text-center">
                                    <router-link class="cm_form__link" to="/auth">Already registered?</router-link>
                                </div>
                            </div>
                        </tab>
                        <tab name="Second step">
                            <div class="cm-form__wrapper text-left">
                                <a class="btn btn-danger" href="#first-step">Back</a>
                            </div>
                            <div class="cm-form__content cm-form__content--s"
                                 v-if="userSportsman === 'true'">
                                <h3 class="cm-form__user-role">Register as Sportsman</h3>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" type="text" name="s-name" id="s-name"
                                           placeholder="Name"
                                           pattern="([A-Za-zА-Яа-я-'])"
                                           autofocus
                                           autocomplete="off"
                                           title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр"
                                           v-model="userName"
                                           @input="$v.userName.$touch()"
                                           :class="{'is-invalid' :$v.userName.$error}">
                                    <div class="invalid-feedback" v-if="!$v.userName.minLength">
                                        Min length of Name is {{ $v.userName.$params.minLength.min }}. Now it
                                        is {{ userName.length }}.
                                    </div>
                                </div>
                                <div class="row cm-form__wrapper align-items-end">
                                    <div class="col">
                                        <label class="cm-form__label" for="s-bdate">Date of Birth</label>
                                    </div>
                                    <div class="col">
                                        <input class="form-control" type="date" name="s-bdate" id="s-bdate"
                                               title="Date of Birth"
                                               v-model="userDateOfBirth"
                                               @input="$v.userDateOfBirth.$touch()"
                                               :class="{'is-invalid' :$v.userDateOfBirth.$error}">
                                    </div>
                                    <div class="invalid-feedback"
                                         v-if="!$v.userDateOfBirth.required">Date of Birth field is required
                                    </div>
                                </div>
                                <div class="row cm-form__wrapper">
                                    <div class="col">
                                        <span class="cm-form__user-gender">Gender</span>
                                    </div>
                                    <div class="col">
                                        <input type="radio" name="gender" id="male"
                                               checked
                                               v-model="userGender"
                                               value="male">
                                        <label for="male"> M</label>
                                    </div>
                                    <div class="col">
                                        <input type="radio" name="gender" id="female"
                                               v-model="userGender"
                                               value="female">
                                        <label for="female"> F</label>
                                    </div>
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" type="text" name="s-federation" id="s-federation"
                                           placeholder="Federation"
                                           disabled
                                           v-model="userFederation">
                                </div>
                                <div class="cm-form__wrapper autocomplete">
                                    <input class="form-control" type="text" name="s-trainer" id="s-trainer"
                                           placeholder="Trainer"
                                           autocomplete="off"
                                           v-model="userTrainer">
                                </div>
                                <div class="cm-form__wrapper autocomplete">
                                    <input class="form-control" type="text" name="s-city" id="s-city"
                                           placeholder="City"
                                           autocomplete="off"
                                           v-model="userCity">
                                </div>
                            </div>
                            <div class="cm-form__content cm-form__content--f"
                                 v-else>
                                <h3 class="cm-form__user-role">Register as Federation</h3>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" type="text" name="f-name" id="f-name"
                                           placeholder="Federation Name"
                                           pattern="([A-Za-zА-Яа-я-']){1,}"
                                           required
                                           autofocus
                                           title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр"
                                           v-model="federationName">
                                </div>
                                <div class="cm-form__wrapper align-items-end row">
                                    <div class="col">
                                        <label class="cm-form__label" for="f-sport">Sport</label>
                                    </div>
                                    <div class="col">
                                        <select class="form-control" name="sport" id="f-sport"
                                                v-model="federationSport">
                                            <option v-for="sport in sports"
                                                    v-bind:value="sport.sportName"
                                                    :key="sport.sportId">{{sport.sportName}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" type="text" name="f-presidentName" id="f-presidentName"
                                           placeholder="President Name"
                                           v-model="federationPresidentName">
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" autocomplete="off" type="text" name="f-subDomain"
                                           id="f-subDomain"
                                           placeholder="Subdomain"
                                           v-model="federationSubDomain">
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" autocomplete="off" type="tel" name="f-tel" id="f-tel"
                                           placeholder="Contact Phone"
                                           v-model="federationPhone">
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" autocomplete="off" type="email" name="f-email"
                                           id="f-email"
                                           placeholder="Contact Email"
                                           v-model="federationEmail">
                                </div>
                            </div>
                            <div class="cm-form__wrapper text-center">
                                <button class="btn btn-primary">Registration
                                </button><!--@click="sendDataOnServer">Registration-->
                            </div>
                        </tab>
                    </tabs>
                </form>
                <!-- <div class="cm-form__message cm-form__message--error">Error message</div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { Tabs, Tab } from "vue-tabs-component";
import axios from "axios";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "registration",
  components: {
    Tabs,
    Tab
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        passwordConfirm: ""
      },
      userSportsman: "true",
      // userEmail: "exemple@exemple.com",
      // userPassword: "password",
      // userPasswordConfirm: "password",
      userName: "sportsman",
      userDateOfBirth: "2018-07-10",
      userGender: "female",
      userFederation: "federation",
      userTrainer: "trainer",
      userCity: "city",
      federationName: "federation",
      sports: [
        {
          sportId: "1",
          sportName: "first"
        },
        {
          sportId: "2",
          sportName: "second"
        },
        {
          sportId: "3",
          sportName: "third"
        }
      ],
      federationSport: "first",
      federationPresidentName: "president",
      federationSubDomain: "domain",
      federationPhone: "phone",
      federationEmail: "exemple@exemple.com",
      authUser: {}
    };
  },
  validations: {
    user: {
      email: {
        required: required,
        email: email
      },
      password: {
        minLength: minLength(6)
      },
      passwordConfirm: {
        sameAs: sameAs("password")
      }
    },
    userName: {
      minLength: minLength(3)
    },
    userDateOfBirth: {
      required: required
    }
  },
  methods: {
    sendDataOnServer: function() {
      window.console.log(this.user.email);
      window.console.log(this.user.password);
      window.console.log(this.user.passwordConfirm);

      axios
        .post(this.$store.state.postRegistrationUserUrl, {
          email: this.user.email,
          password: this.user.password,
          password_confirmation: this.user.passwordConfirm
        })
        .then(function(response) {
          window.console.log(response);
        })
        .catch(function(error) {
          window.console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.wrapper {
  margin: 50px auto;
}

.cm-form__wrapper {
  margin-top: 10px;
  text-align: left;
}

.tabs-component {
  margin: 4em 0;
}

.tabs-component-tabs {
  border: solid 1px #ddd;
  border-radius: 6px;
  margin-bottom: 5px;
}

@media (min-width: 700px) {
  .tabs-component-tabs {
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -1px;
  }
}

.tabs-component-tab {
  color: #999;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
}

.tabs-component-tab:not(:last-child) {
  border-bottom: dotted 1px #ddd;
}

.tabs-component-tab:hover {
  color: #666;
}

.tabs-component-tab.is-active {
  color: #000;
}

.tabs-component-tab.is-disabled * {
  color: #cdcdcd;
  cursor: not-allowed !important;
}

@media (min-width: 700px) {
  .tabs-component-tab {
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 3px 3px 0 0;
    margin-right: 0.5em;
    transform: translateY(2px);
    transition: transform 0.3s ease;
  }

  .tabs-component-tab.is-active {
    border-bottom: solid 1px #fff;
    z-index: 2;
    transform: translateY(0);
  }
}

.tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: 0.75em 1em;
  text-decoration: none;
}

.tabs-component-panels {
  padding: 4em 0;
}

@media (min-width: 700px) {
  .tabs-component-panels {
    border-top-left-radius: 0;
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    padding: 4em 2em;
  }
}
</style>
