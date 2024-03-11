import WithdrawFiatDomestic from '../views/withdraw/fiat/DomesticAndInternational.vue'
import WithdrawFiatStepAmount from '../views/withdraw/components/WitdrawFiat/StepAmount.vue'
import WithdrawFiatStepConfirmation from '../views/withdraw/components/WitdrawFiat/StepConfirmation.vue'
import StepSuccessful from '../views/withdraw/components/InternalWithdraw/StepSuccessful.vue'

export const routerUSA = [
  {
    path: 'fiat/:type',
    component: WithdrawFiatDomestic,
    children: [
      {
        path: '',
        component: () => import('../views/withdraw/components/WitdrawFiat/StepAccounts.vue'),
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
    component: () => import('../views/withdraw/beneficiary/NewBeneficiary.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/withdraw/beneficiary/components/StepAccountNewBeneficiary.vue'),
      },
      {
        path: 'owner',
        component: () => import('../views/withdraw/beneficiary/components/StepOwnerNewBeneficiary.vue'),
      },
      {
        path: 'bank-information',
        component: () => import('../views/withdraw/beneficiary/components/StepInformationBank.vue'),
      },
    ],
  },
  {
    path: 'fiat/domestic/successful',
    component: StepSuccessful,
  },
  {
    path: 'fiat/international/new',
    component: () => import('../views/withdraw/beneficiary/NewBeneficiary.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/withdraw/beneficiary/components/StepAccountNewBeneficiary.vue'),
      },
      {
        path: 'owner',
        component: () => import('../views/withdraw/beneficiary/components/StepOwnerNewBeneficiary.vue'),
      },
      {
        path: 'intermediary-bank',
        component: () => import('../views/withdraw/beneficiary/components/StepIntermediaryBank.vue'),
      },
      {
        path: 'bank-information',
        component: () => import('../views/withdraw/beneficiary/components/StepInformationBank.vue'),
      },
    ],
  },
  {
    path: 'fiat/international/successful',
    component: StepSuccessful,
  },
]
