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
	/*background: #D3CCE3;  !* fallback for old browsers *!*/
	/*background: -webkit-linear-gradient(to bottom, #E9E4F0, #D3CCE3);  !* Chrome 10-25, Safari 5.1-6 *!*/
	/*background: linear-gradient(to bottom, #E9E4F0, #D3CCE3); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/


}

/*footer {*/
  /*background-color: #343a40;*/
  /*margin-top: auto;*/
/*}*/

/*.footer {*/
  /*&__list {*/
    /*padding: 0;*/
    /*margin: 0;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*list-style: none;*/
  /*}*/
  /*&__item {*/
    /*margin-left: 10px;*/
    /*margin-right: 10px;*/
    /*&--logo {*/
      /*margin-left: auto;*/
    /*}*/
  /*}*/
/*}*/

/*.btn-user {*/
  /*margin-left: 10px;*/
  /*margin-right: 10px;*/
/*}*/
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
