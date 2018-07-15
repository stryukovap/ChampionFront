<template>
    <section class="info-form">
        <div class="container">
            <div class="row justify-content-center">
                <div class="info col-6">
                    <div class="info__str row">
                        <div class="info__status">Status</div>
                        <div class="info__active">{{status}}</div>
                    </div>
                    <div class="info__str row">
                        <div class="info__subsc">Subscription</div>
                        <div class="info__wrap-text">
                            <div class="info__active">Expire in <span>{{subscription}}</span> days</div>
                            <button class="info__btn btn btn-primary">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form row justify-content-center">
                <div class="col-5 form__wrap">
                    <form action="#" method="POST">
                        <h3 class="form__header">Update password</h3>
                        <div class="form__fields">
                            <div class="form__field">
                                <input type="password" name="pass" placeholder="Old password" class="form__input">
                            </div>
                            <div class="form__field">
                                <input type="password" name="newPass" placeholder="New password" class="form__input">
                            </div>
                            <div class="form__field">
                                <input type="password" name="" name="confirmPass" placeholder="Confirm new password" class="form__input">
                            </div>
                            <div class="form__btn-wrap">
                                <input type="submit" value="Update" class="form__btn btn btn-primary">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
  name: "settings",
  data: function() {
    return {
      status: "",
      subscription: ""
    };
  },
  methods: {},
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => {
        this.status = response.data.completed;
        this.subscription = response.data.id;
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped lang="scss">
.info {
  &__str {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__wrap-text {
    display: flex;
    align-items: center;
  }

  &__btn {
    margin-left: 20px;
  }
}

.info-form {
  padding-top: 50px;
}

.form {
  margin-top: 50px;

  &__header {
    text-align: center;
    margin-bottom: 25px;
  }

  &__field {
    width: 270px;
    margin: 0 auto 10px auto;
  }

  &__input {
    width: 100%;
  }

  &__btn-wrap {
    display: flex;
    justify-content: center;
  }
}
</style>
