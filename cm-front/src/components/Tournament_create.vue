<template>
        <form class="popup__tournament container text-center mt-5">
            <div class="popup__title-wrapper row">
                <h2 class="popup__title col text-left">Create a New Tournament</h2>
                <button class="popup__exit btn btn-danger"
                        @click="closePopup">X</button>
            </div>
            <div class="popup__title-wrapper row">
                <h3 class="popup__title col text-left">General Info</h3>
            </div>
            <div class="cm-form__wrapper popup__wrapper row">
                <div class="col-2"><label for="name">Name</label></div>
                <div class="col-10">
                    <input class="form-control" type="text" id="name"
                           placeholder="Name"
                           autofocus
                           autocomplete="off"
                           v-model="tournament.name">
                </div>
            </div>
            <div class="cm-form__wrapper row">
                <div class="col-2"><span>Description</span></div>
                <div class="col-10">
                    <textarea class="form-control"
                              placeholder="Description"
                              autocomplete="off"
                              v-model="tournament.desc"></textarea>
                </div>
            </div>
            <div class="popup__wrapper mt-1 row">
                <div class="col-2 text-left"><span>Banners</span></div>
                <div class="col-10" style="display: flex; flex-direction: column; align-items: center;">
                    <img src="../assets/github-mark_560x560.png" width="150px" height="150px" alt="sportsman foto"
                         class="popup__foto">
                    <label class="mt-3" for="foto" style="cursor: pointer">Upload new foto</label>
                    <input type="file" name="foto" id="foto" style="display: none">
                </div>
            </div>
            <div class="cm-form__wrapper">
                <div class="row align-items-end">
                    <div class="col align-self-center">
                        <label class="cm-form__label" for="dateStart">Dates</label>
                    </div>
                    <div class="col">
                        <span>From </span>
                        <input class="form-control" type="date" name="dateStart" id="dateStart"
                               title="Date of Start"
                               v-model="tournament.dateStart">
                    </div>
                    <div class="col">
                        <span>To </span>
                        <input class="form-control" type="date" name="dateEnd" id="dateEnd"
                               title="Date of End"
                               v-model="tournament.dateEnd">
                    </div>
                </div>
            </div>
            <div class="cm-form__wrapper popup__wrapper row">
                <div class="col-2"><label for="quantityRings">Quantity Rings</label></div>
                <div class="col-10">
                    <input class="form-control" type="text" id="quantityRings"
                           placeholder="Quantity Rings"
                           autocomplete="off"
                           v-model="tournament.quantityRings">
                </div>
            </div>
            <div class="cm-form__wrapper popup__wrapper row">
                <div class="col-2"><label for="location">Location</label></div>
                <div class="col-10">
                    <input class="form-control" type="text" id="location"
                           placeholder="Location"
                           autocomplete="off"
                           v-model="tournament.location">
                </div>
            </div>
            <div class="popup__title-wrapper row">
                <h3 class="popup__title col text-left">Categories</h3>
            </div>
            <div class="popup__title-wrapper row container">
                <table class="cat">
                    <tr class="cat__row">
                        <td class="cat__num"><span style="margin-right: 5px">1</span></td>
                        <td class="cat__name-label"><span style="margin-right: 5px">Category</span></td>
                        <td class="category__name">
                            <input class="form-control" type="text" id="catName"
                                   placeholder="Category"
                                   autocomplete="off"
                                   v-model="tournament.category.name">
                        </td>
                        <td class="cat__gender text-left">
                            <div class="col">
                                <input type="radio" name="gender" id="male"
                                       checked
                                       v-model="tournament.category.gender"
                                       value="M">
                                <label style="margin-left: 5px" for="male"> Male</label>
                            </div>
                            <div class="col">
                                <input type="radio" name="gender" id="female"
                                       v-model="tournament.category.gender"
                                       value="F">
                                <label style="margin-left: 5px" for="female"> Female</label>
                            </div>
                        </td>
                        <td class="cat__weight">
                            <span>Weight</span>
                        </td>
                        <td class="cat__WeightMin">
                            <input class="form-control" type="text" id="weightMin"
                                   placeholder="Weight Min"
                                   autocomplete="off"
                                   v-model="tournament.category.weightMin">
                        </td>
                        <td class="cat__WeightMax">
                            <input class="form-control" type="text" id="weightMax"
                                   placeholder="Weight Max"
                                   autocomplete="off"
                                   v-model="tournament.category.weightMax">
                        </td>
                        <td class="cat__add"><a class="cat_add-button" style="cursor: pointer">+</a></td>
                    </tr>
                </table>
            </div>
            <div class="popup__title-wrapper row">
                <h3 class="popup__title col text-left">Referees</h3>
            </div>
            <div class="row text-right">
                <button class="popup__save btn btn-success mt-3"
                        style="margin-right: 10px;"
                        @click="saveTournament">Save changes
                </button>
                <button class="popup__save btn btn-success mt-3"
                        @click="saveTournament">Cancel
                </button>
            </div>
        </form>
</template>
<style scoped>
</style>
<script>
    export default {
        data() {
            return {
                tournament: {
                    category:{},
                },
            }
        },
        methods: {
            closePopup: function () {
                window.console.log("You push button Close");
            },
            saveTournament: function () {
                window.console.log("You push button Save")
            }
        }
    }
</script>
