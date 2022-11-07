import {createRouter, createWebHistory} from "vue-router";
import Home from './views/Home.vue'
import Contact from './views/Contact.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/contact',
            component: Contact
        }
    ],
})
