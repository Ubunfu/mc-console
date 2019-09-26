<template>
  <div id="home">
    <Banner/>
    <a href="https://minecraft-ryanallen-ninja.auth.us-east-2.amazoncognito.com/login?client_id=1l9ec2re465bo5rc3d6ihlcrla&response_type=code&redirect_uri=https://eager-jang-9f2469.netlify.com/dashboard">
        <div class="button-login">
            Log In Now!
        </div>
    </a>
    <div>{{responseMessage}}</div>
  </div>
</template>

<script>
import Banner from '@/components/Banner'
export default {
    name: 'Home',
    components: {
        Banner
    },
    data() {
        return {
            responseMessage: "Empty"
        };
    },
    methods: {
        loginFunction: async function () {
            // const resp = await fetch('https://httpbin.org/headers');
            // const data = await resp.json();
        }
    }
}   
</script>

<style>
.button-login {
  padding: 10px 30px;
  width: 150px;
  background-color: chartreuse;
}

</style>