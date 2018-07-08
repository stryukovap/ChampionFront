<template>
    <div class="cm-form__content cm-form__content--f">
        <h3 class="cm-form__user-role">Register as Federation</h3>
        <div class="cm-form__wrapper text-left">
            <!--<button class="btn btn-primary" id="submit">Back</button>-->
        </div>
        <div class="cm-form__wrapper">
            <input placeholder="Federation Name" class="form-control" type="text" name="f-name" id="f-name"
                   pattern="([A-Za-zА-Яа-я-']){1,}"
                   required autofocus
                   title="Кириллица/латиница без спецсимв.с допустимым спецсимволом, ', - , без цифр">
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
            <input placeholder="President Name" type="text" name="f-presidentname" id="f-presidentname"
                   class="form-control">
        </div>
        <div class="cm-form__wrapper">
            <input autocomplete="off" placeholder="Subdomain" type="text" name="f-subdomain" id="f-subdomain"
                   class="form-control">
        </div>
        <div class="cm-form__wrapper">
            <input autocomplete="off" placeholder="Contact Phone" type="tel" name="f-tel" id="f-tel"
                   class="form-control">
        </div>
        <div class="cm-form__wrapper">
            <input autocomplete="off" placeholder="Contact Email" type="email" name="f-email" id="f-email"
                   class="form-control">
        </div>
        <div class="cm-form__wrapper text-center">
            <!--<button class="btn btn-primary" id="submit">Registration</button>-->
        </div>
    </div>
</template>
<script>
export default {
  name: "registration_federation"
};
</script>
<style scoped lang="scss">
.cm-form__wrapper {
  margin-top: 10px;
  text-align: left;
}
</style>
