<template>
  <section class="section-main">
    <WarningKYC />
    <div class="flex justify-content-between align-items-center">
      <h1 class="text-2xl">{{ t('personalData') }}</h1>
      <template v-if="submitting">
        <Skeleton width="6rem" height="2rem" class="px-3 mb-3"></Skeleton>
      </template>
      <template v-else>
        <Button :label="t('edit')" icon="pi pi-pencil" iconPos="right" class="p-button-link" @click="editProfile()" />
      </template>
    </div>
    <div class="card">
      <template v-if="submitting">
        <Skeleton width="10rem" class="mb-2"></Skeleton>
        <Skeleton class="mb-2"></Skeleton>
      </template>
      <template v-else>
        <h5 class="text-base text-600">{{ labelNameProfile }}</h5>
        <p class="text-base font-medium">{{ getUserName() }}</p>
      </template>
      <Divider type="solid" />

      <template v-if="submitting">
        <Skeleton width="10rem" class="mb-2"></Skeleton>
        <Skeleton class="mb-2"></Skeleton>
      </template>
      <template v-else>
        <h5 class="text-base text-600">{{ t('dni') }}</h5>
        <p class="text-base font-medium">{{ getClientDni() }}</p>
      </template>
      <Divider type="solid" />

      <template v-if="isNaturalAccount()">
        <template v-if="submitting">
          <Skeleton width="10rem" class="mb-2"></Skeleton>
          <Skeleton class="mb-2"></Skeleton>
        </template>
        <template v-else>
          <h5 class="text-base text-600">{{ t('birthdateLabel') }}</h5>
          <p class="text-base font-medium">{{ getDateBirth() }}</p>
        </template>
      </template>
      <template v-else>
        <h5 class="text-base text-600">{{ t('countryLabel') }}</h5>
        <p class="text-base font-medium">{{ country }}</p>
        <p class="text-base font-medium">{{ getCountry() }}</p>
      </template>
    </div>

    <div class="pt-5 flex justify-content-between align-items-center">
      <h1 class="text-2xl">{{ t('contactInfo') }}</h1>
    </div>
    <div class="card">
      <template v-if="submitting">
        <Skeleton width="10rem" class="mb-2"></Skeleton>
        <Skeleton class="mb-2"></Skeleton>
      </template>
      <template v-else>
        <h5 class="text-base text-600">{{ t('emailLabel') }}</h5>
        <p class="text-base font-medium">{{ email }}</p>
      </template>
      <Divider type="solid" />

      <template v-if="submitting">
        <Skeleton width="10rem" class="mb-2"></Skeleton>
        <Skeleton class="mb-2"></Skeleton>
      </template>
      <template v-else>
        <h5 class="text-base text-600">{{ t('phoneLabel') }}</h5>
        <p class="text-base font-medium">{{ getUserPhone() }}</p>
      </template>
      <Divider type="solid" />

      <template v-if="submitting">
        <Skeleton width="10rem" class="mb-2"></Skeleton>
        <Skeleton class="mb-2"></Skeleton>
      </template>
      <template v-else>
        <h5 class="text-base text-600">{{ t('address') }}</h5>
        <p class="text-base font-medium">{{ getUserAddress() }}</p>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'
import { useI18n } from 'vue-i18n'
import WarningKYC from './components/WarningKYC.vue'
import { useAuth } from '../../composables/useAuth'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { t } = useI18n({ useScope: 'global' })
const {
  editProfile,
  getUserName,
  getCountry,
  getUserPhone,
  submitting,
  isNaturalAccount,
  getDateBirth,
  getClientDni,
  email,
  getUserAddress,
} = useAuth()

const labelNameProfile = computed(() => {
  if (route.params.contactId || isNaturalAccount()) {
    return t('fullName')
  } else {
    return t('businessNameLabel')
  }
})

const country = getUserAddress()
</script>

<style scoped>
.card {
  background-color: #f9f9f9;
  border: solid 1px #e7e6e7;
}

.p-button.p-button-link,
.p-button.p-button-link:hover {
  color: #a4a4a4;
  background: transparent;
  border: transparent;
}
</style>
