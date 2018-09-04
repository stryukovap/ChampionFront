<template>
    <div class="registration">
        <div class="container">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6 wrapper">
                <form class="cm-form" autocomplete="off" @submit.prevent="">
                    <tabs>
                        <tab name="First step">
                            <div class="cm-form__content cm-form__content--one">
                                <h1 class="text-center">Registration</h1>
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
                                           @blur="$v.user.email.$touch()"
                                           :class="{'is-invalid': $v.user.email.$error}">
                                    <div class="invalid-feedback"
                                         v-if="!$v.user.email.required">Email field is required
                                    </div>
                                    <div class="invalid-feedback"
                                         v-if="!$v.user.email.email">This field should be an email
                                    </div>
                                    <div class="invalid-feedback"
                                         v-if="!$v.user.email.unique">This email is already exist
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.user.email.maxLength">
                                        Max length of email is {{ $v.user.email.$params.maxLength.max }}.
                                    </div>
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" type="password" name="user-pass" id="user-pass"
                                           autocomplete="off"
                                           placeholder="Password"
                                           v-model="user.password"
                                           @input="$v.user.password.$touch()"
                                           @blur="$v.user.password.$touch()"
                                           :class="{'is-invalid' :$v.user.password.$error}">
                                    <div class="invalid-feedback"
                                         v-if="!$v.user.password.required">Password field is required
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.user.password.minLength">
                                        Min length of password is {{ $v.user.password.$params.minLength.min }}. Now it
                                        is {{ user.password.length }}.
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.user.password.maxLength">
                                        Max length of password is {{ $v.user.password.$params.maxLength.max }}.
                                    </div>
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" type="password" name="user-confpass"
                                           id="user-confpass"
                                           autocomplete="off"
                                           placeholder="Confirm password"
                                           v-model="user.passwordConfirm"
                                           :class="{'is-invalid': $v.user.passwordConfirm.$error}"
                                           @input="$v.user.passwordConfirm.$touch()"
                                           @blur="$v.user.passwordConfirm.$touch()">
                                    <div class="invalid-feedback"
                                         v-if="!$v.user.password.required">Confirm password field is required
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.user.passwordConfirm.sameAs">
                                        Passwords should match
                                    </div>
                                </div>
                                <div class="cm-form__wrapper text-center">
                                    <a class="btn btn-success"
                                       href="#second-step"
                                       v-bind:class="{'disabled':
                                       $v.user.email.$error ||
                                       $v.user.password.$error ||
                                       $v.user.passwordConfirm.$error  ||
                                       testInitPassword}">Next</a>
                                </div>
                                <div class="cm-form__wrapper text-center">
                                    <router-link class="cm_form__link" to="/auth">Already registered?</router-link>
                                </div>
                            </div>
                        </tab>
                        <tab name="Second step"
                             :is-disabled="$v.user.email.$error ||
                                       $v.user.password.$error ||
                                       $v.user.passwordConfirm.$error ||
                                       testInitPassword">
                            <!--включено для отладки-->
                            <!--<tab name="Second step">-->
                            <div class="cm-form__wrapper text-left">
                                <a class="btn btn-danger" href="#first-step">Back</a>
                            </div>
                            <div class="cm-form__content cm-form__content--s"
                                 v-if="userSportsman === 'true'">
                                <h3 class="cm-form__user-role text-center">Register as Sportsman</h3>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" type="text"
                                           placeholder="Name"
                                           autofocus
                                           autocomplete="off"
                                           v-model="sportsman.name"
                                           @input="$v.sportsman.name.$touch()"
                                           @blur="$v.sportsman.name.$touch()"
                                           :class="{'is-invalid' :$v.sportsman.name.$error}">
                                    <div class="invalid-feedback" v-if="!$v.sportsman.name.minLength">
                                        Min length of Name is {{ $v.sportsman.name.$params.minLength.min }}. Now it
                                        is {{ sportsman.name.length }}.
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.sportsman.name.required">
                                        Field is required
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.sportsman.name.alpha">
                                        Field for only alphabet characters
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.sportsman.name.maxLength">
                                        Max length of Name is {{ $v.sportsman.name.$params.maxLength.max }}.
                                    </div>
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" type="text"
                                           placeholder="Surname"
                                           autocomplete="off"
                                           v-model="sportsman.surname"
                                           @input="$v.sportsman.surname.$touch()"
                                           @blur="$v.sportsman.surname.$touch()"
                                           :class="{'is-invalid' :$v.sportsman.surname.$error}">
                                    <div class="invalid-feedback" v-if="!$v.sportsman.surname.minLength">
                                        Min length of Surname is {{ $v.sportsman.surname.$params.minLength.min
                                        }}. Now it
                                        is {{ sportsman.surname.length }}.
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.sportsman.surname.required">
                                        Field is required
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.sportsman.surname.alpha">
                                        Field for only alphabet characters
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.sportsman.surname.maxLength">
                                        Max length of Surname is {{ $v.sportsman.surname.$params.maxLength.max }}.
                                    </div>
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" type="text"
                                           placeholder="Patronymic"
                                           autocomplete="off"
                                           v-model="sportsman.patronymic"
                                           @input="$v.sportsman.patronymic.$touch()"
                                           @blur="$v.sportsman.patronymic.$touch()"
                                           :class="{'is-invalid' :$v.sportsman.patronymic.$error}">
                                    <div class="invalid-feedback" v-if="!$v.sportsman.patronymic.minLength">
                                        Min length of Patronymic is {{
                                        $v.sportsman.patronymic.$params.minLength.min }}. Now it
                                        is {{ sportsman.patronymic.length }}.
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.sportsman.patronymic.maxLength">
                                        Max length of Patronymic is {{ $v.sportsman.patronymic.$params.maxLength.max }}.
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.sportsman.patronymic.required">
                                        Field is required
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.sportsman.patronymic.alpha">
                                        Field for only alphabet characters
                                    </div>
                                </div>
                                <div class="cm-form__wrapper">
                                    <div class="row align-items-end">
                                        <div class="col align-self-center">
                                            <label class="cm-form__label" for="s-bdate">Date of Birth</label>
                                        </div>
                                        <div class="col">
                                            <input class="form-control" type="date" name="s-bdate" id="s-bdate"
                                                   title="Date of Birth"
                                                   v-model="sportsman.dateOfBirth"
                                                   @input="$v.sportsman.dateOfBirth.$touch()"
                                                   @blur="$v.sportsman.dateOfBirth.$touch()"
                                                   :class="{'is-invalid' :$v.sportsman.dateOfBirth.$error}">
                                            <div class="invalid-feedback" v-if="!$v.sportsman.dateOfBirth.required">
                                                Date of Birth field is required
                                            </div>
                                            <div class="invalid-feedback"
                                                 v-if="!$v.sportsman.dateOfBirth.checkFutureData">
                                                Date of Birth choose the future date, check Date
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row cm-form__wrapper">
                                    <div class="col">
                                        <span class="cm-form__user-gender">Gender</span>
                                    </div>
                                    <div class="col">
                                        <input type="radio" name="gender" id="male"
                                               checked
                                               v-model="sportsman.gender"
                                               value="M">
                                        <label for="male"> Male</label>
                                    </div>
                                    <div class="col">
                                        <input type="radio" name="gender" id="female"
                                               v-model="sportsman.gender"
                                               value="F">
                                        <label for="female"> Female</label>
                                    </div>
                                </div>
                                <div class="cm-form__wrapper row">
                                    <div class="col">
                                        <label for="federation" class="cm-form__label">Federation</label>
                                    </div>
                                    <select class="form-control" name="federation" id="federation"
                                            v-model="sportsman.federation"
                                            @change='getCoaches'
                                    >
                                        <option v-for="federation in federations"
                                                v-bind:value="federation.id"
                                                :key="federation.id">{{federation.name}}
                                        </option>
                                    </select>
                                </div>
                                <div class="cm-form__wrapper row">
                                    <div class="col">
                                        <label for="coach" class="cm-form__label">Coach</label>
                                    </div>
                                    <div class="col">

                                       <multiselect id = "trainer"
                                                    v-model = "sportsman.coaches"
                                                    :options = "options"
                                                    :multiple = "true"
                                                    :close-on-select = "true"
                                                    :clear-on-select = "false"
                                                    :hide-selected = "true"
                                                    :preserve-search = "true"
                                                    placeholder = "Choose your coach"
                                                    label = "last_name"
                                                    track-by = "id"
                                                    :preselect-first = "true"
                                       ><template slot = "tag" slot-scope = "props">
                                            <span class = "custom__tag">
                                                <!-- option === coach -->
                                                <span>{{ props.option.last_name }}</span>
                                                <span class = "custom__remove" @click = "props.remove(props.option)">❌</span>
                                            </span>
                                        </template>
                                        </multiselect>
                                    </div>
                                </div>
                                <div class="cm-form__wrapper row">
                                    <div class="col">
                                        <label for="city" class="cm-form__label">City</label>
                                    </div>
                                    <div class="col">
                                        <input class="form-control" type="text"
                                               id="city"
                                               placeholder="City"
                                               autocomplete="off"
                                               @input="$v.sportsman.city.$touch()"
                                               @blur="$v.sportsman.city.$touch()"
                                               :class="{'is-invalid' :$v.sportsman.city.$error}"
                                               v-model="sportsman.city">
                                        <div class="invalid-feedback" v-if="!$v.sportsman.city.required">
                                            Field is required
                                        </div>
                                    </div>
                                </div>
                                <div class="cm-form__wrapper text-center">
                                    <button class="btn btn-primary"
                                            v-bind:disabled="testStepSportsman || testInitPassword || testInitValuesSportsman"
                                            v-bind:class="{'disabled':
                                            $v.user.email.$error ||
                                            $v.user.password.$error ||
                                            $v.user.passwordConfirm.$error  ||
                                            testInitPassword ||
                                            testInitValuesSportsman ||
                                            $v.sportsman.patronymic.$error ||
                                            $v.sportsman.surname.$error ||
                                            $v.sportsman.name.$error ||
                                            $v.sportsman.dateOfBirth.$error ||
                                            $v.sportsman.city.$error}"
                                            @click="sendUserDataOnServer">Registration sportsman
                                    </button>
                                </div>
                            </div>
                            <div class="cm-form__content cm-form__content--f"
                                 v-else>
                                <h3 class="cm-form__user-role text-center">Register as Federation</h3>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" type="text" name="f-name" id="f-name"
                                           placeholder="Federation Name"
                                           autofocus
                                           v-model="federation.name"
                                           @input="$v.federation.name.$touch()"
                                           @blur="$v.federation.name.$touch()"
                                           :class="{'is-invalid' :$v.federation.name.$error}">
                                    <div class="invalid-feedback" v-if="!$v.federation.name.minLength">
                                        Min length of Federation Name is {{ $v.federation.name.$params.minLength.min
                                        }}. Now it
                                        is {{ federation.name.length }}.
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.federation.name.maxLength">
                                        Max length of Federation Name is {{ $v.federation.name.$params.maxLength.max }}.
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.federation.name.required">
                                        Field is required
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.federation.name.alpha">
                                        Field for only alphabet characters
                                    </div>
                                </div>
                                <div class="cm-form__wrapper align-items-end row">
                                    <div class="col">
                                        <label class="cm-form__label" for="f-sport">Sport</label>
                                    </div>
                                    <div class="col">
                                        <select class="form-control" name="sport" id="f-sport"
                                                v-model="federation.sport">
                                            <option v-for="sport in sports"
                                                    v-bind:value="sport.id"
                                                    :key="sport.id">{{sport.name}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" type="text" name="f-presidentName" id="f-presidentName"
                                           placeholder="President Name"
                                           v-model="federation.presidentName"
                                           @input="$v.federation.presidentName.$touch()"
                                           @blur="$v.federation.presidentName.$touch()"
                                           :class="{'is-invalid' :$v.federation.presidentName.$error}">
                                    <div class="invalid-feedback" v-if="!$v.federation.presidentName.minLength">
                                        Min length of President Name is {{
                                        $v.federation.presidentName.$params.minLength.min
                                        }}. Now it
                                        is {{ presidentName.name.length }}.
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.federation.presidentName.maxLength">
                                        Max length of President Name is {{ $v.federation.presidentName.$params.maxLength.max }}.
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.federation.presidentName.required">
                                        Field is required
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.federation.presidentName.alpha">
                                        Field for only alphabet characters
                                    </div>
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" autocomplete="off" type="text" name="f-subDomain"
                                           id="f-subDomain"
                                           placeholder="Subdomain"
                                           v-model="federation.subDomain"
                                           @input="$v.federation.subDomain.$touch()"
                                           @blur="$v.federation.subDomain.$touch()"
                                           :class="{'is-invalid' :$v.federation.subDomain.$error}">
                                    <div class="invalid-feedback" v-if="!$v.federation.subDomain.required">
                                        Field is required
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.federation.presidentName.minLength">
                                        Min length of subDomain is {{
                                        $v.federation.subDomain.$params.minLength.min
                                        }}. Now it
                                        is {{ subDomain.subDomain.length }}.
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.federation.subDomain.maxLength">
                                        Max length of subDomain is {{ $v.federation.subDomain.$params.maxLength.max }}.
                                    </div>
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" autocomplete="off" type="tel" name="f-tel" id="f-tel"
                                           placeholder="Contact Phone"
                                           @input="$v.federation.phone.$touch()"
                                           @blur="$v.federation.phone.$touch()"
                                           :class="{'is-invalid' :$v.federation.phone.$error}"
                                           v-model="federation.phone">
                                    <div class="invalid-feedback" v-if="!$v.federation.phone.numeric">
                                        Field for only numeric characters
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.federation.phone.minLength">
                                        Min length of phone is {{
                                        $v.federation.phone.$params.minLength.min
                                        }}. Now it
                                        is {{ subDomain.phone.length }}.
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.federation.phone.maxLength">
                                        Max length of Phone is {{ $v.federation.phone.$params.maxLength.max }}.
                                    </div>
                                </div>
                                <div class="cm-form__wrapper">
                                    <input class="form-control" autocomplete="off" type="email" name="f-email"
                                           id="f-email"
                                           placeholder="Contact Email"
                                           @input="$v.federation.email.$touch()"
                                           @blur="$v.federation.email.$touch()"
                                           :class="{'is-invalid' :$v.federation.email.$error}"
                                           v-model="federation.email">
                                    <div class="invalid-feedback"
                                         v-if="!$v.federation.email.required">Email field is required
                                    </div>
                                    <div class="invalid-feedback"
                                         v-if="!$v.federation.email.email">This field should be an email
                                    </div>
                                    <div class="invalid-feedback" v-if="!$v.federation.email.maxLength">
                                        Max length of email is {{ $v.federation.email.$params.maxLength.max }}.
                                    </div>
                                </div>
                                <div class="cm-form__wrapper text-center">
                                    <button class="btn btn-primary"
                                            v-bind:disabled="testStepFederation || testInitPassword || testInitValuesFederation"
                                            v-bind:class="{'disabled':
                                       $v.user.email.$error ||
                                       $v.user.password.$error ||
                                       $v.user.passwordConfirm.$error  ||
                                       testInitPassword ||
                                       testInitValuesFederation ||
                                       $v.federation.phone.$error ||
                                       $v.federation.email.$error ||
                                       $v.federation.name.$error ||
                                       $v.federation.presidentName.$error ||
                                       $v.federation.subDomain.$error}"
                                            @click="sendUserDataOnServer">Registration federation
                                    </button>
                                </div>
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
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  numeric,
  alpha
} from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";

