<template>
	<div id="app">
		<body>
		<!--<preloader></preloader>-->
		<header>
			<Header class="header"></Header>
		</header>
		<main>
			<router-view/>
		</main>
		<footer>
			<!--<footer_static/>-->
		</footer>
		</body>
	</div>
</template>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap-grid.scss";
body {
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
	background-color: rgba(63, 136, 197,0.035)
}

</style>
<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// import Footer_static from "./components/Footer_static";
import Header from "./components/Header";
// import Preloader from "./components/Preloader";

export default {
  components: {
    // Footer_static,
    Header
    // Preloader
  }
};
</script>
