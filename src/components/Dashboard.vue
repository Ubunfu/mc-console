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
        await this.getCognitoToken();
    },
    methods: {
        getCognitoToken: async function () {
            const resp = await fetch('https://httpbin.org/headers');
            const headers = await resp.json();
            this.authenticated=true;
            this.cognitoToken=headers;
        }
    },
    components: {
        Banner
    }
}
</script>

<style>

</style>