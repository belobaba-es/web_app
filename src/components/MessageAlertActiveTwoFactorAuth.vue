<template>
  <Message :closable="false" severity="warn">
    <div class="pl-4">
      <h2 class="font-bold mt-0">Active la autenticación de doble factor</h2>
      Por seguridad es necesario que active la autenticación de doble factor para confirmar retiros en tu cuenta
      noba.cash
      <div class="mt-5 float-right">
        <Button
          class="font-regular"
          severity="warning"
          icon="pi pi-angle-right"
          icon-pos="right"
          label="Activar doble factor"
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
import { useAccount } from '../composables/useAccount'
import { useUserStore } from '../stores/user'

const { t } = useI18n({ useScope: 'global' })

const route = useRouter()

const userStore = useUserStore()

const redirectForActiveTwoFactor = () => {
  route.push(`/profile/${userStore.getUser.account.accountId}/settings`)
}
</script>
