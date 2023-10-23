<template>
  <div v-if="isApproved" class="padd-4 col-auto">
    <label class="required-label">{{ t('affiliateLink') }}</label>
    <div class="p-inputgroup">
      <InputText readonly="true" :placeholder="t('walletAddress')" :value="referralLink" />
      <span @click="copyToClipboardReferralLink()" class="p-inputgroup-addon btn-copy-to-clipboard">
        <i class="pi pi-copy"></i>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BusinessAllieService } from '../services/businessAllieService'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import InputText from 'primevue/inputtext'
import { useAuth } from '../../../composables/useAuth'

const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const referralLink = ref('')
const isApproved = ref(false)
const businessAllieService = new BusinessAllieService()
const { getClientId } = useAuth()

onMounted(() => {
  getBusinessAllieStatus()
})
const generateReferralLink = (accountId: string) => {
  referralLink.value = `${import.meta.env.VITE_NOBA_SIGNIN}${btoa(accountId)}`
}

const getBusinessAllieStatus = async () => {
  businessAllieService.getBusinessAllieStatus().then(res => {
    if (res.status === 'APPROVED') {
      isApproved.value = true
      generateReferralLink(getClientId())
    }
  })
}

const copyToClipboardReferralLink = () => {
  if (referralLink.value) {
    navigator.clipboard.writeText(referralLink.value)
    toast.add({
      severity: 'success',
      summary: t('successfulOperation'),
      detail: t('textCopySuccessful'),
      life: 3000,
    })
  }
}
</script>

<style scoped></style>
