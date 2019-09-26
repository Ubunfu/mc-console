import Vue from 'vue';
import Router from 'vue-router';

// Import components to route to
import Home from '@/components/Home';
import TokenExchange from '@/components/TokenExchange';
import Dashboard from '@/components/Dashboard';

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
            path: '/oauth2/token',
            name: 'Token Exchange',
            component: TokenExchange
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        }
    ]
})