export default {
  name: "registration",
  components: {
    Tabs,
    Tab,
    Multiselect
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        passwordConfirm: ""
      },
      sportsman: {
        name: "",
        surname: "",
        patronymic: "",
        gender: "M",
        dateOfBirth: "",
        federation: "",
        coaches: [],
        city: ""
      },
      federation: {
        name: "",
        sport: "2", //по умолчанию, чтобы показывалось значение
        presidentName: "",
        subDomain: "",
        phone: "",
        email: ""
      },
      userSportsman: "true",
      sports: {},
      authUser: {},
      value: [],
      options: []
    };
  },
  mounted() {
    axios
      .get("https://champion-api.herokuapp.com/api/federations")
      .then(response => {
        // handle success
        // window.console.log(response);
        if (response.status === 200) {
          this.federations = response.data;
        }
      })
      // .then(this.handleSuccess)
      // .then(this.handleCreated);
      .catch(function(error) {
        // handle error
        window.console.log(error);
      });
    axios
      .get("https://champion-api.herokuapp.com/api/sports")
      .then(response => {
        // handle success
        // window.console.log(response);
        if (response.status === 200) {
          this.sports = response.data;
        }
      })
      .catch(function(error) {
        // handle error
        window.console.log(error);
      });
    axios
      .get(
        `https://champion-api.herokuapp.com/api/coach-list/by-federation/${
          this.sportsman.federation
        }`
      )
      .then(response => {
        if (response.status === 200) {
          this.coaches = response.data;
        }
      })
      .catch(function(error) {
        window.console.log(error);
      });
  },
  computed: {
    testStepFederation: function() {
      if (
        this.$v.user.email.$error ||
        this.$v.user.password.$error ||
        this.$v.user.passwordConfirm.$error ||
        this.$v.federation.phone.$error ||
        this.$v.federation.email.$error ||
        this.$v.federation.name.$error ||
        this.$v.federation.presidentName.$error ||
        this.$v.federation.subDomain.$error
      ) {
        return true;
      } else {
        return false;
      }
    },
    testStepSportsman: function() {
      if (
        this.$v.user.email.$error ||
        this.$v.user.password.$error ||
        this.$v.user.passwordConfirm.$error ||
        this.$v.sportsman.patronymic.$error ||
        this.$v.sportsman.surname.$error ||
        this.$v.sportsman.name.$error ||
        this.$v.sportsman.dateOfBirth.$error ||
        this.$v.sportsman.city.$error
      ) {
        return true;
      } else {
        return false;
      }
    },
    testInitPassword: function() {
      if (this.user.password === "" || this.user.passwordConfirm === "") {
        return true;
      } else {
        return false;
      }
    },
    testInitValuesFederation: function() {
      if (
        this.federation.phone === "" ||
        this.federation.email === "" ||
        this.federation.name === "" ||
        this.federation.presidentName === "" ||
        this.federation.subDomain === ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    testInitValuesSportsman: function() {
      if (
        this.sportsman.patronymic === "" ||
        this.sportsman.surname === "" ||
        this.sportsman.name === "" ||
        this.sportsman.dateOfBirth === "" ||
        this.sportsman.city === ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  },

  validations: {
    user: {
      email: {
        required: required,
        maxLength: maxLength(100),
        email: email,
        unique: val => {
          // if (val === "") return true;
          return (
            axios
              .get(
                "https://champion-api.herokuapp.com/api/user/find?email=" + val
              ) //+userEmail, 200 true, 404 false)
              // .get(this.$store.state.getEmailValidation + val) //+userEmail, 200 true, 404 false)
              .then(response => {
                // handle success
                if (response.status === 200) {
                  return false;
                }
              })
              .catch(error => {
                // handle error
                window.console.log(error);
                return true;
              })
          );
        }
      },
      password: {
        required: required,
        minLength: minLength(6),
        maxLength: maxLength(16)
      },
      passwordConfirm: {
        required: required,
        sameAs: sameAs("password")
      }
    },
    sportsman: {
      name: {
        required: required,
        alpha: alpha,
        minLength: minLength(2),
        maxLength: maxLength(36)
      },
      surname: {
        required: required,
        alpha: alpha,
        minLength: minLength(2),
        maxLength: maxLength(36)
      },
      patronymic: {
        required: required,
        alpha: alpha,
        minLength: minLength(2),
        maxLength: maxLength(36)
      },
      city: {
        required: required
      },
      dateOfBirth: {
        required: required,
        checkFutureData: val => {
          if (val == "") {
            return true;
          }
          var today = new Date(); // сегодняшнеяя дата и время
          var inputDate = new Date(val);
          if (today >= inputDate) {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    federation: {
      phone: {
        required: required,
        numeric: numeric,
        minLength: minLength(15),
        maxLength: maxLength(15)
      },
      email: {
        required: required,
        email: email,
        maxLength: maxLength(100)
      },
      name: {
        required: required,
        alpha: alpha,
        minLength: minLength(3),
        maxLength: maxLength(42)
      },
      presidentName: {
        required: required,
        alpha: alpha,
        minLength: minLength(3),
        maxLength: maxLength(42)
      },
      subDomain: {
        required: required,
        minLength: minLength(2),
        maxLength: maxLength(8)
      }
    }
  },
  methods: {
    sendUserDataOnServer: function() {
      localStorage.removeItem("lbUser");
      window.console.log("sendUserDataOnServer sending");
      axios
        .post("https://champion-api.herokuapp.com/api/user", {
          email: this.user.email,
          password: this.user.password,
          password_confirmation: this.user.passwordConfirm
        })
        .then(response => {
          window.console.log(response);
          this.authUser = response.data;
          let HTTP = axios.create({
            headers: {
              Authorization: "Bearer " + this.authUser.auth_token
            }
          });
          if (this.userSportsman === "true") {
            window.console.log("sendSportsmanDataOnServer sending");
            HTTP.post("https://champion-api.herokuapp.com/api/sportsman", {
              first_name: this.sportsman.name,
              last_name: this.sportsman.surname,
              patronymic_name: this.sportsman.patronymic,
              gender: this.sportsman.gender,
              date_of_birth: this.sportsman.dateOfBirth,
              federation_id: this.sportsman.federation,
              city: this.sportsman.city
            })
              .then(response => {
                window.console.log(response);
                this.$router.push("/");
                //
                axios
                  .post(this.$store.state.postLoginUrl, {
                    email: this.user.email,
                    password: this.user.password
                  })
                  .then(response => {
                    if (response.status === 200) {
                      this.$store.state.authUser = response.data;
                      this.$store.state.isLoggedIn = true;
                      window.localStorage.setItem(
                        "lbUser",
                        JSON.stringify(this.$store.state.authUser)
                      );
                    } else {
                      this.$store.state.isLoggedIn = false;
                    }
                  })
                  .catch(function(error) {
                    window.console.log(error);
                  });
                //
              })
              .catch(error => {
                window.console.log(error);
              });
          } else {
            window.console.log("sendFederationDataOnServer sending");
            HTTP.post("https://champion-api.herokuapp.com/api/federations", {
              name: this.federation.name,
              president_name: this.federation.presidentName,
              logo_id: "",
              sub_domain: this.federation.subDomain,
              contact_telephone: this.federation.phone,
              contact_email: this.federation.email,
              sport_id: this.federation.sport
            })
              .then(response => {
                window.console.log(response);
                this.$router.push("/");
                //
                axios
                  .post(this.$store.state.postLoginUrl, {
                    email: this.user.email,
                    password: this.user.password
                  })
                  .then(response => {
                    if (response.status === 200) {
                      this.$store.state.authUser = response.data;
                      this.$store.state.isLoggedIn = true;
                      window.localStorage.setItem(
                        "lbUser",
                        JSON.stringify(this.$store.state.authUser)
                      );
                    } else {
                      this.$store.state.isLoggedIn = false;
                    }
                  })
                  .catch(function(error) {
                    window.console.log(error);
                  });
                //
              })
              .catch(error => {
                window.console.log(error);
              });
          }
        })
        .catch(error => {
          window.console.log(error);
        });
    },
    getCoaches: function() {
      this.sportsman.coaches = []; //clearing list of coaches
      axios
        .get(
          `https://champion-api.herokuapp.com/api/coach-list/by-federation/${
            this.sportsman.federation
          }`
        )
        .then(response => {
          if (response.status === 200) {
            this.options = response.data;
          }
        })
        .catch(function(error) {
          window.console.log(error);
        });
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
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

.custom__tag {
  display: inline-block;
  padding: 3px 12px;
  background: #d2d7ff;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 10px;
  cursor: pointer;
}

.custom__remove {
  padding: 0;
  font-size: 10px;
  margin-left: 5px;
}
</style>
