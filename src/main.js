
import { createApp } from 'vue';
import App from './App.vue';
import AboutPage from './components/AboutPage.vue'; 
import AvailableShips from './components/AvailableShips.vue'; 
import EtsScheme from './components/EtsScheme.vue'; 
import { createRouter, createWebHistory } from 'vue-router';
import MethodologyPage from './components/MethodologyPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: App },
    { path: '/aboutpage', component: AboutPage }, 
    { path: '/available-ships', component: AvailableShips },
    { path: '/ets-scheme', component: EtsScheme },
    { path: '/methodology', component: MethodologyPage }

  ],
});

createApp(App).use(router).mount('#app');
