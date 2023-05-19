<template>
  <div class="container-center pb-5 gray-container">
    <div class="grid mt-6 pt-6 w-75 sm:w-100" style="#f9f9f9">
      <div class="lg:col-6 sm:col-12">
        <div class="flex justify-content-center align-content-center w-100">
          <img class="business-allie-image" alt="business-alli-image" :src="AwaitingApprovalImg" />
        </div>
      </div>

      <div class="allie-container xs:col-12 lg:col-6 sm:col-12">
        <div class="input-allie-container col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12 awaiting-approval">
          <h2>
            <span class="partner">{{ t('thankYou') }}</span>
            {{ t('forYourInterest') }}
            <span class="partner"> {{ t('yourRequest') }}</span>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AwaitingApprovalImg from '../../../assets/img/awaiting_approval.png'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped>
.awaiting-approval {
  display: flex;
  align-items: center;
  height: 200px;
  text-align: center;
}
</style>
