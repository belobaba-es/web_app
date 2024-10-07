<template>
  <div class="flex justify-content-between">
    <div class="col-12 sm:col-12 md:col-7 lg:col-7 xl:col-7">
      <div class="col flex" style="cursor: pointer" @click="toBack()">
        <i class="pi pi-angle-left align-content-center" />
        <p class="font-regular" style="font-size: 16px">
          <span style="color: #cecece">{{ t('withdrawWireListBeneficiary') }}</span> /
          <span>{{ t('typeWithdrawText') }}</span>
        </p>
      </div>

      <div class="mr-4">
        <h3 class="ml-2">{{ t('withdrawLocalText') }}</h3>
        <div
          class="card p-2"
          style="cursor: pointer; margin: 0 auto; border: 1px solid var(--primary-color)"
          @click="newBeneficiaryPanama"
        >
          <div class="flex justify-content-between align-items-center">
            <div class="flex col-10">
              <div class="mr-2">
                <img alt="" class="mr-3" src="../../../../../assets/icons/bank_wire.svg" />
              </div>
              <div>
                <h3 class="font-medium m-1">{{ t('withdrawTransferLocal') }}</h3>
                <div class="flex">
                  <div
                    class="card pl-3 pt-1 pr-3 pb-1 m-0 mr-3"
                    style="background: var(--primary-color); color: #1b1b19 !important"
                  >
                    {{ t('available') }}
                  </div>
                  <div class="card pl-3 pt-1 pr-3 pb-1 m-0" style="background: #01579b; color: white">
                    {{ t('panama') }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <i class="pi pi-angle-right ml-5 text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 sm:col-12 md:col-5 lg:col-5 xl:col-5 line-vertical hidden md:block">
      <div class="flex flex-column align-items-center pl-4">
        <Button text @click="onClickLearnMore"
          ><img
            :src="`https://storage.googleapis.com/noba-dev/${t('imgPublicity.otc')}`"
            alt="placeholder"
            class="mt-3"
            style="width: 300px; height: 150px; border-radius: 9px"
        /></Button>

        <Button text @click="onClickLearnMore"
          ><img
            :src="`https://storage.googleapis.com/noba-dev/${t('imgPublicity.help')}`"
            alt="placeholder"
            class="mt-3"
            style="width: 300px; height: 150px; border-radius: 9px"
        /></Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from '../../../../../router/router'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'

const { t } = useI18n({ useScope: 'global' })
const toBack = () => {
  router.back()
}
const newBeneficiaryPanama = () => {
  return router.push(`/withdraw/fiat/panama/new-beneficiary`)
}

const onClickLearnMore = () => window.open('https://bit.ly/nobacash', '_blank')
</script>
<style lang="scss" scoped>
.line-vertical {
  border-left: 2px solid var(--color-primary);
}
</style>
