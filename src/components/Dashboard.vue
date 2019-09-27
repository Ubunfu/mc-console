<template>
    <div id="dashboard">
        <Banner/>
        <div v-if="authenticated">
            Authenticated! Token is: {{ cognitoToken }}
        </div>
        <div v-else>Loading...</div>
    </div>
</template>

<script>
// Import leveraged components
import Banner from '@/components/Banner'

export default {
    name: 'Dashboard',
    data() {
        return {
            authenticated: false,
            cognitoToken: ""
        }
    },
    created: async function() {
        const tokens = await this.getCognitoToken();
        this.cognitoToken = await tokens.id_token;
    },
    methods: {
        getCognitoToken: async function () {

            const authCode = this.$route.query.code;

            alert("code is: " + authCode);

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
        Banner
    }
}
</script>

<style>

</style>