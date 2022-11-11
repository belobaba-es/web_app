import {createRouter, createWebHistory} from "vue-router";
import Home from './views/Home.vue'
import Contact from './views/Contact.vue'
import Dashboard from './views/dashboard/Dashboard.vue'
import Profile from './views/profile/Profile.vue'
import ProfileIndex from './views/profile/Index.vue'
import Partners from "./views/profile/Partners.vue";
import Documents from "./views/profile/Documents.vue";
import Settings from "./views/profile/Settings.vue";
import Edit from "./views/profile/Edit.vue";
import Deposit from "./views/deposit/Deposit.vue";
import DepositFiat from "./views/deposit/Fiat.vue"

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Dashboard,
            children: [
                {
                    path: '/profile',
                    component: Profile,
                    children: [
                        {
                            path: '',
                            component: ProfileIndex
                        },
                        {
                            path: 'edit/:id',
                            component: Edit
                        },
                        {
                            path: 'partners',
                            component: Partners
                        },
                        {
                            path: 'documentation',
                            component: Documents,
                        },
                        {
                            path: 'settings',
                            component: Settings
                        }
                    ]
                },
                {
                    path: '/deposit',
                    children: [
                        {
                            path: '',
                            component: Deposit
                        },
                        {
                            path: 'fiat',
                            component: DepositFiat
                        },
                        {
                            path: 'crypto',
                            component: DepositFiat
                        }
                    ]
                },
            ]
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact

        }
    ],
})
