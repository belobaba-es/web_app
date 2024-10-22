<template>
  <div class="card flex ml-3 mr-3">
    <div class="col-3">
      <div class="col flex" style="cursor: pointer" @click="toBack()">
        <i class="pi pi-angle-left align-content-center" />
        <p class="font-regular" style="font-size: 16px">
          <span style="color: #cecece">{{ t('typeWithdrawUsa') }}/{{ t('typeWithdrawText') }}</span>
          <span>/{{ t(wireLocalType) }}</span>
        </p>
      </div>

      <div>
        <p>{{ t('withdrawLocalText') }}</p>
        <ButtonSelectWireLocal
          :defaultDropdownVisible="true"
          :isClickable="false"
          firstOptionBgColor="var(--primary-color)"
          firstOptionTextColor="#ffffff"
          secondOptionBgColor="#ffffff"
          secondOptionOpacity="0.4"
          secondOptionTextColor="#000000"
          style="background: var(--secondary-color)"
        />
      </div>
      <div class="mt-5 pt-5">
        <ButtonTypeTransaction
          :firstTag="t('available')"
          :imageSrc="iconBank"
          :subtitle="t('withdrawalSWIFT')"
          class="mt-5"
          style="opacity: 0.4; background: var(--secondary-color)"
        />
      </div>
    </div>
    <div class="col-9 line-vertical">
      <NewBeneficiaryDomestic />
    </div>
  </div>
</template>
<script lang="ts" setup>
import iconBank from '../../../../../../../assets/icons/bank_wire.svg'
import ButtonTypeTransaction from '../../../../../components/customButton/ButtonTypeTransaction.vue'
import { useI18n } from 'vue-i18n'
import router from '../../../../../../../router/router'
import NewBeneficiaryDomestic from './NewBeneficiaryDomestic.vue'
import ButtonSelectWireLocal from '../../../../../components/customButton/ButtonSelectWireLocal.vue'
import { useListBeneficiaryUsa } from '../../../composable/useListBeneficiaryUsa'

const { t } = useI18n({ useScope: 'global' })
const { wireLocalType } = useListBeneficiaryUsa()
const toBack = () => {
  router.back()
}
</script>
<style lang="scss" scoped>
.line-vertical {
  border-left: 2px solid var(--primary-color);
}
</style>
