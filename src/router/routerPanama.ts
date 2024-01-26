import WithdrawFiatStepAmount from '../views/withdraw/AchPanama/StepAmount.vue'
import WithdrawFiatStepConfirmation from '../views/withdraw/AchPanama/StepConfirmation.vue'

export const routerPanama = [
  {
    path: '',
    component: () => import('../views/withdraw/AchPanama/StepAccounts.vue'),
    children: [
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
]
