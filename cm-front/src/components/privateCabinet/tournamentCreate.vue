<template>
    <div class="popup">
        <div class="popup__inner">
            <form class="popup__tournament container text-center mt-5">
                <div class="popup__title-wrapper row">
                    <h2 class="popup__title col text-left">Create a New Tournament</h2>
                    <button class="popup__exit btn btn-danger"
                            v-on="$listeners">X
                    </button>
                </div>
                <div class="popup__title-wrapper row">
                    <h3 class="popup__title col text-left">General Info</h3>
                </div>
                <div class="cm-form__wrapper popup__wrapper row">
                    <div class="col-2"><label for="name">Name</label></div>
                    <div class="col-10">
                        <input class="form-control" type="text" id="name"
                               placeholder="Name"
                               autofocus
                               autocomplete="off"
                               v-model="tournament.name"
                               @input="$v.tournament.name.$touch()"
                               @blur="$v.tournament.name.$touch()"
                               :class="{'is-invalid' :$v.tournament.name.$error}">
                        <div class="invalid-feedback" v-if="!$v.tournament.name.minLength">
                            Min length of Name is {{ $v.tournament.name.$params.minLength.min }}. Now it
                            is {{ tournament.name.length }}.
                        </div>
                        <div class="invalid-feedback" v-if="!$v.tournament.name.required">
                            Field is required
                        </div>
                        <div class="invalid-feedback" v-if="!$v.tournament.name.maxLength">
                            Max length of Name is {{ $v.tournament.name.$params.maxLength.max }}.
                        </div>
                    </div>
                </div>
                <div class="cm-form__wrapper row">
                    <div class="col-2"><span>Description</span></div>
                    <div class="col-10">
                    <textarea class="form-control"
                              placeholder="Description"
                              autocomplete="off"
                              v-model="tournament.description"
                              @input="$v.tournament.description.$touch()"
                              @blur="$v.tournament.description.$touch()"
                              :class="{'is-invalid' :$v.tournament.description.$error}"></textarea>
                        <div class="invalid-feedback" v-if="!$v.tournament.description.minLength">
                            Min length of Description is {{ $v.tournament.description.$params.minLength.min }}. Now it
                            is {{ tournament.description.length }}.
                        </div>
                        <div class="invalid-feedback" v-if="!$v.tournament.description.required">
                            Field is required
                        </div>
                        <div class="invalid-feedback" v-if="!$v.tournament.description.maxLength">
                            Max length of Description is {{ $v.tournament.description.$params.maxLength.max }}.
                        </div>
                    </div>
                </div>
                <div class="popup__wrapper mt-1 row">
                    <div class="col-2 text-left"><span>Tournament banner</span></div>
                    <div class="col-10" style="display: flex; flex-direction: column; align-items: center;">
                        <img v-if="tournament.imageUrl"
                             :src="tournament.imageUrl"
                             width="150px"
                             alt="tournament foto"
                             class="popup__foto"
                             :class="{'is-invalid' :$v.tournament.description.$error}">
                        <img v-else-if="tournamentImage"
                             :src="tournamentImage"
                             width="150px"
                             alt="tournament foto"
                             class="popup__foto"
                             :class="{'is-invalid' :$v.tournament.imageUrl.$error}">
                        <div class="invalid-feedback" v-if="!$v.tournament.imageUrl.required">
                            Field is required
                        </div>
                        <div class="invalid-feedback" v-if="!$v.tournament.imageUrl.url">
                            Field mast be url
                        </div>
                    </div>
                </div>
                <div class="popup__wrapper mt-1 row">
                    <div class="col-2"></div>
                    <div class="col-10">
                        <label class="btn btn-outline-success btn-sm mt-3 mr-3"
                               for="photo" style="cursor: pointer; margin-bottom: 0;">
                                Choose photo
                        </label>
                        <input type="file"
                               @change="onFileChange"
                               name="photo" id="photo"
                               style="display: none">
                        <button
                                v-if="tournamentImage"
                                class="btn btn-outline-success btn-sm mt-3 mr-3"
                                @click.prevent="uploadImage">Upload</button>
                        <button
                                v-if="tournament.imageUrl"
                                class="btn btn-outline-danger btn-sm mt-3"
                                @click.prevent="removeImage">Remove</button>
                        <span v-if="isUploaded" class="badge badge-success mt-3 ml-2">Uploaded!</span>
                    </div>
                </div>
                <div class="cm-form__wrapper">
                    <div class="row align-items-end">
                        <div class="col align-self-center">
                            <label class="cm-form__label" for="dateStart">Dates</label>
                        </div>
                        <div class="col">
                            <span>From </span>
                            <input class="form-control" type="date" name="dateStart" id="dateStart"
                                   title="Date of Start"
                                   v-model="tournament.dates.dateStart"
                                   @input="$v.tournament.dates.dateStart.$touch()"
                                   @blur="$v.tournament.dates.dateStart.$touch()"
                                   :class="{'is-invalid' :$v.tournament.dates.dateStart.$error}">
                            <div class="invalid-feedback" v-if="!$v.tournament.dates.dateStart.required">
                                Date of Start field is required
                            </div>
                            <div class="invalid-feedback"
                                 v-if="!$v.tournament.dates.dateStart.checkDataBiggerNow">
                                Date of Start mast be bigger now, check Date
                            </div>
                        </div>
                        <div class="col">
                            <span>To </span>
                            <input class="form-control" type="date" name="dateEnd" id="dateEnd"
                                   title="Date of End"
                                   v-model="tournament.dates.dateEnd"
                                   @input="$v.tournament.dates.dateEnd.$touch()"
                                   @blur="$v.tournament.dates.dateEnd.$touch()"
                                   :class="{'is-invalid' :$v.tournament.dates.dateEnd.$error}">
                            <div class="invalid-feedback" v-if="!$v.tournament.dates.dateEnd.required">
                                Date of End field is required
                            </div>
                            <div class="invalid-feedback"
                                 v-if="!$v.tournament.dates.dateEnd.checkDataBiggerStart">
                                Date of End mast be bigger Date of Start, check Date
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cm-form__wrapper popup__wrapper row">
                    <div class="col-2"><label for="quantityRings">Quantity Rings</label></div>
                    <div class="col-10">
                        <input class="form-control" type="text" id="quantityRings"
                               placeholder="Quantity Rings"
                               autocomplete="off"
                               v-model="tournament.quantityRings"
                               @input="$v.tournament.quantityRings.$touch()"
                               @blur="$v.tournament.quantityRings.$touch()"
                               :class="{'is-invalid' :$v.tournament.quantityRings.$error}">
                        <div class="invalid-feedback" v-if="!$v.tournament.quantityRings.numeric">
                            Field for only numeric characters
                        </div>
                        <div class="invalid-feedback" v-if="!$v.tournament.quantityRings.required">
                            Field is required
                        </div>
                        <div class="invalid-feedback" v-if="!$v.tournament.quantityRings.maxValue">
                            Field is maxValue 100
                        </div>
                        <div class="invalid-feedback" v-if="!$v.tournament.quantityRings.minValue">
                            Field is minValue 1
                        </div>
                    </div>
                </div>
                <div class="cm-form__wrapper popup__wrapper row">
                    <div class="col-2"><label for="location">Location</label></div>
                    <div class="col-10">
                        <input class="form-control" type="text" id="location"
                               placeholder="Location"
                               autocomplete="off"
                               v-model="tournament.location"
                               @input="$v.tournament.location.$touch()"
                               @blur="$v.tournament.location.$touch()"
                               :class="{'is-invalid' :$v.tournament.location.$error}">
                        <div class="invalid-feedback" v-if="!$v.tournament.location.required">
                            Field is required
                        </div>
                    </div>
                </div>
                <div class="cm-form__wrapper popup__wrapper row">
                    <div class="col-2"><label for="location">Max participants</label></div>
                    <div class="col-10">
                        <input class="form-control" type="text" id="maxParticipants"
                               placeholder="Max participants"
                               autocomplete="off"
                               v-model="tournament.maxParticipants"
                               @input="$v.tournament.maxParticipants.$touch()"
                               @blur="$v.tournament.maxParticipants.$touch()"
                               :class="{'is-invalid' :$v.tournament.maxParticipants.$error}">
                        <div class="invalid-feedback" v-if="!$v.tournament.maxParticipants.numeric">
                            Field for only numeric characters
                        </div>
                        <div class="invalid-feedback" v-if="!$v.tournament.maxParticipants.required">
                            Field is required
                        </div>
                        <div class="invalid-feedback" v-if="!$v.tournament.maxParticipants.maxValue">
                            Field is maxValue 100
                        </div>
                        <div class="invalid-feedback" v-if="!$v.tournament.maxParticipants.minValue">
                            Field is minValue 1
                        </div>
                    </div>
                </div>
                <div class="popup__title-wrapper row mt-3">
                    <h3 class="popup__title col-8 text-left">Categories</h3>
                    <div class="col-4 text-right">
                        <button class="btn btn-outline-success" @click.prevent="addNewCategory"
                        >Add age category</button>
                    </div>
                </div>
                <div class="popup__title-wrapper category-wrapper container mt-3"
                     v-for="(category, key) in tournament.categories">
                    <div class="form-group row">
                        <label for="catName" class="col-2 col-form-label"> Category</label>
                        <div class="col-2"><input class="form-control" type="text" id="catName"
                                                  placeholder="Name"
                                                  autocomplete="off"
                                                  v-model="category.name">
                        </div>
                        <label for="catName" class="col-1 col-form-label">Age:</label>
                        <label class="col-1 col-form-label" for="catAgeFrom">from</label>
                        <div class="col-2">
                            <input class="form-control" id="catAgeFrom"
                                   type="text"
                                   placeholder="year"
                                   autocomplete="off"
                                   v-model="category.ageFrom">
                        </div>
                        <label class="col-1 col-form-label" for="catAgeTo">to</label>
                        <div class="col-2">
                            <input class="form-control" id="catAgeTo"
                                   type="text"
                                   placeholder="year"
                                   autocomplete="off"
                                   v-model="category.ageTo">
                        </div>
                        <div class="col-1">
                            <button class="btn btn-outline-danger"
                                    @click.prevent="removeCategory(key)"><b>X</b></button>
                        </div>
                    </div>
                    <div class="cat__row row mt-3">
                        <div class="col-12">
                            <div class="row">
                                <span class="col-8 mr-1 ml-2">Male:</span>
                                <button class="btn btn-sm btn-outline-success ml-2"
                                        @click.prevent="addWeightCategory(key, 'male')">
                                    Add weight category
                                </button>
                            </div>
                            <div class="row">
                                <div v-model="category.male" class="col-3 mt-2" v-for="(weightCategory, weightKey) in category.male">
                                    <input class="form-control form-control-sm col-6 p-1" type="text"
                                           style="display: inline;"
                                           placeholder="weight"
                                           autocomplete="off"
                                           v-model="weightCategory.weight">
                                    <button class="btn btn-sm btn-outline-danger ml-2"
                                            @click.prevent="removeWeightCategory(key, 'male', weightKey)">
                                        <b>X</b>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cat__row row mt-3">
                        <div class="col-12">
                            <div class="row mb-2">
                                <span class="col-8 mr-1 ml-2">Female:</span>
                                <button class="btn btn-sm btn-outline-success ml-2"
                                        @click.prevent="addWeightCategory(key, 'female')">
                                    Add weight category
                                </button>
                            </div>
                            <div class="row">
                                <div class="col-3 mb-2" v-for="(weightCategory, weightKey) in category.female">
                                    <input class="form-control form-control-sm col-6 p-1" type="text"
                                           style="display: inline;"
                                           placeholder="weight"
                                           autocomplete="off"
                                           v-model="weightCategory.weight">
                                    <button class="btn btn-sm btn-outline-danger ml-2"
                                            @click.prevent="removeWeightCategory(key, 'female', weightKey)">
                                        <b>X</b>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="popup__title-wrapper row mt-3">
                    <h3 class="popup__title col text-left">Referees</h3>
                    <multiselect
                            id="sportsman"
                            v-model="value"
                            :options="options"
                            :multiple="true"
                            :close-on-select="true"
                            :clear-on-select="false"
                            :hide-selected="true"
                            :preserve-search="true"
                            placeholder="Choose referee"
                            label="last_name"
                            track-by="id"
                            :preselect-first="true">
                        <template slot="tag" slot-scope="props">
                                <span class="custom__tag">
                                    <!-- option === coach -->
                                    <span>{{ props.option.first_name }} {{ props.option.last_name }}</span>
                                    <span class="custom__remove" @click="props.remove(props.option)">❌</span>
                                </span>
                        </template>
                    </multiselect>
                </div>
                <div class="row text-right">
                    <div class="col-12 text-right mb-5">
                        <button v-if="tournamentKey" class="popup__save btn btn-success mt-3"
                                style="margin-right: 10px;"
                                @click.prevent="saveTournament">Save tournament
                        </button>
                        <button v-else class="popup__save btn btn-success mt-3"
                                style="margin-right: 10px;"
                                @click.prevent="createTournament">Create tournament
                        </button>
                        <button class="popup__save btn btn-success mt-3"
                                v-on="$listeners">Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import * as firebase from "firebase";
