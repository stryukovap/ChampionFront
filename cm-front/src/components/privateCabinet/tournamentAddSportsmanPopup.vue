<template>
    <div class="popup">
        <div class="popup__inner">
            <form class="popup__tournament container text-center mt-5">
                <div class="popup__title-wrapper row">
                    <h2 class="popup__title col text-left">Add sportsmen</h2>
                    <button class="popup__exit btn btn-danger mr-3"
                            v-on="$listeners">X
                    </button>
                </div>
                <div class="cm-form__wrapper popup__wrapper row">
                    <div class="col-10">
                        <multiselect
                                id="sportsman"
                                v-model="value"
                                :options="options"
                                :multiple="true"
                                :close-on-select="true"
                                :clear-on-select="false"
                                :hide-selected="true"
                                :preserve-search="true"
                                placeholder="Choose sportsman"
                                label="fullname"
                                track-by="sportsman"
                                :preselect-first="true">
                            <template slot="tag" slot-scope="props">
                                <span class="custom__tag">
                                    <!-- option === coach -->
                                    <span>{{ props.option.fullname }}</span>
                                    <span class="custom__remove" @click="props.remove(props.option)">❌</span>
                                </span>
                            </template>
                        </multiselect>
                    </div>
                </div>
                <div class="alert alert-danger mt-3" v-if="errorMessage">
                    The amount of Participants is bigger than expected!
                </div>
                <div class="row">
                    <div class="col text-right mb-5" style="padding-top: 100px">
                        <button class="popup__save btn btn-success mt-3"
                                style="margin-right: 10px;"
                                @click.prevent="saveSportsmen">Save
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

// <<<<<<< HEAD
// export default {
//   name: "tournament-add-sportsman",
//   components: {
//     Multiselect
//   },
//   props: ["tournamentKey"],
//   data: function() {
//     return {
//       federationId: "",
//       options: [],
//       value: []
//     };
//   },
//   mounted() {
// this.federationId = this.$store.state.authUser.federation_users[0].federation_id;
// if ("sportsmen" in this.$store.state.tournamentsList[this.tournamentKey]) {
//   this.value = this.$store.state.tournamentsList[
//     this.tournamentKey
//   ].sportsmen;
// }
// axios
//   .get(
//     `http://champion-api.herokuapp.com/api/sportsman-list/by-federation/${
//       this.federationId
//     }/20`
//   )
//   .then(response => {
//     if (response.status === 200) {
//       response.data.data.forEach(item => {
//         let sportsman = {
//           sportsman: item,
//           fullname: `${item.first_name} ${item.last_name}`,
//           isPermit: false
//         };
//         this.options.push(sportsman);
//       });
// this.options = response.data;
// =======
export default {
  name: "tournament-add-sportsman",
  components: {
    Multiselect
  },
  props: [
    "tournamentKey",
    "federationId",
    "activeCategory",
    "activeGenderCategory",
    "activeWeightCategory"
  ],
  data: function() {
    return {
      options: [],
      value: [],
      valueAmount: "",
      errorMessage: false
    };
  },
  beforeMount() {
    this.tournament = this.$store.state.tournamentsList[this.tournamentKey];
  },
  mounted() {
    this.federationId = this.$store.state.authUser.federation_users[0].federation_id;
    if (
      "sportsmen" in
      this.tournament.categories[this.activeCategory][
        this.activeGenderCategory
      ][this.activeWeightCategory]
    ) {
      this.value = this.tournament.categories[this.activeCategory][
        this.activeGenderCategory
      ][this.activeWeightCategory].sportsmen;
      this.valueAmount = this.value.length;
    }
    axios
      .get(
        `https://champion-api.herokuapp.com/api/sportsman-list/by-federation/${
          this.federationId
        }/20`
      )
      .then(response => {
        if (response.status === 200) {
          response.data.data.forEach(item => {
            if (
              item.date_of_birth.slice(0, 4) >=
                this.tournament.categories[this.activeCategory].ageFrom &&
              item.date_of_birth.slice(0, 4) <=
                this.tournament.categories[this.activeCategory].ageTo &&
              item.gender === this.activeGenderCategory[0].toUpperCase() &&
              item.weight <=
                parseInt(this.tournament.categories[this.activeCategory][
                  this.activeGenderCategory
                ][this.activeWeightCategory].weight)
            ) {
              let isExist = this.value.some(elem => {
                return elem.sportsman.id === item.id;
              });
              if (isExist === false) {
                let sportsman = {
                  sportsman: item,
                  fullname: `${item.first_name} ${item.last_name}`,
                  isPermit: false
                };
                this.options.push(sportsman);
              }
            }
          });
        }
      })
      .catch(function(error) {
        window.console.log(error);
      });
  },
  methods: {
    async saveSportsmen() {
      if (
        this.tournament.categories[this.activeCategory][
          this.activeGenderCategory
        ][this.activeWeightCategory].hasOwnProperty("sportsmen") === false
      ) {
        this.$set(
            this.tournament.categories[this.activeCategory][this.activeGenderCategory][this.activeWeightCategory],
            "sportsmen", []);
      }
        // this.tournament.categories.forEach(category => {
        //   if ("male" in category) {
        //     category.male.forEach(weightCategory => {
        //       if ("sportsmen" in weightCategory) {
        //         this.amountOfParticipants += weightCategory.sportsmen.length;
        //       }
        //     });
        //   }
        //   if ("female" in category) {
        //     category.female.forEach(weightCategory => {
        //       if ("sportsmen" in weightCategory) {
        //         this.amountOfParticipants += weightCategory.sportsmen.length;
        //       }
        //     });
        //   }
        // });
        this.tournament.amountOfParticipants =
            this.tournament.amountOfParticipants - this.valueAmount + this.value.length;
        if (this.tournament.amountOfParticipants <= this.tournament.maxParticipants) {
        try {
          await firebase
            .database()
            .ref(this.federationId)
            .child(this.tournamentKey)
            .child("categories")
            .child(this.activeCategory)
            .child(this.activeGenderCategory)
            .child(this.activeWeightCategory)
            .update({ sportsmen: this.value });
        } catch (error) {
          throw error;
        }
        this.$emit("clicked");
            this.updateAmountOfParticipants();
      } else {
        this.errorMessage = true;
            this.tournament.amountOfParticipants =
                this.tournament.amountOfParticipants - this.value.length + this.valueAmount;
        }
    },
      async updateAmountOfParticipants() {
          try {
              await firebase
                  .database()
                  .ref(this.federationId)
                  .child(this.tournamentKey)
                  .update({amountOfParticipants: this.tournament.amountOfParticipants});
          } catch (error) {
              throw error;
          }
      }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style lang="scss" scoped>
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
