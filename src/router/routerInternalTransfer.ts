import InternalWithdraw from '../views/withdraw/InternalWithdraw.vue'
import StepAccounts from '../views/withdraw/components/InternalWithdraw/StepAccounts.vue'
import StepConfirmation from '../views/withdraw/components/InternalWithdraw/StepConfirmation.vue'

export const routerInternalTransfer = [
  {
    path: ':type',
    component: InternalWithdraw,
    children: [
      {
        path: '',
        component: StepAccounts,
      },
      {
        path: 'amount',
        component: () => import('../views/withdraw/components/InternalWithdraw/StepAmount.vue'),
      },
      {
        path: 'confirmation',
        component: StepConfirmation,
      },
    ],
  },
]