import Multiselect from "vue-multiselect";
import {
  required,
  minLength,
  maxLength,
  maxValue,
  minValue,
  numeric,
  url,
  helpers,
  alpha,
  alphaNum
} from "vuelidate/lib/validators";
export default {
  name: "tournament-create",
  components: {
    Multiselect
  },
  props: ["tournamentKey"],
  data: function() {
    return {
      federationId: "",
      tournament: {
        name: "",
        description: "",
        imageUrl: "",
        dates: {
          dateStart: "",
          dateEnd: ""
        },
        quantityRings: "",
        location: "",
        maxParticipants: "",
        amountOfParticipants: 0,
        isStarted: false,
        isFinished: false,
        categories: []
      },
      tournamentImageForUpload: "",
      tournamentImage: "",
      isUploaded: false,
      options: [],
      value: [],
      http: axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.authUser.auth_token,
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE"
        }
      }),
      httpUpload: axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.authUser.auth_token,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        }
      })
    };
  },
  validations: {
    referees: {
      checkRefereesLength: function() {
        return !!this.referees.length;
      }
    },
    tournament: {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(32)
      },
      description: {
        required,
        minLength: minLength(100),
        maxLength: maxLength(300)
      },
      imageUrl: {
        url,
        required
      },
      dates: {
        dateStart: {
          required,
          checkDataBiggerNow: val => {
            if (val == "") {
              return true;
            }
            var today = new Date(); // сегодняшнеяя дата и время
            var inputDate = new Date(val);
            if (today <= inputDate) {
              return true;
            } else {
              return false;
            }
          }
        },
        dateEnd: {
          required,
          checkDataBiggerStart: function() {
            if (
              this.tournament.dates.dateEnd > this.tournament.dates.dateStart
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      },
      quantityRings: {
        numeric,
        required,
        maxValue: maxValue(100),
        minValue: minValue(1)
      },
      location: {
        required
      },
      maxParticipants: {
        numeric,
        required,
        maxValue: maxValue(100),
        minValue: minValue(1)
      }
    }
  },
  mounted() {
    this.federationId = this.$store.state.authUser.federation_users[0].federation_id;
    if (this.tournamentKey) {
      this.tournament = this.$store.state.tournamentsList[this.tournamentKey];
      if (this.$store.state.tournamentsList[this.tournamentKey].referees) {
        this.value = this.$store.state.tournamentsList[
          this.tournamentKey
        ].referees;
      }
    }
    axios
      .get(
          `https://champion-api.herokuapp.com/api/sportsman-list/by-federation/${
          this.federationId
        }/20`
      )
      .then(response => {
        if (response.status === 200) {
          this.options = response.data.data;
        }
      })
      .catch(error => window.console.log(error));
  },
  methods: {
    checkName(value) {
      console.log(value.length < 2 || value.length > 32);
      return value.length < 2 || value.length > 32;
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      this.tournamentImageForUpload = file;
      this.tournamentImage = new Image();
      const reader = new FileReader();
      reader.onload = e => {
        this.tournamentImage = e.target.result;
      };
      reader.readAsDataURL(file);
      this.isUploaded = false;
    },
    uploadImage() {
      const formData = new FormData();
      formData.append("file", this.tournamentImageForUpload);
      this.httpUpload
        .post("https://champion-api.herokuapp.com/api/upload", formData)
        .then(response => {
          console.log(response.data);
          this.tournament.imageUrl = response.data.url;
          this.isUploaded = true;
          console.log(this.tournament.imageUrl);
        });
    },
    removeImage() {
      this.tournamentImage = "";
      this.tournament.imageUrl = "";
      this.isUploaded = false;
    },
    addNewCategory() {
      if (this.tournament.hasOwnProperty("categories") === false) {
        this.$set(this.tournament, "categories", []);
      }
      this.tournament.categories.push({
        name: "",
        ageFrom: "",
        ageTo: "",
        male: [],
        female: []
      });
    },
    removeCategory(key) {
      this.tournament.categories.splice(key, 1);
    },
    addWeightCategory(key, gender) {
      const weightCategory = {
        weight: ""
      };
      if (gender === "male") {
        if (this.tournament.categories[key].hasOwnProperty("male") === false) {
          this.$set(this.tournament.categories[key], "male", []);
        }
        this.tournament.categories[key].male.push(weightCategory);
      } else if (gender === "female") {
        if (
          this.tournament.categories[key].hasOwnProperty("female") === false
        ) {
          this.$set(this.tournament.categories[key], "female", []);
        }
        this.tournament.categories[key].female.push(weightCategory);
      }
    },
    removeWeightCategory(key, gender, weightKey) {
      if (gender === "male") {
        this.tournament.categories[key].male.splice(weightKey, 1);
      } else if (gender === "female") {
        this.tournament.categories[key].female.splice(weightKey, 1);
      }
    },
    async createTournament() {
      this.tournament.referees = this.value;
      if (this.tournamentImageForUpload) {
        this.uploadImage();
      }
      try {
        await firebase
          .database()
          .ref(this.federationId)
          .push(this.tournament);
      } catch (error) {
        throw error;
      }
      this.$emit("clicked");
    },
    async saveTournament() {
      this.tournament.referees = this.value;
      if (this.tournamentImageForUpload) {
        this.uploadImage();
      }
      try {
        await firebase
          .database()
          .ref(this.federationId)
          .child(this.tournamentKey)
          .update(this.tournament);
      } catch (error) {
        throw error;
      }
      this.$emit("clicked");
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
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
  &__tournament {
    flex-direction: column;
    justify-content: center;
    width: 90%;
    height: 90%;
    padding: 1rem;
  }
}

.category-wrapper {
  border-bottom: 1px solid #dee2e6;
  /*height: 100px;*/
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
