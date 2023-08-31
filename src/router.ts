import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from './views/dashboard/Dashboard.vue'
import Profile from './views/profile/Profile.vue'
import ProfileIndex from './views/profile/Index.vue'
import Partners from './views/profile/Partners.vue'
import Settings from './views/profile/settings/Index.vue'
import Edit from './views/profile/Edit.vue'
import Deposit from './views/deposit/Deposit.vue'
import DepositFiat from './views/deposit/Fiat.vue'
import DepositCrypto from './views/deposit/Crypto.vue'
import Login from './views/login/Index.vue'
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
import OtherPlatFormsWallets from './views/withdraw/crypto/OtherPlatformsWallets.vue'
import WithdrawOtherPlatformsStepAccounts from './views/withdraw/components/OtherPlatformsWallets/StepAccounts.vue'
import WithdrawOtherPlatformsStepAmount from './views/withdraw/components/OtherPlatformsWallets/StepAmount.vue'
import WithdrawOtherPlatformsStepConfirmation from './views/withdraw/components/OtherPlatformsWallets/StepConfirmation.vue'
import AddBeneficiary from './views/withdraw/crypto/AddBeneficiary.vue'

import WalletIndex from './views/wallet/Wallet.vue'
import TransactionHistoryWallet from './views/wallet/Transaction.vue'

import TransactionHistory from './views/transaction-history/Index.vue'
import RecoveryTwoFactorAuth from './views/recovery-two-factor-auth/Index.vue'
import BusinessPartners from './views/profile/BusinessPartners/BusinessPartners.vue'
import UploadDocumentsIndex from './views/upload-documents/index.vue'

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
    path: '/recovery-two-factor-auth',
    component: RecoveryTwoFactorAuth,
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
          {
            path: 'business-partners',
            component: BusinessPartners,
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
            path: 'crypto/:assetCode?',
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
            path: 'crypto/other',
            component: OtherPlatFormsWallets,
            children: [
              {
                path: '',
                component: WithdrawOtherPlatformsStepAccounts,
              },
              {
                path: 'amount',
                component: WithdrawOtherPlatformsStepAmount,
              },
              {
                path: 'confirmation',
                component: WithdrawOtherPlatformsStepConfirmation,
              },
            ],
          },
          {
            path: 'crypto/other/add-beneficiary',
            component: AddBeneficiary,
          },
        ],
        meta: {
          noCache: true,
        },
      },
      {
        path: '/swap',
        children: [
          {
            path: '',
            component: SwapIndexVue,
          },
          {
            path: 'history',
            component: SwapHistory,
          },
          {
            path: 'success',
            component: SwapSuccess,
          },
        ],
      },
      {
        path: '/wallet',
        children: [
          {
            path: '',
            component: WalletIndex,
          },
          {
            path: 'transactions/:assetCode',
            component: TransactionHistoryWallet,
          },
        ],
      },
      {
        path: '/transaction-history',
        children: [
          {
            path: '',
            component: TransactionHistory,
          },
        ],
      },
      {
        path: '/upload-documents',
        component: UploadDocumentsIndex,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  console.log(to.path)
  if (
    to.path !== '/' &&
    to.path !== '/forgot-password' &&
    to.path !== '/recovery-two-factor-auth/' &&
    !userStore.getUser
  ) {
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
