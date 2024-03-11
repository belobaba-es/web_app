export const routerPanama = [
  {
    path: '',
    component: () => import('../views/withdraw/fiat/AchPanama.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/withdraw/AchPanama/StepAccounts.vue'),
      },
      {
        path: 'amount',
        component: () => import('../views/withdraw/AchPanama/StepAmount.vue'),
      },
      {
        path: 'confirmation',
        component: () => import('../views/withdraw/AchPanama/StepConfirmation.vue'),
      },
    ],
  },
  {
    path: 'new',
    component: () => import('../views/withdraw/AchPanama/beneficiary/components/NewBeneficiaryPanama.vue'),
  },
]
