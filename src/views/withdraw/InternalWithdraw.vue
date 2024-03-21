<template>
  <section class="section-main">
    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
      <p class="text-3xl font-medium mb-4">
        {{ t('withdraw') }} / <span class="text-primary"> {{ typeAsset }} </span>
      </p>

      <div class="flex align-items-center">
        <router-link to="/withdraw">
          <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" />
        </router-link>
        <span class="text-xl">Between BELOBABA {{ typeWallet }}</span>
      </div>

      <Steps :model="items" :readonly="false" />
      <router-view
        v-slot="{ Component }"
        :formData="formObject"
        @prevPage="prevPage($event)"
        @nextPage="nextPage($event)"
        @complete="complete()"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import Button from 'primevue/button'
import Steps from 'primevue/steps'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { WithdrawForm } from './types/withdraw'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const typeAsset = route.params.type === 'fiat' ? t('fiat') : t('asset')
const typeWallet = route.params.type === 'fiat' ? t('account') : t('wallet')
const items = ref([
  {
    label: 'Accounts',
    to: `/withdraw/noba/${route.params.type}`
  },
  {
    label: 'Amount',
    to: `/withdraw/noba/${route.params.type}/amount`
  },
  {
    label: 'Confirmation',
    to: `/withdraw/noba/${route.params.type}/confirmation`
  }
])

route.meta.noCache = true

const formObject = ref<WithdrawForm | any>({})

const nextPage = (event: any) => {
  for (let field in event.formData) {
    formObject.value[field] = event.formData[field]
  }

  router.push(items.value[event.pageIndex + 1].to)
}
const prevPage = (event: any) => {
  router.push(items.value[event.pageIndex - 1].to)
}
const complete = () => {
  toast.add({
    severity: 'success',
    summary: 'Order submitted',
    detail: formObject.value.beneficiary.name + ' your order completed.',
    life: 4000
  })

  router.push('/withdraw')
}
</script>