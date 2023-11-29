<template>
  <div class="completion-view" v-if="shouldShowCompletionView()">
    <div class="center-content">
      <img :src="getCompletionImage()" alt="Imagen de finalización" />
      <p class="title-text">{{getCompletionText()}}</p>

      <Button
        :label="t('continuar')"
        icon="pi pi-angle-right"
        icon-pos="right"
        class="px-5 mt-5 btn-submit"
        @click="redirectToHome()"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import router from '../../../router'
import {AccountStatus} from "../../../types/accountStatus.enum";
import {useAuth} from "../../../composables/useAuth";
import checkImage from '../../../assets/icons/check.svg'
import rejectedImage from '../../../assets/icons/cross.png'


const { t } = useI18n({ useScope: 'global' })
const { getAccountStatus } = useAuth()

const redirectToHome = () => {
  router.push('/')
}

const shouldShowCompletionView = () => {
  return getAccountStatus() === AccountStatus.APPROVED || getAccountStatus() === AccountStatus.REJECTED
}

const getCompletionImage = () => {
  if (getAccountStatus() === AccountStatus.APPROVED) {
    return checkImage
  } else if (getAccountStatus() === AccountStatus.REJECTED) {
    return rejectedImage
  }
}

const getCompletionText = () => {
  if (getAccountStatus() === AccountStatus.APPROVED) {
    return t('documentAlreadyVerified')
  } else if (getAccountStatus() === AccountStatus.REJECTED) {
    return t('documentAlreadyReject')
  }
}
</script>

<style lang="scss" scoped>
.completion-view {
  margin-top: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .center-content {
    text-align: center;

    .title-text {
      font-size: 38px;
      margin-top: 20px;
    }
    .sub-title {
      font-size: 28px;
    }
  }
}
</style>
