<template>
    <div class="certificate-content">
        <h2 class="certificates-h">Certificates</h2>
        <ul class="cm-sp-certificates-list user-certificates-list  d-inline-flex col-12">
            <li class="wrapper"
                v-for='(certificate, index) in userCertificates'
                v-if='index < 7'
                :key='certificate.index'>
                <a v-bind:href="certificate.link">
                    <div class="certificat-img"><img class="certificate-item" src="../../assets/certificate-sports.jpg">
                    </div>
                </a>
                <div class="certificates-scroll">
                    <div class="certificates-scroll-little"></div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "userCertificates",
  data: function() {
    return {
      userCertificates: []
    };
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.userCertificates.push({
            picture: response.data[i].url,
            link: "#"
          });
        }
      })
      .catch(error => {
        window.console.log(error);
      });
  }
};
</script>

<style scoped lang="scss">
.user-certificates-list {
  /*max-width: 1110px;*/
  width: 1055px;
  /*height: 260px;*/
  margin: auto 10px;
  /*overflow-x: scroll;*/
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.user-certificates-list li {
  /*display: inline-block;*/
  /*height: 125px;*/
  /*width: 33%;*/
  /*margin: 0;*/
  /*padding: 0;*/
  padding-left: 49px;
}

.certificates-h {
  text-align: left;
  margin-left: 47px;
  margin-top: 30px;
}

.certificate-item {
  margin: 15px;
  width: 245px;
  height: auto;
  overflow: hidden;
  border-radius: 15px;
}

/*.certificate-img{*/
/*position: relative;*/
/*}*/

.certificate-item:hover {
  /////увеличение картинки
  -webkit-transform: scale(1.2);
  -ms-transform: scale(1.2);
  transform: scale(1.2);
  border-radius: 15px;
  box-shadow: 5px 5px 5px 0 #e9e9e9;
  background-color: #ffffff;
  border: solid 1px rgba(73, 174, 245, 0.6);
}

/*.certificate-item:hover .certificates-scroll-little {  ///////подчеркивание*/
/*display: block;*/
/*width: 94px;*/
/*height: 4px;*/
/*background-color:#3f88c5;*/
/*left: 91px;*/
/*}*/

.wrapper:hover .certificates-scroll-little {
  ///////подчеркивание
  position: relative;
  display: block;
  width: 94px;
  height: 4px;
  background-color: #3f88c5;
  left: 130px;
}

.certificates-scroll-little {
  position: absolute;
  display: none;
  width: 94px;
  height: 4px;
  background-color: #3f88c5;
  left: 130px;
}

.certificates-scroll {
  /*position: relative;*/
  width: 128%;
  height: 4px;
  background-color: #c9c9c9;
  /*margin: auto 23px;*/
  margin-top: 30px;
  margin-left: -33px;
}

.certificate-content {
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  border-radius: 5px;
  background-color: #ffffff;
  border: solid 1px #e9e9e9;
  width: 100%;
  height: 100%;
  /*text-align: center;*/
  position: relative;
  -webkit-box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.7);
  box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.7);
  margin: auto;
}
</style>
