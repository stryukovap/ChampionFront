<template>
    <div class="certificate-content">
        <h2 class="certificates-h">Certificates</h2>
        <ul class="cm-sp-certificates-list user-certificates-list  d-inline-flex col-12">
            <li
                    v-for='(certificate, index) in userCertificates'
                    v-if='index < 7'
                    :key='certificate.index'>
                <a v-bind:href="certificate.link">
                    <img class="certificate-item" src="../../assets/certificate-sports.jpg">
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "userCertificates",
        data: function() {
            return {
                userCertificates: []
            };
        },
        mounted() {
            axios
                .get("https://jsonplaceholder.typicode.com/photos")
                .then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.userCertificates.push({
                            picture: response.data[i].url,
                            link: "#"
                        });
                    }
                })
                .catch(error => {
                    window.console.log(error);
                });
        }
    };
</script>

<style scoped lang="scss">


    .user-certificates-list {
        /*max-width: 1110px;*/
        height: 260px;
        overflow-x: scroll;
        scrollbar-face-color: #3f88c5;
    }

    .user-certificates-list li {
        display: inline-block;
    }

    .certificates-h{
        text-align: left;
        margin-left: 47px;
        margin-top: 30px;
    }

    .certificate-item {
        margin: 15px;
        width: 245px;
        height: 200px;
        overflow:hidden;
        border-radius: 15px;
    }

    .certificate-item:hover {
        -webkit-transform: scale(1.2);
        -ms-transform: scale(1.2);
        transform: scale(1.2);
    }


    .certificate-content{
        display: flex;
        flex-direction: column;
        /*align-items: center;*/
        border-radius: 5px;
        background-color: #ffffff;
        border: solid 1px #e9e9e9;
        width: 100%;
        height: 100%;
        /*text-align: center;*/
        position: relative;
        -webkit-box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
        -moz-box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
        box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.7);
    }

</style>
