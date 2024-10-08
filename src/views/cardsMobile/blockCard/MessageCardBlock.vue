<template>
  <SelectCardHeader title="blockCard" />
  <div class="p-4">
    <div class="card">
      <div class="container-card">
        <h2 class="font-medium mb-0 text-4xl">{{ t('textBlockCardNew') }}</h2>
        <p class="font-normal mt-0 text-2xl">{{ t('textBlockCardNew2') }}</p>
        <div class="flex flex-row justify-content-center w-full mt-3">
          <Button class="btn btn-primary text-center" @click="requestNewCard"
            ><i class="pi pi-plus pr-2" style="font-size: 1rem"></i> {{ t('requestNewCard') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import SelectCardHeader from '../components/SelectCardHeader.vue'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

const requestNewCard = () => {
  router.push('/cards/onboarding/reposition')
}
</script>

<style>
.container-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
</style>
