<template>
  <div id="app">
    <Banner/>
    <ServerCard />
    <ServerCard />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Banner from './components/Banner.vue'
import ServerCard from './components/ServerCard.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Banner,
    ServerCard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: gray;
  margin-top: 60px;
}
</style>
