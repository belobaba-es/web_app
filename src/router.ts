import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from './views/dashboard/Dashboard.vue'
import Profile from './views/profile/Profile.vue'
import ProfileIndex from './views/profile/Index.vue'
import Partners from './views/profile/Partners.vue'
import Documents from './views/profile/Documents.vue'
import Settings from './views/profile/Settings.vue'
import Edit from './views/profile/Edit.vue'
import Deposit from './views/deposit/Deposit.vue'
import DepositFiat from './views/deposit/Fiat.vue'
import DepositCrypto from './views/deposit/Crypto.vue'
import PartnersEditDocument from './views/profile/PartnersEditDocuments.vue'
import Login from './views/login/Login.vue'
import Withdraw from './views/withdraw/Withdraw.vue'
import { useUserStore } from './stores/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/profile/:accountId',
        component: Profile,
        children: [
          {
            path: '',
            component: ProfileIndex,
          },
          {
            path: 'edit',
            component: Edit,
          },
          {
            path: 'partners',
            component: Partners,
          },
          {
            path: 'documentation',
            component: Documents,
          },
          {
            path: 'documentation/company/edit',
            component: PartnersEditDocument,
          },
          {
            path: 'settings',
            component: Settings,
          },
        ],
      },
      {
        path: '/deposit',
        children: [
          {
            path: '',
            component: Deposit,
          },
          {
            path: 'fiat',
            component: DepositFiat,
          },
          {
            path: 'crypto',
            component: DepositCrypto,
          },
        ],
      },
      {
        path: '/withdraw',
        children: [
          {
            path: '',
            component: Withdraw,
          },
          {
            path: 'fiat',
            component: DepositFiat,
          },
          {
            path: 'crypto',
            component: DepositCrypto,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.path === '/' && userStore.getUser) next({ path: '/dashboard' });
  else if (to.meta.requiresAuth && !userStore.getUser) next({ path: '/' });
  next();
})

export default router;
