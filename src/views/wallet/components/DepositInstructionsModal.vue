<template>
  <Dialog
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
    :style="{ width: '35vw' }"
    :visible="visible"
    closeIcon="pi pi-times-circle"
    header="Deposit Instructions"
    @update:visible="emit('update:visible', $event)"
  >
    <TabView>
      <TabPanel v-if="assetCode === FiatAssetCodes.USD" header="US Domestic">
        <FiatInstructionUSADomestic :bank-national="bankNational" />
      </TabPanel>

      <TabPanel
        v-if="getAccountType() !== 'NATURAL_PERSON' && assetCode === FiatAssetCodes.USD"
        header="US International"
      >
        <FiatInstructionUSAInternational :bank-international="bankInternational" />
      </TabPanel>

      <TabPanel v-if="assetCode === FiatAssetCodes.USD_PANAMA" header="ACH Panama">
        <FiatInstructionPanama :bank-panama="bankPanama" />
      </TabPanel>
    </TabView>
  </Dialog>
</template>
<script lang="ts" setup>
import FiatInstructionPanama from '../../deposit/components/FiatInstructionPanama.vue'
import FiatInstructionUSAInternational from '../../deposit/components/FiatInstructionUSAInternational.vue'
import FiatInstructionUSADomestic from '../../deposit/components/FiatInstructionUSADomestic.vue'
import { onMounted, ref } from 'vue'
import { BankData } from '../../deposit/types/fiat.interface'
import { FiatService } from '../../deposit/services/fiat'
import Dialog from 'primevue/dialog'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import { useAuth } from '../../../composables/useAuth'
import { FiatAssetCodes } from '../types/assetCodes.interface'
import { processException } from '../../../shared/processException'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

defineProps<{
  assetCode: string
  visible: boolean
}>()
const emit = defineEmits(['update:visible'])

const { getAccountType } = useAuth()

const dataBank = ref<BankData>()
const bankNational = ref()
const bankInternational = ref()
const bankPanama = ref()
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })

onMounted(() => {
  new FiatService()
    .bankData()
    .then(data => {
      dataBank.value = data

      bankNational.value = dataBank.value.domestic

      bankInternational.value = dataBank.value.international

      bankPanama.value = dataBank.value.achPab
    })
    .catch(e => {
      processException(toast, t, e)
    })
})
</script>
<style scoped></style>
