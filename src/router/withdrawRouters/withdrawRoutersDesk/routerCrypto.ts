export const routerCrypto = [
  {
    path: '',
    component: () => import('../../../views/withdraw/Index.vue'),
    name: 'crypto',
    children: [
      {
        path: '',
        name: 'crypto',
        component: () => import('../../../views/withdraw/IndexCrypto.vue'),
      },
      {
        path: 'other-platforms/beneficiary',
        name: 'crypto-beneficiary-list',
        component: () =>
          import('../../../views/withdraw/crypto/beneficiary/otherPlatforms/beneficiaryList/Beneficiary.vue'),
      },
      {
        path: 'other-platforms/beneficiary/:condition',
        name: 'crypto-new-beneficiary',
        component: () =>
          import('../../../views/withdraw/crypto/beneficiary/otherPlatforms/newBeneficiary/NewBeneficiary.vue'),
      },
      {
        path: 'other-platforms/make-withdrawal/:counterpartyId',
        name: 'crypto-make-withdrawal',
        component: () => import('../../../views/withdraw/crypto/components/MakeWithdraw.vue'),
      },
    ],
  },
]
