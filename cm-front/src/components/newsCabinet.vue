<template>
    <section>
        <div class="container">
            <div class="row">
                <label>
                    <input type="text" class="text-p text-center" placeholder="Title" v-model="title">
                </label>
                <label>
                    <textarea name="text" class="input text-center" placeholder="Text" v-model="text"></textarea>
                </label>
                <label>
                    <input type="date" name="calendar" class="data text-center">
                </label>
                <label>
                    <input type="submit" value="Submit" class="button_submit">
                </label>
            </div>
        </div>
    </section>
</template>

<script>
// import axios from "axios";

export default {
  name: "news-cabinet",
  data() {
    return {
      title: "",
      text: ""
    };
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.text-p {
  line-height: 1.5;
  margin: 15px 0 0 430px;
  border: 1px solid #000000;
  color: #666666;
  font-size: 24px;
  font-weight: bold;
}

.button_submit {
  display: inline;
  margin-top: 30px;
  width: 160px;
  height: 38px;
  color: #666666;
  font-size: 24px;
}

.input {
  width: 600px;
  height: 200px;
  border: 1px solid #000000;
  color: #666666;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.5;
  margin: 15px 266px;
}

.data {
  display: inline;
  margin: 15px 245px;
  border: 1px solid #000000;
  color: #666666;
  font-size: 24px;
}
</style>
