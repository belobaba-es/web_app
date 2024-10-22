export const routerWithdrawalMobile = [
  {
    path: '',
    children: [
      {
        path: '',
        component: () => import('../../../views/withdrawMobile/index.vue'),
      },
      {
        path: 'fiat',
        component: () => import('../../../views/withdrawMobile/index.vue'),
      },
      {
        path: 'fiat/requirement',
        component: () => import('../../../views/withdrawMobile/components/tabRequirement/TabIndex.vue'),
      },
      {
        path: 'fiat/panama',
        children: [
          {
            path: '',
            component: () => import('../../../views/withdrawMobile/fiat/panama/BeneficiaryListPanama.vue'),
          },
          {
            path: 'wire-local',
            component: () => import('../../../views/withdrawMobile/fiat/panama/ButtonWireLocal.vue'),
          },
          {
            path: 'new-beneficiary',
            component: () => import('../../../views/withdrawMobile/fiat/panama/BeneficiaryPanama.vue'),
          },
        ],
      },
      {
        path: 'fiat/usa',
        children: [
          {
            path: '',
            component: () =>
              import('../../../views/withdrawMobile/fiat/usa/beneficiary/components/ListBeneficiariesUsa.vue'),
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
            component: () =>
              import('../../../views/withdrawMobile/fiat/internal/components/ListBeneficiaryInternalFiat.vue'),
          },
          {
            path: 'withdraw',
            component: () => import('../../../views/withdrawMobile/fiat/internal/components/MakeWithdrawInternal.vue'),
          },
        ],
      },
    ],
  },
  {
    path: `fiat/usa/withdraw`,
    component: () => import('../../../views/withdrawMobile/fiat/usa/MakeWithdrawUsa.vue'),
  },

  {
    path: `fiat/panama/withdraw`,
    children: [
      {
        path: '',
        component: () => import('../../../views/withdrawMobile/fiat/panama/MakeWithdrawPanama.vue'),
      },
    ],
  },

  {
    path: '',
    children: [
      {
        path: 'fiat/usa/select/swift/:select',
        component: () =>
          import('../../../views/withdrawMobile/fiat/usa/beneficiary/international/IndexStepBeneficiary.vue'),
      },
      {
        path: '',
        component: () => import('../../../views/withdrawMobile/fiat/usa/beneficiary/international/NewBeneficiary.vue'),
        children: [
          {
            path: 'fiat/usa/swift/:select',
            component: () =>
              import('../../../views/withdrawMobile/fiat/usa/beneficiary/international/StepAccountNewBeneficiary.vue'),
          },
          {
            path: 'fiat/usa/swift/:select/step-data-beneficiary',
            component: () =>
              import('../../../views/withdrawMobile/fiat/usa/beneficiary/international/StepDataBeneficiary.vue'),
          },
          {
            path: 'fiat/usa/swift/:select/bank-intermediary',
            component: () =>
              import('../../../views/withdrawMobile/fiat/usa/beneficiary/international/StepIntermediaryBank.vue'),
          },
        ],
      },
    ],
  },
  {
    path: `fiat/:type/withdraw-local`,
    children: [
      {
        path: '',
        component: () => import('../../../views/withdraw/fiat/panama/WithdrawLocal.vue'),
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'fiat/usa/select/:type/:select',
        component: () =>
          import('../../../views/withdrawMobile/fiat/usa/beneficiary/domestic/IndexBeneficiaryDomestic.vue'),
      },
      {
        path: '',
        component: () =>
          import('../../../views/withdrawMobile/fiat/usa/beneficiary/domestic/NewBeneficiaryDomestic.vue'),
        children: [
          {
            path: 'fiat/usa/:type/:select',
            component: () => import('../../../views/withdrawMobile/fiat/usa/beneficiary/domestic/StepDataBank.vue'),
          },
          {
            path: 'fiat/usa/:type/:select/data-beneficiary',
            component: () =>
              import('../../../views/withdrawMobile/fiat/usa/beneficiary/domestic/StepDataBeneficiaryDomestic.vue'),
          },
        ],
      },
    ],
  },
]
