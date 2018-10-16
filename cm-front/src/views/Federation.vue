<template>
      <div class="container">
          <div class="federation">
              <section class="federation__info">
                  <h2 class="tournaments__title title">Nearest tournaments</h2>
                  <card class="tournaments__list"></card>
              </section>
              <section class="federation__news">
                  <h2 class="news__desc title">News</h2>
                  <news class="news__list" v-bind:newsList="newsList"></news>
              </section>
          </div>
          <section class="federation__sportsman ">
              <h2 class="sportsman__title title">Our Sportmen</h2>
              <sportsmen class="sportsman__list"></sportsmen>
          </section>
    </div>
</template>
<script>
import axios from "axios";
import tournaments from "../components/federation/Tournaments";
import sportsmen from "../components/federation/Sportsmen";
import news from "../components/federation/News";
import * as firebase from "firebase";
import card from "../components/federation/card";

export default {
  components: {
    tournaments,
    sportsmen,
    news,
    card
  },
  data: function() {
    return {
      newsList: []
    };
  },
  async mounted() {
      try {
        const fbObj = await firebase
            .database()
            .ref("news")
            .once("value")
            .then((snapshot) => {
              let firebaseList = snapshot.val()[this.$route.params.id];
              for(let key in firebaseList) {
                this.newsList.push({
                  name: firebaseList[key].title,
                  avatar:
                    "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16345a6903e%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16345a6903e%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.203125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
                  date: firebaseList[key].date,
                  link: "#"
                });
              }
            });
      } catch (error) {
          throw error;
      }

      axios
      .get(
          "https://champion-api.herokuapp.com/api/belts/" + this.$route.params.id
      )
      .then(response => {
        // window.console.log(response.data);
        for(let i = 0; i < response.data.length; i++) {
          // window.console.log(response.data[i]);
          this.$store.state.federationBelts[response.data[i].id] = response.data[i].name;
        }
        window.console.log(this.$store.state.federationBelts);
      })
      .catch(error => {
        window.console.log(error);
      })

  }
};
</script>

<style scoped lang="scss">
    .container{
        width: 1200px;
    }
    .federation{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 30px;
        /*min-width: 900px;*/
        &__info{
            min-width: 900px;
        }
    }
    .tournaments__title, .sportsman__title, .news__desc{
        text-align: left;
        font-family: "Nova Square", sans-serif;
        font-size: 32px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #262626;
    }

    @media (max-width: 1300px) {
        .federation__info,
        .federation__news,
        .federation__sportsman {
            width: 100%;
        }

    }
    @media (max-width: 980px) {
        .container {
            max-width: 940px;
            padding: 0;
            margin: 0 auto;
        }
        .title {
            font-size: 3em;
            width: 100%;
        }
        .federation {
            flex-direction: column;
            &__info{
                min-width: unset;
            }
        }
        .news__list {
            display: flex;
            flex-direction: column;
        }
    }
</style>
