<template>
  <div class="card flex ml-3 mr-3">
    <div class="col-3">
      <div class="col flex" style="cursor: pointer" @click="toBack()">
        <i class="pi pi-angle-left align-content-center" />
        <p class="font-regular" style="font-size: 16px">
          <span style="color: #cecece">{{ t('typeWithdrawUsa') }}</span>
          <span>/{{ t('withdrawalSWIFT') }}</span>
        </p>
      </div>

      <div>
        <ButtonTypeTransaction
          :firstTag="t('available')"
          :imageSrc="iconBank"
          :secondTag="formObject.informationBank.address.country"
          :subtitle="t('withdrawalSWIFT')"
          :title="t('withdrawLocalText')"
        />
      </div>

      <div class="mt-3">
        <ButtonTypeTransaction
          :firstTag="t('available')"
          :imageSrc="iconBank"
          :subtitle="t('typeWithdrawText')"
          style="opacity: 0.4"
        />
      </div>
    </div>
    <div class="col-9 line-vertical">
      <NewBeneficiary />
    </div>
  </div>
</template>
<script lang="ts" setup>
import iconBank from '../../../../../../../assets/icons/bank_wire.svg'
import ButtonTypeTransaction from '../../../../../components/customButton/ButtonTypeTransaction.vue'
import { useI18n } from 'vue-i18n'
import router from '../../../../../../../router/router'
import NewBeneficiary from './NewBeneficiary.vue'
import { useNewBeneficiaryInternational } from '../composable/useNewBeneficiaryInternational'

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
