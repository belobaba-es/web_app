export const routerWithdrawal = [
  {
    path: '',
    component: () => import('../../../views/withdraw/Index.vue'),
    name: 'fiat',
    children: [
      {
        path: '',
        name: 'fiat',
        component: () => import('../../../views/withdraw/IndexFiat.vue'),
      },
      {
        path: 'fiat',
        component: () => import('../../../views/withdraw/IndexFiat.vue'),
      },
      {
        path: 'fiat/panama',
        children: [
          {
            path: '',
            component: () => import('../../../views/withdraw/fiat/panama/IndexPanama.vue'),
          },
          {
            path: 'wire-local',
            component: () => import('../../../views/withdraw/fiat/panama/components/TypeTransaction.vue'),
          },
          {
            path: 'new-beneficiary',
            component: () =>
              import('../../../views/withdraw/fiat/panama/beneficiary/components/NewBeneficiaryPanama.vue'),
          },
        ],
      },

      {
        path: 'fiat/usa',
        children: [
          {
            path: '',
            component: () => import('../../../views/withdraw/fiat/usa/IndexUsa.vue'),
          },
          {
            path: 'withdraw-type',
            component: () => import('../../../views/withdraw/fiat/usa/components/WithdrawType.vue'),
          },
        ],
      },
      {
        path: 'fiat/internal',
        children: [
          {
            path: '',
            component: () => import('../../../views/withdraw/fiat/internal/ListBeneficiaryInternalFiat.vue'),
          },
          {
            path: 'withdraw',
            component: () => import('../../../views/withdraw/fiat/internal/MakeInternalWithdraw.vue'),
          },
        ],
      },
    ],
  },

  {
    path: `fiat/usa/make-withdraw/:network`,
    children: [
      {
        path: '',
        component: () => import('../../../views/withdraw/fiat/usa/MakeWithdrawUsa.vue'),
      },
    ],
  },

  {
    path: 'fiat/usa/swift/:select',
    component: () =>
      import('../../../views/withdraw/fiat/usa/components/beneficiary/international/IndexStepBeneficiary.vue'),
    children: [
      {
        path: '',
        component: () =>
          import('../../../views/withdraw/fiat/usa/components/beneficiary/international/StepAccountNewBeneficiary.vue'),
      },
      {
        path: 'step-data-beneficiary',
        component: () =>
          import('../../../views/withdraw/fiat/usa/components/beneficiary/international/StepDataBeneficiary.vue'),
      },
      {
        path: 'bank-intermediary',
        component: () =>
          import('../../../views/withdraw/fiat/usa/components/beneficiary/international/StepIntermediaryBank.vue'),
      },
    ],
  },
  {
    path: 'fiat/usa/:type/:select',
    component: () =>
      import('../../../views/withdraw/fiat/usa/components/beneficiary/domestic/IndexBeneficiaryDomestic.vue'),
    children: [
      {
        path: '',
        component: () => import('../../../views/withdraw/fiat/usa/components/beneficiary/domestic/StepDataBank.vue'),
      },
      {
        path: 'data-beneficiary',
        component: () =>
          import('../../../views/withdraw/fiat/usa/components/beneficiary/domestic/StepDataBeneficiaryDomestic.vue'),
      },
    ],
  },

  {
    path: 'fiat/panama/withdraw-local',
    component: () => import('../../../views/withdraw/fiat/panama/WithdrawLocal.vue'),
  },
]
