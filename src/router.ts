import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProfileIndex from './views/profile/Index.vue'
import Deposit from './views/deposit/Deposit.vue'
import DepositCrypto from './views/deposit/Crypto.vue'
import Login from './views/login/Index.vue'
import Withdraw from './views/withdraw/Withdraw.vue'
import InternalWithdraw from './views/withdraw/InternalWithdraw.vue'
import WithdrawFiatDomestic from './views/withdraw/fiat/Domestic.vue'
import StepAmount from './views/withdraw/components/InternalWithdraw/StepAmount.vue'
import StepAccounts from './views/withdraw/components/InternalWithdraw/StepAccounts.vue'
import StepConfirmation from './views/withdraw/components/InternalWithdraw/StepConfirmation.vue'

import NewBeneficiary from './views/withdraw/components/NewBeneficiary.vue'
import StepAccountNewBeneficiary from './views/withdraw/components/NewBeneficiary/StepAccountNewBeneficiary.vue'
import StepOwnerNewBeneficiary from './views/withdraw/components/NewBeneficiary/StepOwnerNewBeneficiary.vue'
import StepIntermediaryBank from './views/withdraw/components/NewBeneficiary/StepIntermediaryBank.vue'
import StepBankNewBeneficiary from './views/withdraw/components/NewBeneficiary/StepBankNewBeneficiary.vue'

import StepSuccessful from './views/withdraw/components/InternalWithdraw/StepSuccessful.vue'

import WithdrawFiatStepAccounts from './views/withdraw/components/WitdrawFiat/StepAccounts.vue'
import WithdrawFiatStepAmount from './views/withdraw/components/WitdrawFiat/StepAmount.vue'
import WithdrawFiatStepConfirmation from './views/withdraw/components/WitdrawFiat/StepConfirmation.vue'
import SwapIndexVue from './views/swap/Index.vue'
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
import BusinessPartners from './views/profile/businessAllie/BusinessPartners.vue'

import UploadDocumentsIndex from './views/onboarding/index.vue'

import CreateUser from './views/register/CreateUser.vue'
import ConfirmEmail from './views/register/ConfirmEmail.vue'
import { useAuth } from './composables/useAuth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/forgot-password',
    component: () => import('./views/forgot-password/ForgotPassword.vue'),
  },
  {
    path: '/recovery-two-factor-auth',
    component: RecoveryTwoFactorAuth,
  },
  {
    path: '/create-user',
    component: CreateUser,
  },
  {
    path: '/confirm-email',
    component: ConfirmEmail,
  },

  {
    path: '/dashboard',
    component: () => import('./views/dashboard/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('./views/dashboard/Index.vue'),
      },
      {
        path: '/profile/:accountId',
        component: () => import('./views/profile/Profile.vue'),
        children: [
          {
            path: '',
            component: ProfileIndex,
          },
          {
            path: 'settings',
            component: () => import('./views/profile/settings/Index.vue'),
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
            component: () => import('./views/deposit/Fiat.vue'),
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
            component: NewBeneficiary,
            children: [
              {
                path: '',
                component: StepAccountNewBeneficiary,
              },
              {
                path: 'owner',
                component: () => import('./views/withdraw/components/NewBeneficiary/StepOwnerNewBeneficiary.vue'),
              },
              {
                path: 'bank-information',
                component: StepBankNewBeneficiary,
              },
            ],
          },
          {
            path: 'fiat/domestic/successful',
            component: StepSuccessful,
          },
          {
            path: 'fiat/international/new',
            component: NewBeneficiary,
            children: [
              {
                path: '',
                component: StepAccountNewBeneficiary,
              },
              {
                path: 'owner',
                component: StepOwnerNewBeneficiary,
              },
              {
                path: 'intermediary-bank',
                component: StepIntermediaryBank,
              },
              {
                path: 'bank-information',
                component: StepBankNewBeneficiary,
              },
            ],
          },
          {
            path: 'fiat/international/successful',
            component: StepSuccessful,
          },
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
            component: () => import('./views/swap/History.vue'),
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
        component: () => import('./views/onboarding/index.vue'),
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
                path: 'step1',
                component: () => import('./views/onboarding/personal/Step1.vue'),
              },
              {
                path: 'step2',
                component: () => import('./views/onboarding/personal/Step2.vue'),
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
            component: () => import('./views/onboarding/business/index.vue'),
            children: [
              {
                path: '',
                component: UploadDocumentsIndex,
              },
              {
                path: 'step1',
                component: () => import('./views/onboarding/business/Step1.vue'),
              },
              {
                path: 'step2',
                component: () => import('./views/onboarding/business/Step2.vue'),
              },
              {
                path: 'step3',
                component: () => import('./views/onboarding/business/Step3.vue'),
              },
              {
                path: 'step4',
                component: () => import('./views/onboarding/business/Step4.vue'),
              },
              {
                path: 'step2/new-shareholder',
                name: 'new-shareholder',
                component: () => import('./views/onboarding/business/AddOrEditShareholder.vue'),
              },
              {
                path: 'step2/edit-shareholder/:dni',
                name: 'edit-shareholder',
                component: () => import('./views/onboarding/business/AddOrEditShareholder.vue'),
              },
              {
                path: 'completed',
                component: () => import('./views/onboarding/components/CompletedDocument.vue'),
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
    to.path !== '/confirm-email' &&
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
