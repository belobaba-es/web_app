export const routerInternalTransferMobile = [
  {
    path: 'beneficiary',
    name: 'crypto-internal-beneficiary-list',
    component: () => import('../../../views/withdrawMobile/crypto/internal/components/ListBeneficiaryInternal.vue'),
  },
  {
    path: 'make-withdrawal/:clientId',
    name: 'crypto-internal-make-withdrawal',
    component: () => import('../../../views/withdrawMobile/crypto/components/MakeWithdrawMobil.vue'),
  },
]
