import {createRouter, createWebHistory} from "vue-router";
import Home from './views/Home.vue'
import Contact from './views/Contact.vue'
import Dashboard from './views/dashboard/Dashboard.vue'
export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Dashboard,
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact

        }
    ],
})
