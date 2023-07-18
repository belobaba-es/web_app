<template>
  <section class="section-main">
    <div class="col-8">
      <p class="text-3xl font-medium mb-4">
        {{ t('withdraw') }} / <span class="text-primary">{{ t('crypto') }} </span>
      </p>
      <div class="flex align-items-center">
        <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" @click="toBack" />
        <span class="text-xl"> {{ t('otherPlatformCrypto') }}</span>
      </div>
    </div>
    <h5 class="text-2xl font-medium mt-2 p-3">{{ t('addNewBeneficiary') }}</h5>

    <div class="formgrid grid mt-4 p-3">
      <div class="col-8">
        <div class="field">
          <SelectedAssets @selectedAsset="selectAsset" />
        </div>
        <div class="field">
          <label>{{ t('walletAddress') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="form.walletAddress" />
          </div>
        </div>
        <div class="field">
          <label>{{ t('label') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="form.label" />
          </div>
        </div>
        <div class="field flex justify-content-end">
          <Button :label="t('Save new beneficiary')" class="px-5" @click="saveBeneficiary" />
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SelectedAssets from '../../../components/SelectedAssets.vue'
import { useWithdraw } from '../composables/useWithdraw'
import { BeneficiaryService } from '../services/beneficiary'
import { useRouter } from 'vue-router'

const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const { toBack } = useWithdraw([])

const form = ref({
  walletAddress: '',
  label: '',
  assetId: '',
})

const selectAsset = (asset: any) => {
  form.value.assetId = asset.assetId
}

const saveBeneficiary = () => {
  if (form.value.assetId.length === 0 || form.value.label.length === 0 || form.value.walletAddress.length === 0) {
    toast.add({
      severity: 'info',
      detail: t('pleaseVerifyField'),
      life: 4000,
    })
    return
  }

  const beneficiaryService = BeneficiaryService.instance()
  beneficiaryService.saveBeneficiaryAssets(form.value).then(resp => {
    router.push('/withdraw/crypto/other')
    toast.add({
      severity: 'success',
      detail: resp.message,
      life: 4000,
    })
  }).catch(error => {
      if (error.response.data.message) {
          toast.add({
              severity: 'error',
              summary: t('somethingWentWrong'),
              detail: error.response.data.message,
              life: 4000,
          })
          return
      }
  })
}
</script>
