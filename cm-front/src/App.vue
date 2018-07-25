<template>
    <div id="app">
        <body>
        <header>
            <Header></Header>
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
@import "../node_modules/bootstrap/scss/bootstrap.scss";

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
</style>
<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Footer_static from "./components/Footer_static";
import Header from "./components/Header";

export default {
  components: {
    Footer_static,
    Header
  }
};
</script>
