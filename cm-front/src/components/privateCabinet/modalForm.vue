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
                            v-on="$listeners">X
                    </button>
                </div>
                <div class="popup__wrapper mt-1 row">
                    <div class="col-12" style="display: flex; flex-direction: column; align-items: center;">
                        <img v-if="$store.state.sportsman.photo_id"
                             :src="$store.state.sportsman.photo.url"
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
                                @click.prevent="uploadImage">Upload
                        </button>
                        <button
                                v-if="$store.state.sportsman.photo_id"
                                class="btn btn-outline-danger btn-sm mt-3"
                                @click.prevent="removeImage">Remove
                        </button>
                        <span v-if="image.isUploaded"
                              class="badge badge-success mt-3">Uploaded!
                        </span>
                    </div>
                </div>
                <div class="cm-form__wrapper popup__wrapper">
                    <input class="form-control" type="text"
                           placeholder="Name"
                           autofocus required
                           autocomplete="off"
                           v-model="$store.state.sportsman.first_name"
                           @input="setName($event.target.value)"
                           @blur="setName($event.target.value)"
                           :class="{'is-invalid' :$v.tempSportsmanForValidations.name.$error}">
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.name.minLength">
                        Min length of Name is {{ $v.tempSportsmanForValidations.name.$params.minLength.min }}. Now it
                        is {{ tempSportsmanForValidations.name.length }}.
                    </div>
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.name.maxLength">
                        Max length of Name is {{ $v.tempSportsmanForValidations.name.$params.maxLength.max }}.
                    </div>
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.name.required">
                        Field is required
                    </div>
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.name.alpha">
                        Field for only alphabet characters
                    </div>
                </div>
                <div class="cm-form__wrapper">
                    <input class="form-control" type="text"
                           placeholder="Surname" required
                           autocomplete="off"
                           v-model="$store.state.sportsman.last_name"
                           @input="setSurname($event.target.value)"
                           @blur="setSurname($event.target.value)"
                           :class="{'is-invalid' :$v.tempSportsmanForValidations.surname.$error}">
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.surname.minLength">
                        Min length of Name is {{ $v.tempSportsmanForValidations.surname.$params.minLength.min }}. Now it
                        is {{ tempSportsmanForValidations.surname.length }}.
                    </div>
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.surname.maxLength">
                        Max length of Surname is {{ $v.tempSportsmanForValidations.surname.$params.maxLength.max }}.
                    </div>
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.surname.required">
                        Field is required
                    </div>
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.surname.alpha">
                        Field for only alphabet characters
                    </div>
                </div>
                <div class="cm-form__wrapper">
                    <input class="form-control" type="text"
                           placeholder="Patronymic"
                           autocomplete="off" required
                           v-model="$store.state.sportsman.patronymic_name"
                           @input="setPatronymic($event.target.value)"
                           @blur="setPatronymic($event.target.value)"
                           :class="{'is-invalid' :$v.tempSportsmanForValidations.patronymic.$error}">
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.patronymic.minLength">
                        Min length of Name is {{ $v.tempSportsmanForValidations.patronymic.$params.minLength.min }}. Now
                        it
                        is {{ tempSportsmanForValidations.patronymic.length }}.
                    </div>
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.patronymic.maxLength">
                        Max length of Patronymic is {{ $v.tempSportsmanForValidations.patronymic.$params.maxLength.max }}.
                    </div>
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.patronymic.required">
                        Field is required
                    </div>
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.patronymic.alpha">
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
                                   title="Date of Birth" required
                                   v-model="$store.state.sportsman.date_of_birth"
                                   @input="setDateOfBirth($event.target.value)"
                                   @blur="setDateOfBirth($event.target.value)"
                                   :class="{'is-invalid' :$v.tempSportsmanForValidations.dateOfBirth.$error}">
                            <div class="invalid-feedback"
                                 v-if="!$v.tempSportsmanForValidations.dateOfBirth.required">
                                Date of Birth field is required
                            </div>
                            <div class="invalid-feedback"
                                 v-if="!$v.tempSportsmanForValidations.dateOfBirth.checkFutureData">
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
                                v-model="$store.state.sportsman.title">
                            <option v-for="degree in degrees"
                                    v-bind:value="degree.title"
                                    :key="degree.id">{{degree.title}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="cm-form__wrapper">
                    <input class="form-control" type="text"
                           placeholder="Weight"
                           autocomplete="off"
                           v-model="$store.state.sportsman.weight"
                           @input="setWeight($event.target.value)"
                           @blur="setWeight($event.target.value)"
                           :class="{'is-invalid' :$v.tempSportsmanForValidations.weight.$error}">
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.weight.checkNumeric">
                        Field for only numeric characters
                    </div>
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.weight.required">
                        Field is required
                    </div>
                    <div class="invalid-feedback" v-if="!$v.tempSportsmanForValidations.weight.maxValue">
                        Field is maxValue 500 kg
                    </div>
                </div>
                <div class="cm-form__wrapper">

                    <autocomplete-city
                            v-bind:cities="cities"
                    ></autocomplete-city>
                </div>
                <div class="cm-form__wrapper">
                    <!--<input class="form-control" type="text"-->
                           <!--placeholder="Coaches"-->
                           <!--autocomplete="off"-->
                           <!--v-model="$store.state.sportsman.coaches">-->

                    <multiselect id = "coach"
                                 v-model = "$store.state.sportsman.coaches"
                                 :options = "options"
                                 :multiple = "true"
                                 :close-on-select = "true"
                                 :clear-on-select = "false"
                                 :hide-selected = "true"
                                 :preserve-search = "true"
                                 placeholder = "Choose sportsman coach"
                                 label = "last_name"
                                 track-by = "id"
                                 :preselect-first = "true"
                    >
                    <template slot = "tag" slot-scope = "props">
                        <span class = "custom__tag">
                            <!-- option === coach -->
                            <span>{{ props.option.last_name }}</span>
                            <span class = "custom__remove" @click = "props.remove(props.option)">❌</span>
                        </span>
                    </template>
                    </multiselect>
                </div>
                <div class="popup__wrapper mt-1 row">
                    <div class="col-12" style="display: flex; flex-direction: column; align-items: center;">
                        <div>
                            <label class="cm-form__label">Documents</label>
                        </div>
                        <div class="mb-3" v-if="documents.list">
                            <div v-for="document in documents.list" style="display: inline;">
                                <img :src="document.media.url"
                                     width="150px"
                                     alt="Sportsman document"
                                     class="popup__photo mt-2 mr-2 ml-2"
                                    style="display: inline;">
                                <button
                                    class="btn btn-outline-danger btn-sm"
                                    @click.prevent="removeDocument(document.id)">X</button>
                            </div>
                        </div>
                        <img v-if="documents.chosenDocument"
                             :src="documents.chosenDocument"
                             width="150px"
                             alt="Sportsman document mt-3"
                             class="popup__photo ">
                    </div>
                </div>
                <div class="popup__wrapper mt-1 row">
                    <div class="col-12">
                        <label class="btn btn-outline-success btn-sm mt-3 mr-3"
                               for="document" style="cursor: pointer; margin-bottom: 0;">
                            Choose document
                        </label>
                        <input type="file"
                               @change="onDocumentChange"
                               name="photo" id="document"
                               style="display: none">
                        <button
                                v-if="documents.chosenDocument"
                                class="btn btn-outline-success btn-sm mt-3 mr-3"
                                @click.prevent="uploadDocument">Upload</button>
                        <span v-if="documents.isUploaded" class="badge badge-success mt-3">Uploaded!</span>
                    </div>
                </div>
                <hr>
                <section class="popup__sertificates">
                    <!--<userCertificates></userCertificates>-->
                </section>
                <button v-if="personRole === 'OwnCoachSportsman' && sportsmanId === ''"
                        class="popup__save btn btn-success mt-3 mb-5"
                        @click.prevent="createOwnCoachSportsman"
                        v-bind:disabled="testForClick || testInitValues"
                        v-bind:class="{'disabled': testInitValues ||
                        $v.tempSportsmanForValidations.name.$error ||
                        $v.tempSportsmanForValidations.surname.$error ||
                        $v.tempSportsmanForValidations.patronymic.$error ||
                        $v.tempSportsmanForValidations.dateOfBirth.$error ||
                        $v.tempSportsmanForValidations.weight.$error}">Create
                </button>
                <button v-else-if="sportsmanId === ''" class="popup__save btn btn-success mt-3 mb-5"
                        @click.prevent="createSportsman"
                        v-bind:disabled="testForClick || testInitValues"
                        v-bind:class="{'disabled': testInitValues ||
                        $v.tempSportsmanForValidations.name.$error ||
                        $v.tempSportsmanForValidations.surname.$error ||
                        $v.tempSportsmanForValidations.patronymic.$error ||
                        $v.tempSportsmanForValidations.dateOfBirth.$error ||
                        $v.tempSportsmanForValidations.weight.$error}">
                    Create
                </button>
                <button v-else-if="personRole === 'OwnCoachSportsman' && sportsmanId !== ''"
                        class="popup__save btn btn-success mt-3 mb-5"
                        @click.prevent="updateSportsman"
                        v-bind:disabled="testForClick"
                        v-bind:class="{'disabled':
                        $v.tempSportsmanForValidations.name.$error ||
                        $v.tempSportsmanForValidations.surname.$error ||
                        $v.tempSportsmanForValidations.patronymic.$error ||
                        $v.tempSportsmanForValidations.dateOfBirth.$error ||
                        $v.tempSportsmanForValidations.weight.$error}">Save
                </button>
                <button v-else-if="sportsmanId !== ''" class="popup__save btn btn-success mt-3 mb-5"
                        @click.prevent="updateSportsman"
                        v-bind:disabled="testForClick"
                        v-bind:class="{'disabled':
                        $v.tempSportsmanForValidations.name.$error ||
                        $v.tempSportsmanForValidations.surname.$error ||
                        $v.tempSportsmanForValidations.patronymic.$error ||
                        $v.tempSportsmanForValidations.dateOfBirth.$error ||
                        $v.tempSportsmanForValidations.weight.$error}">Save
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
import citiesEnglish from "../../assets/citiesEnglish";
import {
  required,
  minLength,
  maxLength,
  maxValue,
  alpha
} from "vuelidate/lib/validators";
import Multiselect from 'vue-multiselect'


