export const routerPanama = [
  {
    path: '',
    component: () => import('../views/withdraw/fiat/AchPanama.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/withdraw/ach-panama/StepAccounts.vue'),
      },
      {
        path: 'amount',
        component: () => import('../views/withdraw/ach-panama/StepAmount.vue'),
      },
      {
        path: 'confirmation',
        component: () => import('../views/withdraw/ach-panama/StepConfirmation.vue'),
      },
    ],
  },
  {
    path: 'new',
    component: () => import('../views/withdraw/ach-panama/beneficiary/components/NewBeneficiaryPanama.vue'),
  },
]
