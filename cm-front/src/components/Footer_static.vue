<template>
    <nav class="footer__nav">
        <ul class="footer__list">
            <router-link tag="a"
                         class="footer__item"
                         to="/userprofile">Userprofile</router-link>
            <router-link tag="a"
                         class="footer__item"
                         to="/federation/22">Federation</router-link>
            <router-link tag="a"
                         class="footer__item"
                         to="/coachcabinet">Coach Cabinet</router-link>
            <router-link tag="a"
                         class="footer__item"
                         to="/federationcabinet">Federation Cabinet</router-link>
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
<style lang="scss">
@import "../../node_modules/bootstrap/scss/bootstrap";

body {
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  background-color: #343a40;
  margin-top: auto;
}

.nav-link {
  background-image: url(../assets/logo.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
