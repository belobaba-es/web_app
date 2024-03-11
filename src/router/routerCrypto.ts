import OtherPlatFormsWallets from '../views/withdraw/crypto/OtherPlatformsWallets.vue'
import WithdrawOtherPlatformsStepConfirmation from '../views/withdraw/components/OtherPlatformsWallets/StepConfirmation.vue'

export const routerCrypto = [
  {
    path: 'other',
    component: OtherPlatFormsWallets,
    children: [
      {
        path: '',
        component: () => import('../views/withdraw/components/OtherPlatformsWallets/StepAccounts.vue'),
      },
      {
        path: 'amount',
        component: () => import('../views/withdraw/components/OtherPlatformsWallets/StepAmount.vue'),
      },
      {
        path: 'confirmation',
        component: WithdrawOtherPlatformsStepConfirmation,
      },
    ],
  },
  {
    path: '/withdraw/crypto/other/add-beneficiary',
    component: () => import('../views/withdraw/crypto/AddBeneficiary.vue'),
  },
]
