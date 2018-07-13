<template>
    <div>
        <div class="row mt-2">
            <div class="col-2">
                <h2>My team</h2>
            </div>
            <div class="col-4">
                <b-dropdown variant="outline-primary" right text="Activate">
                    <b-dropdown-item>Activate</b-dropdown-item>
                    <b-dropdown-item>Deactivate</b-dropdown-item>
                    <b-dropdown-item>Buy Sudscription</b-dropdown-item>
                    <b-dropdown-item>Delete</b-dropdown-item>
                </b-dropdown>
            </div>
            <div class="col-4">
                <nav class="navbar navbar-light">
                    <form class="form-inline">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search input" aria-label="Search">
                        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </nav>
            </div>
            <div class="col-2">
                <button type="button" class="btn btn-outline-primary">Create</button>
            </div>
        </div>

        <div class="row">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th><input type="checkbox"></th>
                        <th scope="col">Sportsman</th>
                        <th scope="col">Active</th>
                        <th scope="col">Subscription expiry date</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <paginate tag="tbody" name="items" :list="items" :per="5" ref="paginator">
                    <tr v-for="item in paginated('items')">
                        <th><input type="checkbox"></th>
                        <td>{{item.name}}</td>
                        <td>{{item.username}}</td>
                        <td>{{item.phone}}</td>
                        <th>Edit</th>
                    </tr>
                </paginate>
            </table>
        </div>
        <div>
            <paginate-links for="items" :show-step-links="true" :limit="2" :step-links="{ next: 'Next', prev: 'Previous'}"></paginate-links>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "coach-my-team",
    components: {
    },
    data: function () {
        return {
            items: [],
            paginate: ['items']
        }
    },
    mounted() {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => this.items = response.data)
            .catch(error => console.log(error));
    },
    methods: {
    }
}
</script>

<style lang="scss">
    .navbar-light {
        margin-top: -8px;
    }

    .paginate-links {
        user-select: none;
        margin: 0 10px;
        list-style: none;
        li {
            margin: 0 10px;
            list-style: none;
            display: inline-block;
            color: #0069d9;
            a {
                cursor: pointer;
            }
        }
        li.active a {
            font-weight: bold;
        }
        li.next:before {
            content: ' | ';
            margin-right: 13px;
            color: #ddd;
        }
        li.disabled a {
            color: #ccc;
            cursor: no-drop;
        }
    }
</style>