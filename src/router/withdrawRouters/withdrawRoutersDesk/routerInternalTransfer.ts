export const routerInternalTransfer = [
  {
    path: 'beneficiary',
    name: 'crypto-internal-beneficiary-list',
    component: () => import('../../../views/withdraw/crypto/beneficiary/internal/InternalBeneficiary.vue'),
  },
  {
    path: 'make-withdrawal/:clientId',
    name: 'crypto-internal-make-withdrawal',
    component: () => import('../../../views/withdraw/crypto/components/MakeWithdraw.vue'),
  },
]
