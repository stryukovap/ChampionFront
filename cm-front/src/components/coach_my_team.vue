<template>
    <b-table striped hover :items="items" :fields="fields"></b-table>
</template>

<script>
import axios from "axios";

export default {
  name: "coach-my-team",
  data: function() {
    return {
      items: [],
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: {
        //                    last_name: {
        //                        label: 'Person last name',
        //                        sortable: true
        //                    },
        name: {
          label: "Sportsman",
          sortable: true
        },
        active: {
          // This key overrides `foo`!
          key: "username",
          label: "Active",
          sortable: true
        },
        subscription: {
          key: "address.zipcode",
          label: "Subscription expiry date",
          sortable: true
        }
      }
      //                items: [
      //                    { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald', address: { country: 'USA', city: 'New York' } },
      //                    { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw', address: { country: 'Canada', city: 'Toronto' }},
      //                    { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson', address: { country: 'Australia', city: 'Sydney' } },
      //                    { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney', address: { country: 'England', city: 'London' } } ]
    };
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(response => (this.items = response.data))
      .catch(error => console.log(error));
  }
};
</script>
