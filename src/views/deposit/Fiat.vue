<template>
  <section class="section-main max-width">
    <p class="text-3xl font-medium mb-4">
      {{ t('deposit') }} / <span class="text-primary">{{ t('fiat') }} </span>
    </p>
    <TabMenu :model="menuItems" v-model:activeIndex="active" />

    <FiatInstructionUSADomestic :bank-national="bankNational" v-if="active == 0" />

<!--    <FiatInstructionUSAInternational :bank-international="bankInternational" v-if="active == 1" />-->

    <FiatInstructionPanama :bank-panama="bankPanama" v-if="active == 2" v-show="isExistsWallet('USD_PA')" />
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import TabMenu from 'primevue/tabmenu'
import { useI18n } from 'vue-i18n'
import { FiatService } from './services/fiat'
import { BankData } from './types/fiat.interface'
import { useAuth } from '../../composables/useAuth'
import { useBalanceWallet } from '../../composables/useBalanceWallet'
import FiatInstructionPanama from './components/FiatInstructionPanama.vue'
import FiatInstructionUSADomestic from './components/FiatInstructionUSADomestic.vue'
import FiatInstructionUSAInternational from './components/FiatInstructionUSAInternational.vue'

const submitting = ref(false)

const { t } = useI18n({ useScope: 'global' })
const { getUserName } = useAuth()
const { isExistsWallet } = useBalanceWallet()

const username = getUserName()

const dataBank = ref<BankData>()
const bankNational = ref()
const bankInternational = ref()
const bankPanama = ref()

new FiatService()
  .bankData()
  .then(data => {
    submitting.value = false
    dataBank.value = data

    bankNational.value = dataBank.value.domestic

    bankInternational.value = dataBank.value.international

    bankPanama.value = dataBank.value.achInstructions
  })
  .catch(() => (submitting.value = false))

const active = ref<number>(0)

const menuItems = ref<{ label: string }[]>([
  {
    label: 'US Domestic',
  },
  // {
  //   label: 'Internacional',
  // },
])

onMounted(() => {
  if (isExistsWallet('USD_PA')) {
    menuItems.value = [
      {
        label: 'US Domestic',
      },
      // {
      //   label: 'Internacional',
      // },
      {
        label: 'ACH Panama',
      },
    ]
  }
})
</script>

<style lang="css">
.p-tabmenu .p-tabmenu-nav {
  background: transparent !important;
  border: 1px solid #dee2e6;
  border-width: 0 0 2px 0;
}

.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
  background: transparent !important;
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  border: solid #dee2e6;
  border-width: 0 0 2px 0;
  border-color: transparent transparent #dee2e6 transparent;
  background: transparent !important;
  color: #6c757d;
  padding: 1rem;
  font-weight: 600;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  transition: box-shadow 0.2s;
  margin: 0 0 -2px 0;
}

p {
  margin: 0 0 6px 0;
}

.download-btn {
  width: 100% !important;
}

.grayed-text-warning {
  color: #6c757d !important;
  margin: 0 0 0 4px;
}

@media only screen and (min-width: 1000px) {
  .max-width {
    max-width: 500px;
  }
}
</style>
