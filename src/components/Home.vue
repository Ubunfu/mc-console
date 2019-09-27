<template>
  <div id="home">
    <Banner/>
    <a href="https://minecraft-ryanallen-ninja.auth.us-east-2.amazoncognito.com/login?client_id=1l9ec2re465bo5rc3d6ihlcrla&response_type=code&redirect_uri=https://eager-jang-9f2469.netlify.com/dashboard">
        <div class="button-login">
            Log In Now!
        </div>
    </a>
    <ServerCard v-bind:key="server.instanceId" v-for="server in serverList" :server="server"/>
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import ServerCard from '@/components/ServerCard'
export default {
    name: 'Home',
    components: {
        Banner,
        ServerCard
    },
    data() {
        return {
            serverList:  [ 
              { 
                "instanceId": "i-0d5372eb1ccf7c149", 
                "instanceState": "running", 
                "publicDnsName": "ec2-13-59-204-221.us-east-2.compute.amazonaws.com" 
              }
            ]
        };
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