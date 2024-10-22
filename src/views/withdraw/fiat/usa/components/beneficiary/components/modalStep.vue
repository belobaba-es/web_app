<template>
  <Dialog
    v-model:visible="modalStepActivation"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :style="{ width: '27rem' }"
    header="Header"
    :show-header="false"
    maximizable
    modal
  >
    <div class="flex justify-content-end text-2xl cursor-pointer" @click="close()">x</div>
    <div>
      <h1 class="font-medium primary-color text-center" style="line-height: 1.2; color: var(--primary-color)">
        {{ t('textModalStepConfirmation') }}
      </h1>
      <h3 class="mt-2 text-center font-normal">
        {{ t('textModalStepConfirmation2') }}
      </h3>

      <div class="flex mt-4">
        <div class="col">
          <div class="flex justify-content-start">
            <Button :label="t('no')" class="col-8 p-3" @click="sendDataBeneficiary()" />
          </div>
        </div>
        <div class="col">
          <div class="flex justify-content-end">
            <Button :label="t('yes')" class="col-8 p-3" @click="addIntermediaryBankStep()" />
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useNewBeneficiaryInternational } from '../composable/useNewBeneficiaryInternational'
import { useI18n } from 'vue-i18n'

const { modalStepActivation, addIntermediaryBankStep, saveBeneficiary } = useNewBeneficiaryInternational()
const { t } = useI18n({ useScope: 'global' })

const sendDataBeneficiary = () => {
  saveBeneficiary()
}
const close = () => {
  modalStepActivation.value = false
}
</script>
