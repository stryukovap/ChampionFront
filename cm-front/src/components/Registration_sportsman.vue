<template>
    <div class="cm-form__content cm-form__content--s">
        <h3 class="cm-form__user-role">Register as Sportsman</h3>
        <div class="cm-form__wrapper text-left">
            <!--<button class="btn btn-primary" id="submit">Back</button>-->
        </div>
        <div class="cm-form__wrapper">
            <input placeholder="Name" class="form-control" type="text" name="s-name" id="s-name"
                   pattern="([A-Za-zА-Яа-я-']){1,}"
                   required autofocus
                   title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр">
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
            <input placeholder="Federation" type="text" name="s-federation" id="s-federation" class="form-control"
                   disabled>
        </div>
        <div class="cm-form__wrapper autocomplete">
            <input autocomplete="off" placeholder="Trainer" type="text" name="s-trainer" id="s-trainer"
                   class="form-control">
        </div>
        <div class="cm-form__wrapper autocomplete">
            <!--<input placeholder="City" type="text" name="s-city" id="s-city" class="form-control">-->
            <autocomplete
                    :items="['Винница', 'Днепр', 'Донецк', 'Житомир', 'Запорожье', 'Ивано-Франковск', 'Киев', 'Кропивницкий', 'Луганск', 'Луцк', 'Львов', 'Николаев', 'Одесса', 'Полтава', 'Ровно', 'Сумы', 'Тернополь', 'Ужгород', 'Харьков', 'Херсон', 'Хмельницкий', 'Черкассы', 'Чернигов', 'Черновцы']"/>
        </div>
        <div class="cm-form__wrapper text-center">
            <!--<button class="btn btn-primary" id="submit">Registration</button>-->
        </div>
    </div>
</template>
<script>
import Autocomplete from "./autocomplete-city.vue";

export default {
  name: "registation_spotsman",
  components: { Autocomplete }
};
</script>
<style scoped lang="scss">
.cm-form__wrapper {
  margin-top: 10px;
  text-align: left;
}
</style>
