<template>
    <div class="tournaments-cabinet">Tournaments
    </div>
</template>
<script>
    import axios from "axios";

    export default {
        name: "tournaments-cabinet",
        data: function () {
            return {
                tournaments: {
                    'tournament1': {
                        'name': '',
                        'federation_id': '',
                        '2001_2003': {
                            'male': {
                                52: {
                                    'id': {
                                        'id': '',
                                        'isPermit': true,
                                    }
                                }
                            },
                            'female': {}
                        },
                        '2004_2006': {
                            'male': {
                                52: {
                                    'id': ''
                                }
                            },
                            'female': {}
                        }
                    }

                }
            };
        },
        mounted() {
        }
    };
</script>
