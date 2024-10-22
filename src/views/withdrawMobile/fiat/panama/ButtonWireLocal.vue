<template>
  <div class="p-4">
    <div class="col flex" style="cursor: pointer" @click="toBack()">
      <i class="pi pi-angle-left align-content-center" />
      <p class="font-regular" style="font-size: 16px">
        <span style="color: #cecece">{{ t('withdrawWireListBeneficiary') }}</span> /
        <span>{{ t('typeWithdrawText') }}</span>
      </p>
    </div>

    <ButtonTypeTransaction
      :firstTag="t('available')"
      :imageSrc="iconBank"
      :subtitle="t('panama')"
      :title="t('withdrawLocalText')"
      @click="newBeneficiaryPanama"
    />
  </div>
</template>
<script lang="ts" setup>
import iconBank from '../../../../assets/icons/bank_wire.svg'
import ButtonTypeTransaction from '../../../withdraw/components/customButton/ButtonTypeTransaction.vue'
import { useI18n } from 'vue-i18n'
import router from '../../../../router/router'

const { t } = useI18n({ useScope: 'global' })
const toBack = () => {
  router.back()
}
const newBeneficiaryPanama = () => {
  return router.push(`/withdraw/fiat/panama/new-beneficiary`)
}
</script>
