<template>
  <section class="section-main">
    <Steps :model="items" :readonly="false" />
    <router-view v-slot="{ Component }" @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { WithdrawForm } from '../../withdraw/types/withdraw'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Steps from 'primevue/steps'

const router = useRouter()
const toast = useToast()
const formObject = ref<WithdrawForm | any>({})

const nextPage = (event: any) => {
  router.push(items.value[event.pageIndex + 1].to)
}

const prevPage = (event: any) => {
  router.push(items.value[event.pageIndex - 1].to)
}

const items = ref([
  {
    label: 'Personal data',
    to: `/onboarding/personal/step1`,
  },
  {
    label: 'Upload documents',
    to: `/onboarding/personal/step2`,
  },
])

const complete = () => {
  toast.add({
    severity: 'success',
    summary: 'Order submitted',
    detail: ' your order completed.',
    life: 4000,
  })

  router.push('/withdraw')
}
</script>
