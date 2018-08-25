<template>
    <div class="popup">
        <div class="popup__inner">
            <form class="popup__edit container text-center">
                <div class="popup__title-wrapper row">
                    <h2 class="popup__title col">
                        {{sportsmanId === ''? 'Create': 'Edit'}}
                        {{personRole === 'Coach' ? 'Coach' : (personRole === 'Referee' ? 'Referee' : 'Sportsman')}}
                    </h2>
                    <button class="popup__exit btn btn-danger"
                            v-on="$listeners">X</button>
                </div>
                <div class="popup__wrapper mt-1 row">
                    <div class="col-12" style="display: flex; flex-direction: column; align-items: center;">
                        <img v-if="image.sportsmanImageUrl"
                             :src="image.sportsmanImageUrl"
                             width="150px"
                             alt="Sportsman photo"
                             class="popup__photo">
                        <img v-else-if="image.sportsmanImage"
                             :src="image.sportsmanImage"
                             width="150px"
                             alt="Sportsman photo"
                             class="popup__photo">
                    </div>
                </div>
                <div class="popup__wrapper mt-1 row">
                    <div class="col-12">
                        <label class="btn btn-outline-success btn-sm mt-3 mr-3"
                               for="photo" style="cursor: pointer; margin-bottom: 0;">
                            Choose photo
                        </label>
                        <input type="file"
                               @change="onFileChange"
                               name="photo" id="photo"
                               style="display: none">
                        <button
                                v-if="image.sportsmanImage"
                                class="btn btn-outline-success btn-sm mt-3 mr-3"
                                @click.prevent="uploadImage">Upload</button>
                        <button
                                v-if="image.sportsmanImageUrl"
                                class="btn btn-outline-danger btn-sm mt-3"
                                @click.prevent="removeImage">Remove</button>

                    </div>
                </div>
                <div class="cm-form__wrapper popup__wrapper">
                    <input class="form-control" type="text"
                           placeholder="Name"
                           autofocus required
                           autocomplete="off"
                           title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр"
                           v-model="$store.state.sportsman.first_name">
                    <!--@input="$v.sportsman.first_name.$touch()"-->
                    <!--:class="{'is-invalid' :$v.sportsman.first_name.$error}">-->
                    <!--<div class="invalid-feedback" v-if="!$v.sportsman.first_name.minLength">-->
                    <!--Min length of Name is {{ $v.sportsman.first_name.$params.minLength.min }}. Now it-->
                    <!--is {{ sportsman.first_name.length }}.-->
                    <!--</div>-->
                </div>
                <div class="cm-form__wrapper">
                    <input class="form-control" type="text"
                           placeholder="Surname" required
                           autocomplete="off"
                           title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр"
                           v-model="$store.state.sportsman.last_name">
                    <!--@input="$v.sportsman.last_name.$touch()"-->
                    <!--:class="{'is-invalid' :$v.sportsman.last_name.$error}">-->
                    <!--<div class="invalid-feedback" v-if="!$v.sportsman.last_name.minLength">-->
                    <!--Min length of Surname is {{ $v.sportsman.sportsman.surname.last_name.minLength.min-->
                    <!--}}. Now it-->
                    <!--is {{ sportsman.last_name.length }}.-->
                    <!--</div>-->
                </div>
                <div class="cm-form__wrapper">
                    <input class="form-control" type="text"
                           placeholder="Patronymic"
                           autocomplete="off" required
                           title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр"
                           v-model="$store.state.sportsman.patronymic_name">
                    <!--@input="$v.sportsman.patronymic_name.$touch()"-->
                    <!--:class="{'is-invalid' :$v.sportsman.patronymic_name.$error}">-->
                    <!--<div class="invalid-feedback" v-if="!$v.sportsman.patronymic_name.minLength">-->
                    <!--Min length of Patronymic is {{-->
                    <!--$v.sportsman.sportsman.patronymic_name.$params.minLength.min }}. Now it-->
                    <!--is {{ sportsman.patronymic_name.length }}.-->
                    <!--</div>-->
                </div>
                <div class="cm-form__wrapper">
                    <div class="row align-items-end">
                        <div class="col align-self-center">
                            <label class="cm-form__label" for="s-bdate">Date of Birth</label>
                        </div>
                        <div class="col">
                            <input class="form-control" type="date" name="s-bdate" id="s-bdate"
                                   title="Date of Birth" required
                                   v-model="$store.state.sportsman.date_of_birth">
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
                               v-model="$store.state.sportsman.gender"
                               value="M">
                        <label for="male"> Male</label>
                    </div>
                    <div class="col">
                        <input type="radio" name="gender" id="female"
                               v-model="$store.state.sportsman.gender"
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
                                v-model="$store.state.sportsman.belt">
                            <option v-for="belt in belts"
                                    v-bind:value="belt.id"
                                    :key="belt.id">{{belt.name}}
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
                                v-model="$store.state.sportsman.degree">
                            <option v-for="degree in degrees"
                                    v-bind:value="degree.id"
                                    :key="degree.id">{{degree.title}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="cm-form__wrapper">
                    <input class="form-control" type="text"
                           placeholder="Weight"
                           autocomplete="off"
                           v-model="$store.state.sportsman.weight">
                </div>
                <div class="cm-form__wrapper">
                    <!--<input class="form-control" type="text"-->
                    <!--placeholder="City"-->
                    <!--autocomplete="off"-->
                    <!--v-model="sportsman.city">-->
                    <autocomplete-city
                            v-bind:cities="cities"
                    ></autocomplete-city>
                </div>
                <div class="cm-form__wrapper">
                    <input class="form-control" type="text"
                           placeholder="Coaches"
                           autocomplete="off"
                           v-model="$store.state.sportsman.coaches">
                </div>
                <section class="popup__sertificates">
                    <!--<userCertificates></userCertificates>-->
                </section>
                <button v-if="personRole === 'OwnCoachSportsman' && sportsmanId === ''"
                        class="popup__save btn btn-success mt-3 mb-5"
                        @click.prevent="createOwnCoachSportsman">Create
                </button>
                <button v-else-if="sportsmanId === ''" class="popup__save btn btn-success mt-3 mb-5"
                        @click.prevent="createSportsman">Create
                </button>
                <button v-else-if="personRole === 'OwnCoachSportsman' && sportsmanId !== ''"
                        class="popup__save btn btn-success mt-3 mb-5"
                        @click.prevent="updateSportsman">Save
                </button>
                <button v-else-if="sportsmanId !== ''" class="popup__save btn btn-success mt-3 mb-5"
                        @click.prevent="updateSportsman">Save
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    //    import userCertificates from "../components/userProfile/userCertificates"
    import axios from "axios";
    import AutocompleteCity from "../autocomplete_city";
    import citiesUkrainian from "../../assets/citiesUkrainian";
    import citiesRussian from "../../assets/citiesRussian";

    export default {
        name: "modal-form",
        components: {
            // userCertificates,
            AutocompleteCity
        },
        props: ["sportsmanId", "personRole"],
        data() {
            return {
                role: {
                    is_coach: 0,
                    is_referee: 0
                },
                belts: {},
                degrees: {},
                image: {
                    sportsmanImageForUpload: '',
                    sportsmanImage: '',
                    sportsmanImageId: '',
                    sportsmanImageUrl: '',
                    sportsmanImageConnectionId: ''
                },
                http: axios.create({
                    headers: {
                        Authorization: "Bearer " + this.$store.state.authUser.auth_token
                    }
                }),
                httpUpload: axios.create({
                    headers: {
                        Authorization: "Bearer " + this.$store.state.authUser.auth_token,
                        "Content-Type": "application/x-www-form-urlencoded",
                        Accept: "application/json"
                    }
                }),
                citiesUkr: [],
                citiesRus: [],
                cities: []
            };
        },
        mounted() {
            if (this.sportsmanId !== "") {
                this.$store.state.sportsman = this.$store.state.sportsmanList[
                    this.sportsmanId
                    ];
                this.http
                    .get(`https://champion-api.herokuapp.com/api/sportsman/${this.sportsmanId}`)
                    .then(response => {
                        this.image.sportsmanImageUrl = response.data.documents[0].media.url;
                        this.image.sportsmanImageConnectionId = response.data.documents[0].id;
                    })
                    .catch(error => console.log(error.message));
            } else {
                if (this.personRole === "Coach") {
                    this.role.is_coach = 1;
                } else if (this.personRole === "Referee") {
                    this.role.is_referee = 1;
                }
            }
            citiesUkrainian.region.forEach(region => {
                region.city.forEach(city => {
                    this.citiesUkr.push(city.name);
                });
            });
            citiesRussian.region.forEach(region => {
                region.city.forEach(city => {
                    this.citiesRus.push(city.name);
                });
            });
            if (window.navigator.language === "ru-RU") {
                this.cities = this.citiesRus;
            } else {
                this.cities = this.citiesUkr;
            }
            this.http
                .get(
                    "https://champion-api.herokuapp.com/api/belts/" +
                    this.$store.state.authUser.federation_users[0].federation_id
                )
                .then(response => {
                    window.console.log(response.data);
                    this.belts = response.data;
                })
                .catch(error => window.console.log(error.message));
            this.http
                .get("https://champion-api.herokuapp.com/api/titles/list")
                .then(response => {
                    window.console.log(response.data);
                    this.degrees = response.data;
                })
                .catch(error => window.console.log(error.message));
        },
        methods: {
            onFileChange(e) {
                const files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                this.image.sportsmanImageUrl = '';
                this.image.sportsmanImageForUpload = file;
                this.image.sportsmanImage = new Image();
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.image.sportsmanImage = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            uploadImage() {
                if (this.image.sportsmanImageConnectionId && this.image.sportsmanImageForUpload) {
                    this.removeImage();
                }
                const formData = new FormData();
                formData.append('file', this.image.sportsmanImageForUpload);
                this.httpUpload
                    .post('https://champion-api.herokuapp.com/api/upload', formData)
                    .then(response => {
                        console.log(response.data);
                        this.image.sportsmanImageId = response.data.id;
                    });
            },
            removeImage() {
                this.http
                    .post(`https://champion-api.herokuapp.com/api/sportsman-document/${
                        this.image.sportsmanImageConnectionId}`, {
                        _method: "delete"
                    })
                    .then(response => {
                        console.log('deleted');
                        this.image.sportsmanImageUrl = '';
                        this.image.portsmanImageConnectionId = '';
                        this.image.sportsmanImageId = '';
                    })
                    .catch(error => console.log(error));
            },
            createConnectSportsmanImage(id) {
                this.http
                    .post("https://champion-api.herokuapp.com/api/sportsman-document", {
                        sportsman_id: id,
                        media_id: this.image.sportsmanImageId,
                        name: 1
                    })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => console.log(error.message));
            },
            createSportsman() {
                this.http
                    .post(this.$store.state.postSportsman, this.$store.state.sportsman)
                    .then(response => {
                        console.log(response.data);
                        this.http
                            .post(
                                "https://champion-api.herokuapp.com/api/federation-sportsman",
                                {
                                    sportsman_id: response.data.id,
                                    federation_id: this.$store.state.authUser.federation_users[0].federation_id,
                                    is_active: 1,
                                    is_coach: this.role.is_coach,
                                    is_referee: this.role.is_referee,
                                    federation_belt_id: this.$store.state.sportsman.belt
                                }
                            )
                            .then(response => {
                                console.log(response.data);
                                if (this.image.sportsmanImageId) {
                                    this.createConnectSportsmanImage(response.data.sportsman_id);
                                }
                                this.$emit("clicked");
                            })
                            .catch(error => console.log(error.message));
                    })
                    .catch(error => console.log(error.message));
            },

            createOwnCoachSportsman() {
                this.http
                    .post(this.$store.state.postSportsman, this.$store.state.sportsman)
                    .then(response => {
                        console.log(response.data);
                        this.http
                            .post("https://champion-api.herokuapp.com/api/sportsman-coach", {
                                sportsman_id: response.data.id,
                                coach_id: this.$store.state.authUser.my_profile_id,
                                master_coach: 0
                            })
                            .then(response => {
                                console.log(response.data);
                                if (this.image.sportsmanImageId) {
                                    this.createConnectSportsmanImage(response.data.sportsman_id);
                                }
                                this.http
                                    .post(
                                        "https://champion-api.herokuapp.com/api/federation-sportsman",
                                        {
                                            sportsman_id: response.data.sportsman_id,
                                            federation_id: this.$store.state.authUser
                                                .my_sportsmen_profile.federation_sportsmen[0]
                                                .federation_id,
                                            is_active: 1,
                                            is_coach: 0,
                                            is_referee: 0,
                                            federation_belt_id: this.$store.state.sportsman.belt
                                        }
                                    )
                                    .then(reaponse => {
                                        console.log(reaponse.data);
                                    })
                                    .catch(error => console.log(error.message));
                                this.$emit("clicked");
                            })
                            .catch(error => console.log(error.message));
                    })
                    .catch(error => console.log(error.message));
            },

            updateSportsman() {
                this.$store.state.sportsman._method = "put";
                this.http
                    .post(
                        `https://champion-api.herokuapp.com/api/sportsman/${this.sportsmanId}`,
                        this.$store.state.sportsman
                    )
                    .then(response => {
                        console.log(response.data);
                        if (this.image.sportsmanImageId) {
                            this.createConnectSportsmanImage(this.sportsmanId);
                        }
                        this.$emit("clicked");
                    })
                    .catch(error => console.log(error.message));
            }
        }
    };
</script>

<style scoped lang="scss">
    .popup {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 100vw;
        height: 100vh;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 2;
        overflow: hidden;
        transition: 0.64s ease-in-out;
        &__inner {
            position: relative;
            display: flex;
            align-items: center;
            max-width: 800px;
            max-height: 600px;
            width: 80%;
            height: 80%;
            background-color: #fff;
            transition: 0.64s ease-in-out;
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
