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
import WithdrawFiat from './views/withdraw/Fiat.vue'
import WithdrawCrypto from './views/withdraw/Crypto.vue'
import { useUserStore } from './stores/user'
import WithdrawFiatNoba from './views/withdraw/fiat/Noba.vue'
import WithdrawFiatDomestic from './views/withdraw/fiat/Domestic.vue'
import WithdrawFiatInternational from './views/withdraw/fiat/International.vue'
import StepAmount from './views/withdraw/components/StepAmount.vue'
import WithdrawCryptoNoba from './views/withdraw/crypto/Noba.vue'
import DocumentsPerson from './views/profile/DocumentsPerson.vue'
import DocumentsCompany from './views/profile/DocumentsCompany.vue'
import NewPartner from './views/profile/NewPartner.vue'
import StepAccounts from './views/withdraw/components/StepAccounts.vue'
import StepConfirmation from './views/withdraw/components/StepConfirmation.vue'
import NewBeneficiaryDomestic from './views/withdraw/components/NewBeneficiaryDomestic.vue'
import NewBeneficiaryInternational from './views/withdraw/components/NewBeneficiaryInternational.vue'



const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/dashboard',
    component: Dashboard,
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
            path: 'partners/create',
            component: NewPartner,
          },
          {
            path: 'partners/show/:contactId',
            component: ProfileIndex,
          },
          {
            path: 'partners/edit/:contactId',
            component: Edit,
          },
          {
            path: 'documentation/person',
            component: DocumentsPerson,
          },
          {
            path: 'documentation/company',
            component: DocumentsCompany,
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
            path: 'fiat/noba',
            component:  WithdrawFiatNoba,
            children: [
              {
                path: '',
                component:  StepAccounts,
              },
              {
                path: 'amount',
                component: StepAmount
              },
              {
                path: 'comfirmation',
                component: StepConfirmation
              },

            ]
          },
          {
            path: 'fiat/domestic/new',
            component: NewBeneficiaryDomestic,
          },
          {
            path: 'fiat/domestic',
            component: WithdrawFiatDomestic,
            children: [
              {
                path: '',
                component:  StepAccounts,
              },
              {
                path: 'amount',
                component: StepAmount
              },
              {
                path: 'comfirmation',
                component: StepConfirmation
              },
            ]
          },
          {
            path: 'fiat/international',
            component: WithdrawFiatInternational
          },
          {
            path: 'fiat/international/new',
            component: NewBeneficiaryInternational
          },
          {
            path: 'crypto',
            component: DepositCrypto,
          },
          {
            path: 'crypto/noba',
            component: WithdrawCryptoNoba,
            children: [
              {
                path: '',
                name: 'withdraw-crypto-noba',
                component: StepAccounts

              },
              {
                path: 'amount',
                name: 'withdraw-crypto-noba-amount',
                component: StepAmount 
              },
              {
                path: 'confirmation',
                name: 'withdraw-crypto-noba-confirmation',
                component: StepConfirmation 
              }
            ]
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
  // if (to.path === '/' && userStore.getUser) next({ path: '/dashboard' });
  // else if (to.meta.requiresAuth && !userStore.getUser) next({ path: '/' });
  // next();
  if (to.path !== '/' && !userStore.getUser)  {
    next({ path: '/' })
  } else if (to.path === '/' && userStore.getUser){
    next({ path: '/dashboard' })
  } else {
    next()
  }
})

export default router;
