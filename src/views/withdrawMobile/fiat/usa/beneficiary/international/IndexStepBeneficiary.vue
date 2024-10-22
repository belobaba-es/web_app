<template>
  <div class="card flex">
    <div class="col-12 p-0">
      <div class="col flex" style="cursor: pointer" @click="toBack()">
        <i class="pi pi-angle-left align-content-center" />
        <p class="font-regular" style="font-size: 16px">
          <span style="color: #cecece">{{ t('typeWithdrawUsa') }}</span>
          <span> /{{ t('withdrawalSWIFT') }}</span>
        </p>
      </div>

      <div class="pr-4 pl-4">
        <ButtonTypeTransaction
          :firstTag="t('available')"
          :imageSrc="iconBank"
          :secondTag="formObject.informationBank.address.country"
          :subtitle="t('withdrawalSWIFT')"
          :title="t('withdrawLocalText')"
        />
      </div>

      <div class="pr-4 pl-4 mt-3">
        <ButtonTypeTransaction
          :firstTag="t('available')"
          :imageSrc="iconBank"
          :subtitle="t('typeWithdrawText')"
          style="opacity: 0.4"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import iconBank from '../../../../../../assets/icons/bank_wire.svg'
import ButtonTypeTransaction from '../../../../../withdraw/components/customButton/ButtonTypeTransaction.vue'
import { useI18n } from 'vue-i18n'
import router from '../../../../../../router/router'
import { useNewBeneficiaryInternational } from '../../../../../withdraw/fiat/usa/components/beneficiary/composable/useNewBeneficiaryInternational'

const { t } = useI18n({ useScope: 'global' })
const { formObject } = useNewBeneficiaryInternational()

const toBack = () => {
  router.back()
}
</script>
<style lang="scss" scoped>
.line-vertical {
  border-left: 2px solid var(--primary-color);
}
</style>
