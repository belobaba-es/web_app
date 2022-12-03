import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from './views/dashboard/Dashboard.vue'
import Profile from './views/profile/Profile.vue'
import ProfileIndex from './views/profile/Index.vue'
import Partners from './views/profile/Partners.vue'
import Settings from './views/profile/Settings.vue'
import Edit from './views/profile/Edit.vue'
import Deposit from './views/deposit/Deposit.vue'
import DepositFiat from './views/deposit/Fiat.vue'
import DepositCrypto from './views/deposit/Crypto.vue'
import Login from './views/login/Login.vue'
import Withdraw from './views/withdraw/Withdraw.vue'
import { useUserStore } from './stores/user'
import InternalWithdraw from './views/withdraw/InternalWithdraw.vue'
import WithdrawFiatDomestic from './views/withdraw/fiat/Domestic.vue'
import StepAmount from './views/withdraw/components/InternalWithdraw/StepAmount.vue'
import DocumentsPerson from './views/profile/DocumentsPerson.vue'
import DocumentsCompany from './views/profile/DocumentsCompany.vue'
import NewPartner from './views/profile/NewPartner.vue'
import StepAccounts from './views/withdraw/components/InternalWithdraw/StepAccounts.vue'
import StepConfirmation from './views/withdraw/components/InternalWithdraw/StepConfirmation.vue'
import NewBeneficiaryDomestic from './views/withdraw/components/NewBeneficiaryDomestic.vue'
import NewBeneficiaryInternational from './views/withdraw/components/NewBeneficiaryInternational.vue'
import StepSuccessful from './views/withdraw/components/InternalWithdraw/StepSuccessful.vue'
import DashboardIndex from './views/dashboard/Index.vue'
import ForgotPassword from './views/forgot-password/ForgotPassword.vue'

import WithdrawFiatStepAccounts from './views/withdraw/components/WitdrawFiat/StepAccounts.vue'
import WithdrawFiatStepAmount from './views/withdraw/components/WitdrawFiat/StepAmount.vue'
import WithdrawFiatStepConfirmation from './views/withdraw/components/WitdrawFiat/StepConfirmation.vue'
import SwapIndexVue from './views/swap/Index.vue'
import SwapHistory from './views/swap/History.vue'
import SwapSuccess from './views/swap/Success.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        component: DashboardIndex,
      },
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
            path: 'noba/:type',
            component: InternalWithdraw,
            children: [
              {
                path: '',
                component: StepAccounts,
              },
              {
                path: 'amount',
                component: StepAmount,
              },
              {
                path: 'confirmation',
                component: StepConfirmation,
              },
            ],
          },
          {
            path: 'fiat/:type',
            component: WithdrawFiatDomestic,
            children: [
              {
                path: '',
                component: WithdrawFiatStepAccounts,
              },
              {
                path: 'amount',
                component: WithdrawFiatStepAmount,
              },
              {
                path: 'confirmation',
                component: WithdrawFiatStepConfirmation,
              },
            ],
          },
          {
            path: 'fiat/domestic/new',
            component: NewBeneficiaryDomestic,
          },
          {
            path: 'fiat/domestic/successful',
            component: StepSuccessful,
          },
          {
            path: 'fiat/international/new',
            component: NewBeneficiaryInternational,
          },
          {
            path: 'fiat/international/successful',
            component: StepSuccessful,
          },
          // {
          //   path: 'fiat/international',
          //   component: WithdrawFiatInternational,
          //   children: [
          //     {
          //       path: '',
          //       component: WithdrawFiatStepAccounts,
          //     },
          //     {
          //       path: 'amount',
          //       component: WithdrawFiatStepAmount,
          //     },
          //     {
          //       path: 'confirmation',
          //       component: WithdrawFiatStepConfirmation,
          //     },
          //   ],
          // },

          {
            path: 'crypto',
            component: DepositCrypto,
          },
        ],
      },
      {
        path: '/swap',
        children: [
          {
            path: '',
            component: SwapIndexVue
          },
          {
            path: 'history',
            component: SwapHistory
          },
          {
            path: 'success',
            component: SwapSuccess
          }
        ]
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.path !== '/' && to.path !== '/forgot-password' && !userStore.getUser) {
    next({ path: '/' })
  } else if (to.path === '/' && userStore.getUser) {
    next({ path: '/dashboard' })
  } else if (
    userStore.getUser &&
    userStore.getUser.account.status !== 'opened' &&
    ['/deposit', '/withdraw'].includes(to.path)
  ) {
    next({ path: '/dashboard' })
  } else {
    next()
  }
})

export default router
