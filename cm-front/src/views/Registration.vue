<template>
	<div class="registration">
		<div class="container">
			<div class="col-12 col-md-6 col-lg-4 col-xl-4 wrapper">
				<form class="cm-form" action="#" autocomplete="off" method="post">
					<div class="cm-form__content cm-form__content--one">
						<h1>Registration</h1>
						<div class="row cm-form__wrapper text-center">
							<div class="col">
								<input class="form-control" type="radio" name="as-role" id="as-role-f">
								<label for="as-f">As federation</label>
							</div>
							<div class="col">
								<input class="form-control" type="radio" name="as-role" id="as-role-s" checked>
								<label for="as-s">As sportsman</label>
							</div>
						</div>
						<div class="cm-form__wrapper">
							<input class="form-control" type="email" name="user-email" id="user-email" required autofocus autocomplete="off" placeholder="E-mail">
						</div>
						<div class="cm-form__wrapper">
							<input class="form-control" type="password" name="user-pass" id="user-pass" required autocomplete="off" placeholder="Password">
						</div>
						<div class="cm-form__wrapper">
							<input class="form-control" type="password" name="user-confpass" id="user-confpass" required autocomplete="off" placeholder="Confirm password">
						</div>
						<div class="cm-form__wrapper text-center">
						<button class="btn btn-primary" id="next-step">Next</button>
						</div>
						<div class="cm-form__wrapper text-center">
 				           <router-link class="cm_form__link" to="/auth">Already registered?</router-link>
						</div>
					</div>
					<div class="cm-form__content cm-form__content--s">
						<h3 class="cm-form__user-role">Register as Sportsman</h3>
						<div class="cm-form__wrapper text-left">
							<button class="btn btn-primary" id="submit">Back</button>
						</div>
						<div class="cm-form__wrapper">
							<input placeholder="Name" class="form-control" type="text" name="s-name" id="s-name" pattern="([A-Za-zА-Яа-я-']){1,}"
							    required autofocus title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр">
						</div>
						<div class="row cm-form__wrapper align-items-end">
							<div class="col">
								<label class="cm-form__label" for="s-bdate">Date of Birth</label>
							</div>
							<div class="col">
								<input class="form-control" type="date" name="s-bdate" id="s-bdate" title="Дата рождения" required>
							</div>
						</div>
						<div class="row cm-form__wrapper">
							<div class="col">
								<span class="cm-form__user-gender">Gender</span>
							</div>
							<div class="col">
								<input type="radio" name="gender" id="male" value="male" checked>
								<label for="male">M</label>
							</div>
							<div class="col">
								<input type="radio" name="gender" id="female" value="female">
								<label for="female">F</label>
							</div>
						</div>
						<div class="cm-form__wrapper">
							<input placeholder="Federation" type="text" name="s-federation" id="s-federation" class="form-control" disabled>
						</div>
						<div class="cm-form__wrapper autocomplete">
							<input autocomplete="off" placeholder="Trainer" type="text" name="s-trainer" id="s-trainer" class="form-control">
						</div>
						<div class="cm-form__wrapper autocomplete">
							<!--<input placeholder="City" type="text" name="s-city" id="s-city" class="form-control">-->
							<autocomplete :items="['Винница', 'Днепр', 'Донецк', 'Житомир', 'Запорожье', 'Ивано-Франковск', 'Киев', 'Кропивницкий', 'Луганск', 'Луцк', 'Львов', 'Николаев', 'Одесса', 'Полтава', 'Ровно', 'Сумы', 'Тернополь', 'Ужгород', 'Харьков', 'Херсон', 'Хмельницкий', 'Черкассы', 'Чернигов', 'Черновцы']" />
						</div>
						<div class="cm-form__wrapper text-center">
							<button class="btn btn-primary" id="submit">Registration</button>
						</div>
					</div>
					<div class="cm-form__content cm-form__content--f">
						<h3 class="cm-form__user-role">Register as Federation</h3>
						<div class="cm-form__wrapper text-left">
							<button class="btn btn-primary" id="submit">Back</button>
						</div>
						<div class="cm-form__wrapper">
							<input placeholder="Federation Name" class="form-control" type="text" name="f-name" id="f-name" pattern="([A-Za-zА-Яа-я-']){1,}"
							    required autofocus title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр">
						</div>
						<div class="row cm-form__wrapper align-items-end">
							<div class="col">
								<label class="cm-form__label" for="f-sport">Sport</label>
							</div>
							<div class="col">
								<select name="sport" id="f-sport" class="form-control">
									<option value="tkv">TKV</option>
									<option value="kvt">KVT</option>
									<option value="vtk">VTK</option>
								</select>
							</div>
						</div>
						<div class="cm-form__wrapper">
							<input placeholder="President Name" type="text" name="f-presidentname" id="f-presidentname" class="form-control">
						</div>
						<div class="cm-form__wrapper">
							<input autocomplete="off" placeholder="Subdomain" type="text" name="f-subdomain" id="f-subdomain" class="form-control">
						</div>
						<div class="cm-form__wrapper">
							<input autocomplete="off" placeholder="Contact Phone" type="tel" name="f-tel" id="f-tel" class="form-control">
						</div>
						<div class="cm-form__wrapper">
							<input autocomplete="off" placeholder="Contact Email" type="email" name="f-email" id="f-email" class="form-control">
						</div>
						<div class="cm-form__wrapper text-center">
							<button class="btn btn-primary" id="submit">Registration</button>
						</div>
					</div>
				</form>
				<!-- <div class="cm-form__message cm-form__message--error">Error message</div> -->
				</div>
	</div>
	</div>
</template>

<script>
import Autocomplete from "../components/autocomplete-city.vue";
export default {
  name: "registration",
  components: {
    autocomplete: Autocomplete
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

.cm-form__wrapper {
  margin-top: 10px;
  text-align: left;
}
</style>
