<template>
    <nav class="footer__nav">
        <ul class="footer__list">
            <!--<router-link tag="a"-->
                         <!--class="footer__item"-->
                         <!--to="/userprofile">Userprofile</router-link>-->
            <!--<router-link tag="a"-->
                         <!--class="footer__item"-->
                         <!--to="/federation/22">Federation</router-link>-->
            <!--<router-link tag="a"-->
                         <!--class="footer__item"-->
                         <!--to="/coachcabinet">Coach Cabinet</router-link>-->
            <!--<router-link tag="a"-->
                         <!--class="footer__item"-->
                         <!--to="/federationcabinet">Federation Cabinet</router-link>-->
            <!--<li class="footer__item"><a href="#" class="footer__link">Footer item 1</a></li>-->
            <!--<li class="footer__item"><a href="#" class="footer__link">Footer item 2</a></li>-->
            <!--<li class="footer__item"><a href="#" class="footer__link">Footer item 3</a></li>-->
            <li class="footer__item footer__item--logo">
                <router-link class="nav-link" to="/">Home</router-link>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
  name: "footer_static"
};
</script>
<style scoped lang="scss">
/*@import "../../node_modules/bootstrap/scss/bootstrap";*/



footer {
    /*background-color: #f5f5f5;*/
  /*background-color: #343a40;*/
  /*margin-top: auto;*/
  /*background: #373b44; !* fallback for old browsers *!*/
  /*background: -webkit-linear-gradient(*/
    /*to right,*/
    /*#4286f4,*/
    /*#373b44*/
  /*); !* Chrome 10-25, Safari 5.1-6 *!*/
  /*background: linear-gradient(*/
    /*to right,*/
    /*#4286f4,*/
    /*#373b44*/
  /*); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/
}
/*.nav-link {*/
  /*background-image: url(../assets/logo.png);*/
  /*background-size: contain;*/
  /*background-repeat: no-repeat;*/
  /*background-position: center center;*/
/*}*/
</style>
