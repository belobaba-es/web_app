import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProfileIndex from '../views/profile/Index.vue'
import Deposit from '../views/deposit/Deposit.vue'
import Login from '../views/login/Index.vue'
import Withdraw from '../views/withdraw/Withdraw.vue'
import SwapIndexVue from '../views/swap/Index.vue'
import SwapSuccess from '../views/swap/Success.vue'

import WalletIndex from '../views/wallet/Wallet.vue'
import TransactionHistoryWallet from '../views/wallet/Transaction.vue'

import TransactionHistory from '../views/transaction-history/Index.vue'
import RecoveryTwoFactorAuth from '../views/recovery-two-factor-auth/Index.vue'
import BusinessPartners from '../views/profile/businessAllie/BusinessPartners.vue'

import UploadDocumentsIndex from '../views/onboarding/index.vue'

import { useAuth } from '../composables/useAuth'
import { routerUSA } from './routerUSA'
import { routerPanama } from './routerPanama'
import { routerInternalTransfer } from './routerInternalTransfer'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/forgot-password',
    component: () => import('../views/forgot-password/ForgotPassword.vue'),
  },
  {
    path: '/recovery-two-factor-auth',
    component: RecoveryTwoFactorAuth,
  },
  {
    path: '/create-user',
    component: () => import('../views/register/CreateUser.vue'),
  },
  {
    path: '/confirm-email/:view',
    component: () => import('../views/register/ConfirmEmail.vue'),
  },

  {
    path: '/dashboard',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/dashboard/Index.vue'),
      },
      {
        path: '/profile/:accountId',
        component: () => import('../views/profile/Profile.vue'),
        children: [
          {
            path: '',
            component: ProfileIndex,
          },
          {
            path: 'settings',
            component: () => import('../views/profile/settings/Index.vue'),
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
            component: () => import('../views/deposit/Fiat.vue'),
          },
          {
            path: 'crypto/:assetCode?',
            component: () => import('../views/deposit/Crypto.vue'),
          },
        ],
      },
      {
        path: '/withdraw',
        component: Withdraw,
      },
      {
        path: '/withdraw/noba/',
        children: routerInternalTransfer,
      },
      {
        path: '/withdraw/usa/',
        children: routerUSA,
        meta: {
          noCache: true,
        },
      },
      {
        path: '/withdraw/panama/',
        children: routerPanama,
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
            component: () => import('../views/swap/History.vue'),
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
        path: '/onboarding',
        component: () => import('../views/onboarding/index.vue'),
      },
      {
        path: '/onboarding/personal',
        meta: {
          noCache: true,
        },
        children: [
          {
            path: '',
            component: () => import('./views/onboarding/personal/index.vue'),
            children: [
              {
                path: 'personal-data',
                component: () => import('./views/onboarding/personal/PersonalData.vue'),
              },
              {
                path: 'investment-data',
                component: () => import('./views/onboarding/personal/InvestmentData.vue'),
              },
              {
                path: 'upload-documents',
                component: () => import('./views/onboarding/personal/UploadDocuments.vue'),
              },
              {
                path: 'completed',
                component: () => import('./views/onboarding/components/CompletedDocument.vue'),
              },
            ],
          },
        ],
      },
      {
        path: '/onboarding/business',
        meta: {
          noCache: true,
        },
        children: [
          {
            path: '',
            component: () => import('../views/onboarding/business/index.vue'),
            children: [
              {
                path: '',
                component: UploadDocumentsIndex,
              },
              {
                path: 'step1',
                component: () => import('../views/onboarding/business/Step1.vue'),
              },
              {
                path: 'step2',
                component: () => import('../views/onboarding/business/Step2.vue'),
              },
              {
                path: 'step3',
                component: () => import('../views/onboarding/business/Step3.vue'),
              },
              {
                path: 'step4',
                component: () => import('../views/onboarding/business/Step4.vue'),
              },
              {
                path: 'step2/new-shareholder',
                name: 'new-shareholder',
                component: () => import('../views/onboarding/business/AddOrEditShareholder.vue'),
              },
              {
                path: 'step2/edit-shareholder/:dni',
                name: 'edit-shareholder',
                component: () => import('../views/onboarding/business/AddOrEditShareholder.vue'),
              },
              {
                path: 'completed',
                component: () => import('../views/onboarding/components/CompletedDocument.vue'),
              },
            ],
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { getUserEmail } = useAuth()
  if (
    to.path !== '/' &&
    to.path !== '/create-user' &&
    !to.path.startsWith('/confirm-email/') &&
    to.path !== '/forgot-password' &&
    to.path !== '/recovery-two-factor-auth/' &&
    getUserEmail() === ''
  ) {
    next({ path: '/' })
  } else if (to.path === '/' && getUserEmail() !== '') {
    next({ path: '/dashboard' })
  } else {
    next()
  }
})

export default router
