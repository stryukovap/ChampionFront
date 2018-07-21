<template>
    <div class="about">
        <h1>This is an about page</h1>
        <!-- <form action="#">
          <h1>Restore password</h1>
          <input class="form-control" type="email" name="forgot_password" id="forgot_password" placeholder="Email" required>
          <router-link class="btn btn-primary" to="/restorepassword">Restore</router-link>
        </form> -->
        <form class="popup__edit">
            <div class="popup__title-wrapper row">
                <h2 class="popup__title col">Edit Sportsman</h2>
                <button class="popup__exit col">X</button>
            </div>
            <img src="#" alt="sportsman foto" class="popup__foto">
            <div class="cm-form__wrapper popup__wrapper">
                <input class="form-control" type="text"
                       placeholder="Name"
                       autofocus
                       autocomplete="off"
                       title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр"
                       v-model="sportsman.name"
                       @input="$v.sportsman.name.$touch()"
                       :class="{'is-invalid' :$v.sportsman.name.$error}">
                <div class="invalid-feedback" v-if="!$v.sportsman.name.minLength">
                    Min length of Name is {{ $v.sportsman.name.$params.minLength.min }}. Now it
                    is {{ sportsman.name.length }}.
                </div>
            </div>
            <div class="cm-form__wrapper">
                <input class="form-control" type="text"
                       placeholder="Surname"
                       autocomplete="off"
                       title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр"
                       v-model="sportsman.surname"
                       @input="$v.sportsman.surname.$touch()"
                       :class="{'is-invalid' :$v.sportsman.surname.$error}">
                <div class="invalid-feedback" v-if="!$v.sportsman.surname.minLength">
                    Min length of Surname is {{ $v.sportsman.sportsman.surname.$params.minLength.min
                    }}. Now it
                    is {{ sportsman.surname.length }}.
                </div>
            </div>
            <div class="cm-form__wrapper">
                <input class="form-control" type="text"
                       placeholder="Patronymic"
                       autocomplete="off"
                       title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр"
                       v-model="sportsman.patronymic"
                       @input="$v.sportsman.patronymic.$touch()"
                       :class="{'is-invalid' :$v.sportsman.patronymic.$error}">
                <div class="invalid-feedback" v-if="!$v.sportsman.patronymic.minLength">
                    Min length of Patronymic is {{
                    $v.sportsman.sportsman.patronymic.$params.minLength.min }}. Now it
                    is {{ sportsman.patronymic.length }}.
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
            <div class="cm-form__wrapper">
                <input class="form-control" type="text"
                       placeholder="Trainer"
                       autocomplete="off"
                       v-model="sportsman.trainer">
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
                                :key="belt.beltId">{{belt.color}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="cm-form__wrapper align-items-end row">
                <div class="col">
                    <label class="cm-form__label" for="degree">Belt</label>
                </div>
                <div class="col">
                    <select class="form-control" name="degree" id="degree"
                            v-model="sportsman.degree">
                        <option v-for="degree in degrees"
                                v-bind:value="degree.value"
                                :key="degree.degreeId">{{degree.value}}
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
            <section class="popup__sertificates">

            </section>
            <button class="popup__save"
                    @click="updateSportsman">Save</button>
        </form>
    </div>
</template>
