<template>
  <div class="row cm-sp-certificates">
    <div class="col-12">
      <h2>Certificates</h2>
      <ul class="cm-sp-certificates-list user-certificates-list list-unstyled d-inline-flex">
         <li
           v-for='(certificate, index) in userCertificates'
           v-if='index < 7'
           :key='certificate.index'>
           <a v-bind:href="certificate.link">
            <img class="certificate-item" :src='certificate.picture' width='200' height='200'>
           </a>
         </li>
      </ul>
    </div>
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

<style scoped>
.user-certificates-list {
  max-width: 1110px;
  height: 260px;
  overflow-x: scroll;
}

.user-certificates-list li {
  display: inline-block;
}

.certificate-item {
  margin: 15px;
}
</style>
