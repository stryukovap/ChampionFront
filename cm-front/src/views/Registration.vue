<template>
	<div class="registration">
		<div class="container">
			<div class="col-12 col-md-6 col-lg-4 col-xl-4 wrapper">
				<form class="cm-form" action="#" autocomplete="off" method="post">
					<div class="cm-form__content">
						<h2 class="cm-form__user-role">Sportsman</h2>
						<div class="cm-form__wrapper text-left">
							<button class="btn btn-primary" id="submit">Back</button>
						</div>
						<div class="cm-form__wrapper">
							<input placeholder="Name" class="form-control" type="text" name="name" id="myname" pattern="([A-Za-zА-Яа-я-']){1,}"
							    required autofocus title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр">
						</div>
						<div class="row cm-form__wrapper align-items-end">
							<div class="col">
								<label class="cm-form__label" for="mybdate">Date of Birth</label>
							</div>
							<div class="col">
								<input class="form-control" type="date" name="bdate" id="mybdate" title="Дата рождения" required>
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
							<input placeholder="Federation" type="text" name="federation" id="myfederation" class="form-control" disabled>
						</div>
						<div class="cm-form__wrapper autocomplete">
							<input autocomplete="off" placeholder="Trainer" type="text" name="trainer" id="mytrainer" class="form-control">
						</div>
						<div class="cm-form__wrapper autocomplete">
							<input autocomplete="off" placeholder="City" type="text" name="city" id="mycity" class="form-control">
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
<style scoped lang="scss">
	.wrapper {
		margin: 50px auto;
	}

	.cm-form__wrapper {
		margin-top: 10px;
		text-align: left;
	}
</style>