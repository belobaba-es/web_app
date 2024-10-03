<template>
  <div class="flex justify-content-between">
    <div class="col-12 sm:col-12 md:col-7 lg:col-7 xl:col-7">
      <div class="col flex" style="cursor: pointer" @click="toBack()">
        <i class="pi pi-angle-left align-content-center" />
        <p class="font-regular" style="font-size: 16px">
          <span style="color: #cecece">{{ t('withdrawalSWIFT') }}</span> /
          <span>{{ t('typeWithdrawUsa') }}</span>
        </p>
      </div>

      <div>
        <h3 class="ml-5 pl-5 mt-1">{{ t('selectBankDestinationText') }}</h3>
        <div class="flex justify-content-center">
          <div class="md:col-12 col-12 md:pr-5">
            <ButtonSelectCountry />
          </div>
        </div>
        <div class="flex justify-content-center">
          <div class="md:col-12 col-12 md:pr-5">
            <ButtonSelectWireLocal
              firstOptionBgColor="#ffffff"
              firstOptionTextColor="#000000"
              secondOptionBgColor="#ffffff"
              secondOptionTextColor="#000000"
            />
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
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import router from '../../../../../router/router'
import ButtonSelectCountry from '../../../components/customButton/ButtonSelectCountry.vue'
import ButtonSelectWireLocal from '../../../components/customButton/ButtonSelectWireLocal.vue'

const { t } = useI18n({ useScope: 'global' })

const onClickLearnMore = () => window.open('https://bit.ly/nobacash', '_blank')

const toBack = () => {
  router.back()
}
</script>
<style lang="scss" scoped>
.line-vertical {
  border-left: 2px solid #00beb0;
}
</style>
