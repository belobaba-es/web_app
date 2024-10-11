export const routerCryptoMobile = [
  {
    path: '',
    children: [
      {
        path: '',
        component: () => import('../../../views/withdrawMobile/index.vue'),
      },
      {
        path: 'other-platforms/beneficiary',
        component: () =>
          import('../../../views/withdrawMobile/crypto/otherPlatforms/components/Beneficiary/ListBeneficiaries.vue'),
      },
      {
        path: 'other-platforms/beneficiary/:condition',
        component: () =>
          import('../../../views/withdrawMobile/crypto/otherPlatforms/components/Beneficiary/NewBeneficiary.vue'),
      },
      {
        path: 'other-platforms/make-withdrawal/:counterpartyId',
        component: () => import('../../../views/withdrawMobile/crypto/components/MakeWithdrawMobil.vue'),
      },
      {
        path: 'requirement',
        component: () => import('../../../views/withdrawMobile/components/tabRequirement/crypto/TabIndex.vue'),
      },
    ],
  },
]