export default {
  name: "modal-form",
  components: {
    // userCertificates,
    AutocompleteCity,
    Multiselect
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
        sportsmanImageForUpload: "",
        sportsmanImage: "",
        sportsmanImageId: "",
        isUploaded: false
      },
      documents: {
        list: [],
        documentForUpload: "",
        chosenDocument: "",
        documentId: "",
        isUploaded: false
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
      citiesEng: [],
      cities: [],
      tempSportsmanForValidations: {
        weight: "",
        dateOfBirth: "",
        name: "",
        surname: "",
        patronymic: ""
      },
      options: [],
        my_coaches: []
    };
  },

  computed: {
    testForClick: function() {
      if (
        this.$v.tempSportsmanForValidations.name.$error ||
        this.$v.tempSportsmanForValidations.surname.$error ||
        this.$v.tempSportsmanForValidations.patronymic.$error ||
        this.$v.tempSportsmanForValidations.dateOfBirth.$error ||
        this.$v.tempSportsmanForValidations.weight.$error
      ) {
        return true;
      } else {
        return false;
      }
    },
    testInitValues: function() {
      if (
        this.tempSportsmanForValidations.weight === "" ||
        this.tempSportsmanForValidations.dateOfBirth === "" ||
        this.tempSportsmanForValidations.name === "" ||
        this.tempSportsmanForValidations.surname === "" ||
        this.tempSportsmanForValidations.patronymic === ""
      ) {
        return true;
      } else {
        return false;
      }
    }
},
  mounted() {
    if (this.sportsmanId !== "") {
      this.$store.state.sportsman = this.$store.state.sportsmanList[
        this.sportsmanId
      ];
      this.updateDocuments();
    } else {
      if (this.personRole === "Coach") {
        this.role.is_coach = 1;
      } else if (this.personRole === "Referee") {
        this.role.is_referee = 1;
      }
    }
    // citiesUkrainian.region.forEach(region => {
    //     region.city.forEach(city => {
    //         this.citiesUkr.push(city.name);
    //     });
    // });
    // citiesRussian.region.forEach(region => {
    //     region.city.forEach(city => {
    //         this.citiesRus.push(city.name);
    //     });
    // });
    citiesEnglish.region.forEach(region => {
      region.city.forEach(city => {
        this.cities.push(city.name);
      });
    });
      if (this.$store.state.role === 'coach') {
          this.http
              .get(
                  "https://champion-api.herokuapp.com/api/belts/" +
                  this.$store.state.authUser.my_sportsmen_profile.federation_sportsmen[0].federation_id
              )
              .then(response => {
                  window.console.log(response.data);
                  this.belts = response.data;
              })
              .catch(error => window.console.log(error.message));
      } else {
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
      }
    this.http
      .get("https://champion-api.herokuapp.com/api/titles/list")
      .then(response => {
        window.console.log(response.data);
        this.degrees = response.data;
      })
      .catch(error => window.console.log(error.message));
      this.$store.state.sportsman.coaches = []; //clearing list of coaches
      if (this.$store.state.role === 'coach') {
          axios
              .get(
                  `https://champion-api.herokuapp.com/api/coach-list/by-federation/${
                      this.$store.state.authUser.my_sportsmen_profile.federation_sportsmen[0].federation_id
                      }`
              )
              .then(response => {
                  if (response.status === 200) {
                      this.options = response.data;
                      window.console.log(this.options);
                  }
              })
              .catch(function (error) {
                  window.console.log(error);
              });
      } else {
          axios
              .get(
                  `https://champion-api.herokuapp.com/api/coach-list/by-federation/${
                      this.$store.state.federationInfo.id
                      }`
              )
              .then(response => {
                  if (response.status === 200) {
                      this.options = response.data;
                      window.console.log(this.options);
                  }
              })
              .catch(function (error) {
                  window.console.log(error);
              });
      }

  },
  methods: {
    setWeight(value) {
      window.console.log(value);
      this.tempSportsmanForValidations.weight = value;
      this.$v.tempSportsmanForValidations.weight.$touch();
    },
    setDateOfBirth(value) {
      window.console.log(value);
      this.tempSportsmanForValidations.dateOfBirth = value;
      this.$v.tempSportsmanForValidations.dateOfBirth.$touch();
    },
    setName(value) {
      window.console.log(value);
      this.tempSportsmanForValidations.name = value;
      this.$v.tempSportsmanForValidations.name.$touch();
    },
    setSurname(value) {
      window.console.log(value);
      this.tempSportsmanForValidations.surname = value;
      this.$v.tempSportsmanForValidations.surname.$touch();
    },
    setPatronymic(value) {
      window.console.log(value);
      this.tempSportsmanForValidations.patronymic = value;
      this.$v.tempSportsmanForValidations.patronymic.$touch();
    },
    updateDocuments() {
      this.http
        .get(
          `https://champion-api.herokuapp.com/api/sportsman/${this.sportsmanId}`
        )
        .then(response => {
          if (response.data.documents) {
            this.documents.list = response.data.documents;
          }
        })
        .catch(error => console.log(error.message));
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    onDocumentChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createDocument(files[0]);
    },
    createImage(file) {
      if (this.$store.state.sportsman.photo_id) {
        this.$store.state.sportsman.photo_id = "";
      }
      this.image.sportsmanImageForUpload = file;
      this.image.sportsmanImage = new Image();
      const reader = new FileReader();
      reader.onload = e => {
        this.image.sportsmanImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    createDocument(file) {
      this.documents.documentForUpload = file;
      this.documents.chosenDocument = new Image();
      const reader = new FileReader();
      reader.onload = e => {
        this.documents.chosenDocument = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    uploadImage() {
      const formData = new FormData();
      formData.append("file", this.image.sportsmanImageForUpload);
      this.httpUpload
        .post("https://champion-api.herokuapp.com/api/upload", formData)
        .then(response => {
          console.log(response.data);
          this.image.sportsmanImageId = response.data.id;
          this.image.isUploaded = true;
        });
    },
    uploadDocument() {
      const formData = new FormData();
      formData.append("file", this.documents.documentForUpload);
      this.httpUpload
        .post("https://champion-api.herokuapp.com/api/upload", formData)
        .then(response => {
          console.log(response.data);
          this.documents.documentId = response.data.id;
          this.documents.isUploaded = true;
        });
    },
    removeImage() {
      this.$store.state.sportsman._method = "put";
      this.$store.state.sportsman.photo_id = "";
      this.http
        .post(
          `https://champion-api.herokuapp.com/api/sportsman/${
            this.sportsmanId
          }`,
          this.$store.state.sportsman
        )
        .then(response => console.log(response.data))
        .catch(error => console.log(error.message));
    },
    removeDocument(id) {
      this.http
        .post(
          `https://champion-api.herokuapp.com/api/sportsman-document/${id}`,
          {
            _method: "delete"
          }
        )
        .then(response => {
          console.log("deleted");
          this.updateDocuments();
        })
        .catch(error => console.log(error));
    },
    createImageConnection(sportsmanId) {
      this.$store.state.sportsman._method = "put";
      this.$store.state.sportsman.photo_id = this.image.sportsmanImageId;
      this.http
        .post(
          `https://champion-api.herokuapp.com/api/sportsman/${sportsmanId}`,
          this.$store.state.sportsman
        )
        .then(response => console.log(response.data))
        .catch(error => console.log(error.message));
    },
    createDocumentConnection(id) {
      this.http
        .post("https://champion-api.herokuapp.com/api/sportsman-document", {
          sportsman_id: id,
          media_id: this.documents.documentId,
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
                federation_id: this.$store.state.authUser.federation_users[0]
                  .federation_id,
                is_active: 1,
                is_coach: this.role.is_coach,
                is_referee: this.role.is_referee,
                federation_belt_id: this.$store.state.sportsman.belt,
                  title: this.$store.state.sportsman.title
              }
            )
            .then(response => {
              console.log(response.data);
                if (this.image.sportsmanImageId) {
                this.createImageConnection(response.data.sportsman_id);
              }
              if (this.documents.documentId) {
                this.createDocumentConnection(response.data.sportsman_id);
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
                this.createImageConnection(response.data.sportsman_id);
              }
              if (this.documents.documentId) {
                this.createDocumentConnection(response.data.sportsman_id);
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
                      federation_belt_id: this.$store.state.sportsman.belt,
                      title: this.$store.state.sportsman.title
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
          `https://champion-api.herokuapp.com/api/sportsman/${
            this.sportsmanId
          }`,
          this.$store.state.sportsman
        )
        .then(response => {
          console.log(response.data);
          if (this.image.sportsmanImageId) {
            this.createImageConnection(this.sportsmanId);
          }
          if (this.documents.documentId) {
            this.createDocumentConnection(this.sportsmanId);
          }
          this.$emit("clicked");
        })
        .catch(error => console.log(error.message));
    }
  },
  validations: {
    tempSportsmanForValidations: {
      weight: {
        checkNumeric: val => {
          return !isNaN(parseFloat(val)) && isFinite(val) ? true : false;
        },
        required: required,
        maxValue: maxValue(500)
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
      },
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
      }
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
