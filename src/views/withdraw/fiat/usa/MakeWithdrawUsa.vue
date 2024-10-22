<template>
  <div class="m-3">
    <div class="card pt-5 pb-5">
      <div class="flex justify-content-between">
        <div class="col-12 sm:col-12 md:col-6 lg:col-3 xl:col-3 line-vertical">
          <BackButtonMobile :subtitle="t('typeWithdrawText')" :title="t('newBeneficiary')" />
          <div class="pr-4 pl-4">
            <ButtonTypeTransaction
              v-if="isSwiftRoute"
              :firstTag="t('available')"
              :imageSrc="iconBank"
              :subtitle="t('withdrawalSWIFT')"
              :title="t('withdrawLocalText')"
            />
            <ButtonTypeTransaction
              v-else
              :firstTag="t('available')"
              :imageSrc="iconBank"
              :subtitle="t('typeWithdrawText')"
              :title="t('withdrawLocalText')"
            />
          </div>
          <div class="pr-4 pl-4 mt-3">
            <ButtonTypeTransaction
              v-if="!isSwiftRoute"
              :firstTag="t('available')"
              :imageSrc="iconBank"
              :subtitle="t('withdrawalSWIFT')"
              style="opacity: 0.4"
            />
            <ButtonTypeTransaction
              v-else
              :firstTag="t('available')"
              :imageSrc="iconBank"
              :subtitle="t('typeWithdrawText')"
              style="opacity: 0.4"
            />
          </div>
        </div>
        <div class="col-12 sm:col-12 md:col-6 lg:col-9 xl:col-9 line-vertical">
          <WithdrawFormUsa />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import ButtonTypeTransaction from '../../components/customButton/ButtonTypeTransaction.vue'
import iconBank from '../../../../assets/icons/bank_wire.svg'
import { useRoute } from 'vue-router'
import BackButtonMobile from '../../../../components/BackButtonMobile.vue'
import WithdrawFormUsa from '../../components/formWithdraw/WithdrawFormUsa.vue'
import { NetworkBank } from '../../enums/beneficiary.enum'

const { t } = useI18n({ useScope: 'global' })

const route = useRoute()
const isSwiftRoute = route.path.includes(NetworkBank.SWIFT)
</script>
<style lang="scss" scoped>
.line-vertical {
  border-left: 1px solid var(--primary-color);
}

.fondoOtc {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: -1;
}
</style>
