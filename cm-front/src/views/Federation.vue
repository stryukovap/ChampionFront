<template>
    <body>
        <tournaments></tournaments>
        <sportsmen></sportsmen>
    </body>
</template>
<script>
import tournaments from "../components/federation/Tournaments";
import sportsmen from "../components/federation/Sportsmen";

export default {
  components: {
    tournaments,
    sportsmen
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
