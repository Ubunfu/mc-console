
<template>
    <div id="dashboard">
        <Banner/>
        <div v-if="authenticated">
            Authenticated! 
            <div class="button-start" @click="startServer(idToken)">Start a Server</div>
            <div v-if="startingServer">Starting a new server, hang tight...</div>
            <div v-if="gotServers">
                <ServerCard v-bind:key="server.instanceId" v-for="server in serverList" :server="server" :idToken="idToken"/>
            </div>
            <div v-else>Loading servers...</div>
        </div>
        <div v-else-if="error">
            <FatalError :msg="errorMsg" />
        </div>
        <div v-else>Loading...</div>
    </div>
</template>

<script>
// Import leveraged components
import Banner from '@/components/Banner'
import ServerCard from '@/components/ServerCard'
import FatalError from '@/components/FatalError'

export default {
    name: 'Dashboard',
    components: {
        Banner,
        ServerCard,
        FatalError
    },
    data() {
        return {
            authenticated: false,
            error: false,
            errorMsg: '',
            idToken: '',
            gotServers: false,
            startingServer: false,
            serverList: [],
            idTokenCookieName: 'idToken'
        }
    },
    created: async function() {
        const idToken = await this.getIdToken();
        this.idToken = idToken;
        // eslint-disable-next-line
        console.log('idToken: ' + idToken)
        if (idToken != null) {
            this.serverList = await this.getServerList(idToken);
        }
    },
    methods: {
        getIdToken: async function () {
            var tokenFromCookie = await this.getIdTokenCookie(this.idTokenCookieName);
            if (tokenFromCookie.length > 0) {
                // eslint-disable-next-line
                console.log('Found valid ID Token cookie: ' + tokenFromCookie);
                this.authenticated = true;
                return tokenFromCookie;
            } else {
                // eslint-disable-next-line
                console.log('Could not find valid ID token cookie :(');
                let newTokens = await this.getCognitoToken();
                if (newTokens.id_token) {
                    this.authenticated = true;
                    await this.storeTokenInCookie(this.idTokenCookieName, newTokens.id_token);
                    return newTokens.id_token;
                }
            }
        },
        storeTokenInCookie: async function(cookieName, idToken) {
            try {
                document.cookie = cookieName + '=' + idToken + '; expires=' + new Date(new Date().getTime()+60*1000*30).toGMTString() + ';';
            } catch (error) {
                // eslint-disable-next-line
                console.log('Error setting ID token cookie!: ' + error);
            }
        },
        getIdTokenCookie: async function (cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
            }
            return "";
        },
        startServer: async function (idToken) {
            this.startingServer=true;
            const resp = await fetch('https://api.ryanallen.ninja/mc/server/start', {
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
            const resp = await fetch('https://api.ryanallen.ninja/mc/server/list', {
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
            const respJson = await resp.json();
            if (resp.status != 200) {
                this.error = true;
                this.errorMsg = 'User authentication failed!';
                // eslint-disable-next-line
                console.log('Error authenticating with Cognito!: HTTP ' + resp.status + ' : ' + JSON.stringify(respJson));
            }
            return respJson;
        }
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