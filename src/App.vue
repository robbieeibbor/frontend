<template>
<h1>Emissions Without Omissions</h1>
<div class="page-links">
      <router-link v-if="!isHomePage" to="/">Home</router-link>
      <span class="link-space"></span>
      <router-link v-if="currentPage !=='About'" to="/aboutpage">About</router-link>
      <span class="link-space"></span>
      <router-link v-if="currentPage !=='ETS Scheme'" to="/ets-scheme">ETS Scheme</router-link>
      <span class="link-space"></span>
      <router-link v-if="currentPage !=='Available Ships'" to="/available-ships">Available Ships</router-link>
      <span class="link-space"></span>
      <router-link v-if="currentPage !=='Methodology'" to="/methodology">Methodology</router-link>
      <span class="link-space"></span>
      <router-view v-if="!isHomePage" :key="$route.fullPath"></router-view>
    </div>
    <div id="app">
     <div class="flex-container">
  
    <HereMap  v-if= "isHomePage" :center="center" :ship-name="userShipName" />
     </div>
    </div>
</template>

<script>
import HereMap from './components/HereMap';

export default {
  name: 'app',
  components: {
    HereMap,
  },
  data() {
return {
    userShipName:'',

  center:{ 
lat: 0, 
lng: 100
    },
  }
  
  },
computed: {
    isHomePage() {
      return this.$route.path === '/';
    },
    currentPage() {
    const routePath = this.$route.path;

    // Map route paths to corresponding page names
    const pageMappings = {
      '/': 'Home',
      '/aboutpage': 'About',
      '/ets-scheme': 'ETS Scheme',
      '/available-ships': 'Available Ships',
      '/methodology': 'Methodology',
      '/contact': 'Contact',
    };

    console.log("page ",routePath)
    return pageMappings[routePath] || 'Unknown Page';
    
  },

},
    watch: {
    userShipName(newVal) {
      console.log("Ship Name:", newVal);
      
    },
  },
}
</script>

<style>
.flex-container{
  display: flex;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.link-space {
  margin-right: 10px;
}
</style>
