<template>
    <div>
      <div class="container">
        <div class="row">
          <tournaments v-bind:tournamentsList="tournamentsList" class="col-lg-9"></tournaments>
          <news v-bind:newsList="newsList" class="col-lg-3"></news>
        </div>
      </div>
      <sportsmen v-bind:sportsmenList="sportsmenList"></sportsmen>
    </div>
</template>
<script>
import axios from "axios";
import tournaments from "../components/federation/Tournaments";
import sportsmen from "../components/federation/Sportsmen";
import news from "../components/federation/News";

export default {
  components: {
    tournaments,
    sportsmen,
    news
  },
  data: function() {
    return {
      newsList: [],
      sportsmenList: [],
      tournamentsList: [],
    };
  },
  mounted(){
      axios.get("https://champion-api.herokuapp.com/api/federation/" + this.$route.params.id)
          .then(response => {
            for (let i = 0; i < response.data.sportsmen.length; i++) {
              this.sportsmenList.push({
                name: response.data.sportsmen[i].name,
                role: response.data.sportsmen[i].role,
                avatar: response.data.sportsmen[i].ava,
                dan: response.data.sportsmen[i].rank,
                link: response.data.sportsmen[i].link
              });
            }
            for (let i = 0; i < response.data.news.length; i++) {
              this.newsList.push({
                name: response.data.news[i].name,
              });
            }
            for (let i = 0; i < response.data.tournaments.length; i++) {
              this.newsList.push({
                name: response.data.tournaments[i].name,
              });
            }
          })
          .catch(error => {
            window.console.log(error);
            for(let i = 0; i < 10; i++) {
              this.sportsmenList.push({
                avatar: "../img/user-photo.PNG",
                name: "sp1",
                role: "coach",
                belt: "../img/pos.png",
                dan: 3,
                link: "#"
              });
            }
            for (let i = 0; i < 5; i++) {
              this.newsList.push({
                name: "post name",
                avatar:
                  "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16345a6903e%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16345a6903e%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.203125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
                date: "13.13.18",
                link: "#"
              });
            }
            for (let i = 0; i < 11; i++) {
              this.tournamentsList.push({
                avatar:
                  "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16345a6903e%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16345a6903e%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.203125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
                name: "tournament name",
                date: "04.04.04",
                registration: "02.02.02 - 03.03.03",
                numberOfMembers: "5/100",
                link: "#"
              });
            }
          })
  }
};
</script>

<style lang="scss">
.h2 {
  display: inline-block;
  margin-left: 30px;
}

.h2-2 {
  display: inline-block;
  margin-left: 525px;
}

.line {
  border: none;
  background-color: #5a5a5a;
  color: #5a5a5a;
  height: 1px;
}

@media (min-width: 992px) {
  .main-content {
    border-right: 1px solid;
  }
}
</style>
