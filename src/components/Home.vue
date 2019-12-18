<template>
  <div id="home">
    <Banner/>
    <NavbarMain/>
    <div v-if="authenticated == false">
      <a href="https://minecraft-ryanallen-ninja.auth.us-east-2.amazoncognito.com/login?client_id=1l9ec2re465bo5rc3d6ihlcrla&response_type=code&redirect_uri=https://eager-jang-9f2469.netlify.com/dashboard">
        <div class="button-login">
          Log In Now!
        </div>
      </a>
    </div>
    <div v-else>
      <p>
        Lucky you, you're already logged in!
      </p>
      <router-link to="/dashboard">
          <div class="button-login">
              Dashboard
          </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import NavbarMain from '@/components/NavbarMain'
export default {
    name: 'Home',
    components: {
        Banner,
        NavbarMain
    },
    data() {
        return {
          authenticated: false,
          idTokenCookieName: 'idToken'
        };
    },
    created: async function () {
      const idToken = await this.getIdTokenCookie(this.idTokenCookieName);
      if (idToken) {
        this.authenticated = true;
      }
    },
    methods: {
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
        }
    }
}   
</script>

<style>
.button-login {
  padding: 10px 30px;
  width: 150px;
  background-color: chartreuse;
  color: green;
  margin: auto auto;
  border-radius: 10px;
  display: inline-block;
  font-weight: bold;
}

</style>