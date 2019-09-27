
<template>
    <div id="dashboard">
        <Banner/>
        <div v-if="authenticated">
            Authenticated! 
            <div class="button-start" @click="startServer(idToken)">Start a Server</div>
            <div v-if="startingServer">Starting a new server, hang tight...</div>
            <div v-if="gotServers">
                <ServerCard v-bind:key="server.instanceId" v-for="server in serverList" :server="server"/>
            </div>
            <div v-else>Loading servers...</div>
        </div>
        <div v-else>Loading...</div>
    </div>
</template>

<script>
// Import leveraged components
import Banner from '@/components/Banner'
import ServerCard from '@/components/ServerCard'

export default {
    name: 'Dashboard',
    data() {
        return {
            authenticated: false,
            idToken: '',
            gotServers: false,
            startingServer: false,
            serverList: []
        }
    },
    created: async function() {
        const tokens = await this.getCognitoToken();
        const idToken = await tokens.id_token;
        this.idToken = idToken;
        // eslint-disable-next-line
        console.log('idToken: ' + idToken)
        if (idToken != null) {
            this.serverList = await this.getServerList(idToken);
        }
    },
    methods: {
        startServer: async function (idToken) {
            this.startingServer=true;
            const resp = await fetch('https://ablsu41v22.execute-api.us-east-2.amazonaws.com/dev/server/start', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + idToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'region': 'us-east-2','subnetId': 'subnet-01509367f8ea39127','templateName': 'mc-server-template-1.14.4'})
            });
            if (await resp.status == 200) {
                const respJson = await resp.json();
                // eslint-disable-next-line
                console.log('resp: ' + JSON.stringify(respJson))
                alert('Server ' + respJson.instanceId + ' is on it\'s way up!  Just a moment...');
                this.startingServer=false;
            }

        },
        getServerList: async function (idToken) {
            const resp = await fetch('https://ablsu41v22.execute-api.us-east-2.amazonaws.com/dev/server/list', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ' + idToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({region: 'us-east-2'})
            });
            
            if (await resp.status == 200) {
                this.gotServers = true;
                const respJson = await resp.json();
                // eslint-disable-next-line
                console.log('resp: ' + JSON.stringify(respJson))
                return respJson.instanceList;
            }
        },
        getCognitoToken: async function () {

            const authCode = this.$route.query.code;

            const resp = await fetch('https://minecraft-ryanallen-ninja.auth.us-east-2.amazoncognito.com/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "grant_type=authorization_code&client_id=1l9ec2re465bo5rc3d6ihlcrla&code="+authCode+"&redirect_uri=https%3A%2F%2Feager-jang-9f2469.netlify.com%2Fdashboard"
            });
            if (resp.status == 200) {
                this.authenticated = true;
                const respJson = await resp.json();
                return respJson;
            }
        }
    },
    components: {
        Banner,
        ServerCard
    }
}
</script>

<style>
.button-start {
  padding: 10px 30px;
  width: 150px;
  background-color: chartreuse;
  color: gray;
}
</style>