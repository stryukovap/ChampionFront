<template>
  <div id="app">
    <body>
    <header>
      <!--<div class="container">-->
        <nav class="main-nav">
          <ul class="nav-list">
            <li class="nav-item nav-item--logo">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <ul class="nav-list nav-list--sub">
                <li class="nav-item">
                  <a href="tel:+#">Phone: +38067000001</a>
                </li>
                <li class="nav-item">
                  <a href="mailto:#">E-mail: exemple@exemple.com</a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <!-- <div class="user"> -->
              <router-link class="btn btn-primary btn-user" to="/auth">Log in</router-link>
              <router-link class="btn btn-primary btn-user" to="/registration">Registration</router-link>
              <router-link class="btn btn-primary btn-user" to="/coachcabinet">Coach Cabinet</router-link>
              <!-- </div> -->
            </li>
          </ul>
        </nav>
      <!--</div>-->
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
      <footer_static/>
    </footer>
    </body>
  </div>
</template>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap-reboot.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
@import "../node_modules/bootstrap/scss/bootstrap-grid.scss";
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
.footer {
  &__list {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    list-style: none;
  }
  &__item {
    margin-left: 10px;
    margin-right: 10px;
    &--logo {
      margin-left: auto;
    }
  }
}

.btn-user {
  margin-left: 10px;
  margin-right: 10px;
}

.main-nav {
  background-color: #343a40;
}

.nav-list {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
  &--sub {
    flex-direction: column;
    align-items: flex-start;
  }
}

.nav-item {
  margin-right: 10px;
  margin-left: 10px;
  &--logo {
    margin-right: auto;
  }
}
.nav-link {
  background-image: url(assets/logo.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Footer_static from "./components/Footer_static";

export default {
  components: { Footer_static }
};
</script>
