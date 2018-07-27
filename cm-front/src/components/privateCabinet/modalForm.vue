<template>
    <div class="popup">
        <div class="popup__inner">
            <form class="popup__edit container text-center">
                <div class="popup__title-wrapper row">
                    <h2 class="popup__title col">Create Sportsman</h2>
                    <button class="popup__exit btn btn-danger"
                            v-on="$listeners">X</button>
                </div>
                <div class="popup__wrapper" style="display: flex; flex-direction: column; align-items: center">
                    <img src="../../assets/github-mark_560x560.png" width="150px" height="150px" alt="sportsman foto"
                         class="popup__foto">
                    <label class="mt-3" for="foto" style="cursor: pointer">Upload new foto</label>
                    <input type="file" name="foto" id="foto" style="display: none">
                </div>
                <div class="cm-form__wrapper popup__wrapper">
                    <input class="form-control" type="text"
                           placeholder="Name"
                           autofocus
                           autocomplete="off"
                           title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр"
                           v-model="sportsman.name">
                    <!--@input="$v.sportsman.name.$touch()"-->
                    <!--:class="{'is-invalid' :$v.sportsman.name.$error}">-->
                    <!--<div class="invalid-feedback" v-if="!$v.sportsman.name.minLength">-->
                    <!--Min length of Name is {{ $v.sportsman.name.$params.minLength.min }}. Now it-->
                    <!--is {{ sportsman.name.length }}.-->
                    <!--</div>-->
                </div>
                <div class="cm-form__wrapper">
                    <input class="form-control" type="text"
                           placeholder="Surname"
                           autocomplete="off"
                           title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр"
                           v-model="sportsman.surname">
                    <!--@input="$v.sportsman.surname.$touch()"-->
                    <!--:class="{'is-invalid' :$v.sportsman.surname.$error}">-->
                    <!--<div class="invalid-feedback" v-if="!$v.sportsman.surname.minLength">-->
                    <!--Min length of Surname is {{ $v.sportsman.sportsman.surname.$params.minLength.min-->
                    <!--}}. Now it-->
                    <!--is {{ sportsman.surname.length }}.-->
                    <!--</div>-->
                </div>
                <div class="cm-form__wrapper">
                    <input class="form-control" type="text"
                           placeholder="Patronymic"
                           autocomplete="off"
                           title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр"
                           v-model="sportsman.patronymic">
                    <!--@input="$v.sportsman.patronymic.$touch()"-->
                    <!--:class="{'is-invalid' :$v.sportsman.patronymic.$error}">-->
                    <!--<div class="invalid-feedback" v-if="!$v.sportsman.patronymic.minLength">-->
                    <!--Min length of Patronymic is {{-->
                    <!--$v.sportsman.sportsman.patronymic.$params.minLength.min }}. Now it-->
                    <!--is {{ sportsman.patronymic.length }}.-->
                    <!--</div>-->
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
                <div class="cm-form__wrapper align-items-end row">
                    <div class="col">
                        <label class="cm-form__label" for="belt">Belt</label>
                    </div>
                    <div class="col">
                        <select class="form-control" name="belt" id="belt"
                                v-model="sportsman.belt">
                            <option v-for="belt in belts"
                                    v-bind:value="belt.color"
                                    :key="belt.id">{{belt.color}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="cm-form__wrapper align-items-end row">
                    <div class="col">
                        <label class="cm-form__label" for="degree">Degree</label>
                    </div>
                    <div class="col">
                        <select class="form-control" name="degree" id="degree"
                                v-model="sportsman.degree">
                            <option v-for="degree in degrees"
                                    v-bind:value="degree.value"
                                    :key="degree.id">{{degree.value}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="cm-form__wrapper">
                    <input class="form-control" type="text"
                           placeholder="Weight"
                           autocomplete="off"
                           v-model="sportsman.weight">
                </div>
                <div class="cm-form__wrapper">
                    <input class="form-control" type="text"
                           placeholder="City"
                           autocomplete="off"
                           v-model="sportsman.city">
                </div>
                <div class="cm-form__wrapper">
                    <input class="form-control" type="text"
                           placeholder="Coaches"
                           autocomplete="off"
                           v-model="sportsman.coaches">
                </div>
                <section class="popup__sertificates">
                    <!--<userCertificates></userCertificates>-->
                </section>
                <button class="popup__save btn btn-success mt-3 mb-2"
                        @click.prevent="createSportsman">Create
                </button>
            </form>
        </div>
    </div>
</template>

<script>
//    import userCertificates from "../components/userProfile/userCertificates"
import axios from "axios";

    export default {
        name: "modal-form",
//        components: {
//            userCertificates,
//        },
        data() {
            return {
                sportsman: {
                    name: "",
                    surname: "",
                    patronymic: "",
                    gender: "",
                    dateOfBirth: "2018-07-10",
                    belt: "",
                    degree: "",
                    weight: "",
                    city: "",
                    coaches: ""
                },
                belts: {},
                degrees: {},
                http: axios.create({
                    headers: { Authorization: "Bearer " + this.$store.state.authUser.auth_token}
                })
            }
        },

        methods: {
            createSportsman: function() {
                this.http.post(this.$store.state.postSportsman, {
                    first_name: this.sportsman.name,
                    last_name: this.sportsman.surname,
                    patronymic_name: this.sportsman.patronymic,
                    gender: this.sportsman.gender,
                    date_of_birth: this.sportsman.dateOfBirth,
                })
                    .then((response) => {
                        console.log(response);
                        this.$emit('clicked');
                    })
                    .catch(error => console.log(error.message));
            },
        }
    }
</script >

<style lang="scss">
    .popup {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 100vw;
        height: 100vh;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .80);
        z-index: 2;
        overflow: hidden;
        transition: .64s ease-in-out;
        &__inner {
            position: relative;
            display: flex;
            align-items: center;
            max-width: 800px;
            max-height: 600px;
            width: 80%;
            height: 80%;
            background-color: #fff;
            transition: .64s ease-in-out;
            overflow-y: auto;
        }
        &__edit {
            flex-direction: column;
            justify-content: center;
            width: 90%;
            height: 90%;
            padding: 1rem;
        }
    }
</style>
