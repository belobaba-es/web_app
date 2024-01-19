import WithdrawFiatStepAmount from '../views/withdraw/components/AchPanama/StepAmount.vue'
import WithdrawFiatStepConfirmation from '../views/withdraw/components/AchPanama/StepConfirmation.vue'

export const routerPanama = [
  {
    path: '',
    component: () => import('../views/withdraw/components/AchPanama/StepAccounts.vue'),
  },
  {
    path: 'amount',
    component: WithdrawFiatStepAmount,
  },
  {
    path: 'confirmation',
    component: WithdrawFiatStepConfirmation,
  },
]
