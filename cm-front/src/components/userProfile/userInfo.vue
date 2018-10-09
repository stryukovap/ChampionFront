<template>
    <div class="container">
        <div class="user">
            <div class="user__social-info">
                <img v-if="sportsman.photo_id" class="user__photo" alt="photo" width="185" height="185"
                     v-bind:src="sportsman.photo.url">
                <img v-else class="user__photo" src="../../assets/345x345_26.jpg" alt="photo" width="185" height="auto">
                <div class="user__social">
                    <a href="#" class="user__link user__link--in"></a>
                    <a href="#" class="user__link user__link--fa"></a>
                </div>
                <a href="tel:+380670000000" class="user__phone">Phone: +380670000000</a>
            </div>
            <div class="user__info">
                <h4 class="user__title">{{sportsman.first_name}}
                    {{sportsman.last_name}}</h4>
                <div class="user__wrapper">
                    <ul class="user__list">
                        <!--<h4 class="user__role">{{this.$store.state.role}}</h4>-->
                        <h4 v-if="sportsman.federation_sportsmen[0].is_coach === 1" class="user__role">Coach</h4>
                        <h4 v-else class="user__role">Sportsman</h4>
                        <li class="user__item user-badge">
                            <p v-if="sportsman.federation_sportsmen[0].federation_belt_id" class="user__belt">need get
                                belts</p>
                            <p v-else class="user__belt">is not specified</p>
                            <p v-if="sportsman.federation_sportsmen[0].title" class="user__degree u-title">
                                {{sportsman.federation_sportsmen[0].title}}</p>
                            <p v-else class="user__degree u-title">is not specified</p>
                        </li>
                        <li class="user__item user-weight">
                            <p v-if="sportsman.weight" class="user__weight">{{sportsman.weight}} kg</p>
                            <p v-else class="user__weight">is not specified</p>
                        </li>
                        <li class="user__item user-location">
                            <p v-if="sportsman.city" class="user__city">{{sportsman.city}}</p>
                            <p v-else class="user__city">is not specified</p>
                            <p v-if="sportsman.federation_sportsmen[0].federations.name" class="user__federation">
                                {{sportsman.federation_sportsmen[0].federations.name}}</p>
                            <p v-else class="user__federation">is not specified</p>
                            <a href="#" class="show-on-map">show-on-map</a>
                        </li>
                    </ul>
                    <ul class="user__coaches" v-if="sportsman.my_coaches.length > 0">
                        <h4 class="user__coaches-title">Coaches</h4>
                        <!--{{this.sportsman.my_coaches}}-->
                        <li v-for="coach in sportsman.my_coaches">
                            <a v-bind:href="coach.coach_id">
                                <img v-if="coach.coaches.photo" v-bind:src="coach.coaches.photo.url" class="user__photo user__photo--coach" width="50" height="50" alt="photo">
                                <img v-else class="user__photo user__photo--coach" src="../../assets/345x345_26.jpg" width="50" height="50" alt="photo">
                                <h4 class="user__coach">{{coach.coaches.first_name}} {{coach.coaches.last_name}}</h4>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "user-info",
  components: {},
  // props: ["userIsCoach"],
  data: function() {
    return {
      sportsman: {
          "first_name": "",
          "last_name": "",
          "photo_id": null,
          "my_user_profile": null,
          "weight": 0,
          "city": "",
          "federation_sportsmen": [
              {
                  "is_coach": 1,
                  "federation_belt_id": null,
                  "title": null,
                  "federations": {
                      "name": "",
                      "belts": []
                  }
              }
        ],
          "my_sportsmen": [],
          "my_coaches": [],
          "photo": null,
          "documents": []

          // first_name: "",
          // last_name: "",
          // documents: [{ media: { url: "" } }],
          // federation_sportsmen: [
          //   { federation_belt_id: 0 },
          //   { is_coach: 0 },
          //   { title: "" },
          //   {
          //     federations: { name: "" },
          //     belts: [{ name: "" }, { id: 0 }]
          //   }
          // ],
          // my_coaches: [
          //   { sportsmen_id: "" },
          //   { coaches: { first_name: "", last_name: "", photo_id: "" } }
          // ],
          // photo_id: "",
          // photo: {
          //   url: ""
          // },
          // weight: ""
      }
    };
  },
  // props:["sportsman_id"],
    mounted() {
    axios
      .get(
        `https://champion-api.herokuapp.com/api/sportsman/${
          this.$route.params.sportsman_id
        }`
      )
      .then(response => {
          // console.log("response", response.data);
          // console.log("response: ",response.data.federation_sportsmen[0].federations.name);
        // if (response.data) {
          this.sportsman = response.data;
        // }
      })
      .catch(error => console.log(error.message));
    }
};
</script>

<style scoped lang="scss">
h3,
p {
  margin: 0;
  padding: 0;
}
@mixin reset-ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.user {
  /*font-family: "Roboto", sans-serif;*/
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  &__role,
  &__coaches-title {
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #262626;
  }
  &__title {
    text-align: left;
    font-family: "Nova Square", cursive;
    font-size: 32px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #262626;
  }
  &__info {
    margin-left: 32px;
  }
  &__wrapper {
    display: flex;
  }
  &__list,
  &__coaches {
    @include reset-ul();
    text-align: left;
  }
  &__list {
    margin-right: 300px;
  }
  &__item {
    padding-left: 40px;
    margin-top: 30px;
  }
  &__coach {
    display: inline-block;
    padding-left: 13px;
  }
  &__belt,
  &__degree,
  &__weight,
  &__city,
  &__federation,
  &__coach {
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #262626;
  }
  &__link {
    margin-right: 14px;
    width: 25px;
    height: 25px;
    background-size: 25px 25px;
    background-repeat: no-repeat;
    background-position: center center;
    &--in {
      background-image: url("../../assets/instagram-logo.svg");
    }
    &--fa {
      background-image: url("../../assets/facebook-logo-button.svg");
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &__social {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 22px;
  }
  &__photo {
    width: 185px;
    height: 185px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 2px 10px 0 #e9e9e9;
    &--coach {
      width: 50px;
      height: 50px;
    }
  }
}

.user__phone {
  margin-top: 20px;
  width: 185px;
  height: 29px;
  line-height: 29px;
  border: solid 1px #e5e5e5;
  border-radius: 25px;
  background-color: #ffffff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
  font-size: 12px;
  display: inline-block;
  color: #8d8b8b;
  &:hover {
    text-decoration: none;
  }
}

.user-badge {
  background: url("../../assets/badge.svg") no-repeat left center;
}

.user-weight {
  padding-top: 12px;
  background: url("../../assets/weight.svg") no-repeat left;
}

.user-location {
  background: url("../../assets/location-icon.svg") no-repeat 2% 6%;
}

.show-on-map {
  color: #3f88c5;
  font-size: 12px;
  line-height: 15px;
}
</style>
