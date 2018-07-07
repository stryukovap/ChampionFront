<template>
	<div class="registration">
		<div class="container">
			<div class="col-12 col-md-6 col-lg-4 col-xl-4 wrapper">
				<form class="cm-form" action="#" autocomplete="off" method="post">
					<registration_user/>
					<registation_spotsman/>
					<registration_federation/>
				</form>
				<!-- <div class="cm-form__message cm-form__message--error">Error message</div> -->
			</div>
		</div>
	</div>
</template>

<script>
import Registration_user from "../components/Registration_user";
import Registation_spotsman from "../components/Registation_spotsman";
import Registration_federation from "../components/Registration_federation";

export default {
  name: "registration",
  components: {
    Registration_federation,
    Registation_spotsman,
    Registration_user
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.wrapper {
  margin: 50px auto;
}
</style>
