import Vue from 'vue';
import Router from 'vue-router';

// Import components to route to
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';
import ResourcePacks from '@/components/ResourcePacks';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home Page',
            component: Home
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/packs',
            name: 'ResourcePacks',
            component: ResourcePacks
        }
    ]
})