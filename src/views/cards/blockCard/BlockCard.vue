<template>
  <div class="p-4">
    <div class="card p-fluid">
      <div class="container-card">
        <h2 class="font-medium mb-0 text-center">{{ t('blockCardText') }}</h2>
        <p class="font-normal mt-0 mb-4 text-center">
          {{ t('blockCardText2') }}
        </p>
        <div class="flex justify-content-center">
          <div class="col-10 flex">
            <div class="p-field-radiobutton card col mr-5">
              <RadioButton
                v-model="dataBlockCard.reason"
                :value="ReasonLockingCard.CARD_STOLEN"
                inputId="robada"
                name="estado"
              />
              <label class="ml-3" for="robada">{{ t('blockCardText3') }}</label>
            </div>
            <div class="p-field-radiobutton card col">
              <RadioButton
                v-model="dataBlockCard.reason"
                :value="ReasonLockingCard.CARD_LOST"
                inputId="perdida"
                name="estado"
              />
              <label class="ml-3" for="perdida">{{ t('blockCardText4') }}</label>
            </div>
          </div>
        </div>
        <div class="p-field">
          <InputText v-model="dataBlockCard.note" :placeholder="t('blockCardText5')" />
        </div>
        <div class="flex justify-content-center">
          <div class="col-6">
            <Button :label="t('labelBlockCard')" @click="requireConfirmation()" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <ConfirmDialog group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
        <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
          <i class="pi pi-question text-5xl"></i>
        </div>
        <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
        <p class="p-5 mt-5 text-2xl font-regular">{{ message.message }}</p>
        <div class="flex align-items-center gap-2 mt-4">
          <Button label="Save" @click="acceptCallback"></Button>
          <Button label="Cancel" outlined @click="rejectCallback"></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>

  <ModalGeneric :subtitle="t('textBlock2')" :title="t('textBlock')" :visible="visible" />
</template>

<script setup>
import RadioButton from 'primevue/radiobutton'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useCardBlock } from '../composables/useCardBlock.ts'
import ConfirmDialog from 'primevue/confirmdialog'
import { useToast } from 'primevue/usetoast'
import { ReasonLockingCard } from '../enums/cardBlock.enum.ts'
import ModalGeneric from '../../../components/ModalGeneric.vue'
import { useConfirm } from 'primevue/useconfirm'

const { t } = useI18n()
const toast = useToast()
const confirm = useConfirm()
const { blockCard, dataBlockCard, visible } = useCardBlock()

const requireConfirmation = () => {
  confirm.require({
    group: 'headless',
    header: t('labelQuestion'),
    message: t('labelQuestion2'),
    accept: () => {
      blockCard()
    },
  })
}
</script>

<style lang="scss" scoped>
.p-dialog-content .p-confirm-dialog-message {
  font-size: 1.5rem;
}

.container-card {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}

.p-field-radiobutton {
  margin-bottom: 1rem;
}

.p-field {
  margin-bottom: 1rem;
}
</style>