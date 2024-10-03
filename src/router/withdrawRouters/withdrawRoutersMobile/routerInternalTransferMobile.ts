export const routerInternalTransferMobile = [
  {
    path: 'beneficiary',
    component: () => import('../../../views/withdrawMobile/crypto/internal/components/ListBeneficiaryInternal.vue'),
  },
  {
    path: 'make-withdrawal/:clientId',
    component: () => import('../../../views/withdrawMobile/crypto/components/MakeWithdrawMobil.vue'),
  },
]
