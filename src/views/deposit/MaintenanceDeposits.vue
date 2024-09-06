<template>
  <div v-if="!isFromUnitedStates()" class="maintenance">
    <div class="pl-4 text-justify">
      <h2 class="title font-semi-bold">{{ t('maintenanceDeposit.title') }}</h2>
      <p>
        {{ t('maintenanceDeposit.textOne') }}
      </p>
      <p class="mt-3">
        {{ t('maintenanceDeposit.textTwo') }}
      </p>
      <p class="mt-3">
        {{ t('maintenanceDeposit.textThree') }}
      </p>
      <p class="font-bold mt-3">
        {{ t('maintenanceDeposit.textFour') }}
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAuth } from '../../composables/useAuth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const { isFromUnitedStates } = useAuth()
</script>

<style lang="scss" scoped>
.title {
  color: var(--primary-color) !important;
  font-size: 2rem;
}

.maintenance {
  background: rgba(0, 0, 0, 0.04);
  padding: 20px;
  border-radius: 10px;
}
p {
  font-size: 1.2rem;
  line-height: 1.5;
}
</style>
