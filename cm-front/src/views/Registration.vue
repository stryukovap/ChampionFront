<template>
	<div class="registration">
		<div class="container">
			<div class="col-12 col-md-8 col-lg-6 col-xl-6 wrapper">
                <h1 v-bind="userRole"></h1>
				<form class="cm-form" action="#" autocomplete="off" method="post">
                    <tabs>
                        <tab name="First step">
                            <registration_user/>
                        </tab>
                        <tab name="Second step">
                            <Registration_sportsman/>
                        </tab>
                        <tab name="Third tab">
                            <registration_federation/>
                        </tab>
                    </tabs>
				</form>
				<!-- <div class="cm-form__message cm-form__message--error">Error message</div> -->
			</div>
		</div>
	</div>
</template>

<script>
import Registration_user from "../components/Registration_user";
import Registration_sportsman from "../components/Registration_sportsman";
import Registration_federation from "../components/Registration_federation";
import { Tabs, Tab } from "vue-tabs-component";

export default {
  name: "registration",
  components: {
    Registration_federation,
    Registration_sportsman,
    Registration_user,
    Tabs,
    Tab
  },
  props: ["userRole"],
  data() {},
  methods: {}
};
</script>

<style lang="scss">
.wrapper {
  margin: 50px auto;
}

.cm-form__wrapper {
  margin-top: 10px;
  text-align: left;
}

.tabs-component {
  margin: 4em 0;
}

.tabs-component-tabs {
  border: solid 1px #ddd;
  border-radius: 6px;
  margin-bottom: 5px;
}

@media (min-width: 700px) {
  .tabs-component-tabs {
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -1px;
  }
}

.tabs-component-tab {
  color: #999;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
}

.tabs-component-tab:not(:last-child) {
  border-bottom: dotted 1px #ddd;
}

.tabs-component-tab:hover {
  color: #666;
}

.tabs-component-tab.is-active {
  color: #000;
}

.tabs-component-tab.is-disabled * {
  color: #cdcdcd;
  cursor: not-allowed !important;
}

@media (min-width: 700px) {
  .tabs-component-tab {
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 3px 3px 0 0;
    margin-right: 0.5em;
    transform: translateY(2px);
    transition: transform 0.3s ease;
  }

  .tabs-component-tab.is-active {
    border-bottom: solid 1px #fff;
    z-index: 2;
    transform: translateY(0);
  }
}

.tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: 0.75em 1em;
  text-decoration: none;
}

.tabs-component-panels {
  padding: 4em 0;
}

@media (min-width: 700px) {
  .tabs-component-panels {
    border-top-left-radius: 0;
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    padding: 4em 2em;
  }
}
</style>
