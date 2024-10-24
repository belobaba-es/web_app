<template>
  <Message :closable="false" severity="warn">
    <div class="pl-4">
      <h2 class="font-bold mt-0">{{ t('twoFactorAlertTitle') }}</h2>
      {{ t('twoFactorAlertMessage') }}
      <div class="mt-5 float-right">
        <Button
          class="font-regular"
          severity="warning"
          icon="pi pi-angle-right"
          icon-pos="right"
          :label="t('btnActivateTwoFactorAuth')"
          @click="redirectForActiveTwoFactor()"
        />
      </div>
    </div>
  </Message>
</template>
<script setup lang="ts">
import Message from 'primevue/message'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { twoFactorAuthenticationIsActiveRemotely } from '../shared/services/remoteConfig'
import { useTwoFactorAuth } from '../composables/useTwoFactorAuth'
import { onMounted, ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const { twoFactorIsActive } = useTwoFactorAuth()
const { t } = useI18n({ useScope: 'global' })
const { getClientId } = useAuth()
const route = useRouter()

const isShowMessage = ref(false)

const redirectForActiveTwoFactor = () => {
  route.push(`/profile/${getClientId()}/settings`)
}

onMounted(() => {
  showMessage()
})
const showMessage = async () => {
  if (!twoFactorIsActive() && (await twoFactorAuthenticationIsActiveRemotely())) {
    isShowMessage.value = true
    return
  }

  isShowMessage.value = false
}
</script>
