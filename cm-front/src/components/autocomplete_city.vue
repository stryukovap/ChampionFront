<template>
    <div id="autocomplete" class="autocomplete">
        <input
                v-model="$store.state.sportsman.city"
                type="text"
                placeholder="City"
                @input="onChange"
                autocomplete="off"
                v-on:keyup.down="onArrowDown"
                v-on:keyup.up="onArrowUp"
                v-on:keyup.enter="onEnter"
                class="form-control"/>
        <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
            <li class="loading" v-if="isLoading">
                Loading results...
            </li>
            <li v-else v-for="(result, i) in results" :key="i" v-on:click="setResult(result)"
                class="autocomplete-result" :class="{ 'is-active': i === arrowCounter }">
                {{ result }}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: "autocomplete",
  template: "#autocomplete",
  props: {
    cities: {
      type: Array,
      required: false,
      default: () => []
    },
    isAsync: {
      type: Boolean,
      required: false
    }
  },

  data() {
    return {
      isOpen: false,
      results: [],
      isLoading: false,
      arrowCounter: 0
    };
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    onChange() {
      // Is the data given by an outside ajax request?
      if (this.isAsync) {
        this.isLoading = true;
      } else {
        // Let's search our flat array
        this.filterResults();
        this.isOpen = true;
      }
    },
    filterResults() {
      // first uncapitalize all the things
      this.results = this.cities.filter(item => {
        return (
          item
            .toLowerCase()
            .indexOf(this.$store.state.sportsman.city.toLowerCase()) > -1
        );
      });
    },
    setResult(result) {
      this.$store.state.sportsman.city = result;
      this.isOpen = false;
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.$store.state.sportsman.city = this.results[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    }
  },
  watch: {
    cities: function(val, oldValue) {
      // actually compare them
      if (val.length !== oldValue.length) {
        this.results = val;
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.autocomplete {
  position: relative;
}

.autocomplete-results {
  position: absolute;
  z-index: 4;
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  background-color: #ffffff;
  height: 120px;
  overflow: auto;
  width: 100%;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #28a745;
  color: white;
}
</style>
