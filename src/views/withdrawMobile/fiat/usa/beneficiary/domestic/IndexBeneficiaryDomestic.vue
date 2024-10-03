<template>
  <div class="card flex">
    <div class="col-12 p-0">
      <div class="col flex p-0" style="cursor: pointer" @click="toBack()">
        <i class="pi pi-angle-left align-content-center" />
        <p class="font-regular" style="font-size: 16px">
          <span style="color: #cecece">{{ t('withdrawalSWIFT') }}</span> /
          <span>{{ t('typeWithdrawUsa') }}</span>
        </p>
      </div>

      <div>
        <p>{{ t('withdrawLocalText') }}</p>
        <ButtonSelectWireLocal
          :defaultDropdownVisible="true"
          :isClickable="false"
          firstOptionBgColor="#00BEB0"
          firstOptionTextColor="#ffffff"
          secondOptionBgColor="#ffffff"
          secondOptionOpacity="0.4"
          secondOptionTextColor="#000000"
          style="background: #f1ffff"
        />
      </div>
      <div class="mt-5 pt-5">
        <ButtonTypeTransaction
          :firstTag="t('available')"
          :imageSrc="iconBank"
          :subtitle="t('withdrawalSWIFT')"
          class="mt-5"
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
import ButtonSelectWireLocal from '../../../../../withdraw/components/customButton/ButtonSelectWireLocal.vue'
import router from '../../../../../../router/router'

const { t } = useI18n({ useScope: 'global' })

const toBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.line-vertical {
  border-left: 2px solid var(--primary-color);
}
</style>
