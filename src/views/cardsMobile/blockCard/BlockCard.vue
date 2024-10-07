<template>
  <SelectCardHeader title="blockCard" />
  <div class="p-4">
    <div class="card p-fluid">
      <div>
        <h2 class="font-medium mb-0 text-center">{{ t('blockCardText') }}</h2>
        <p class="font-normal mt-0 mb-4 text-center">
          {{ t('blockCardText2') }}
        </p>
        <div class="flex justify-content-center">
          <div class="flex">
            <div class="p-field-radiobutton card shadow mr-5">
              <RadioButton
                v-model="dataBlockCard.reason"
                :value="ReasonLockingCard.CARD_STOLEN"
                inputId="robada"
                name="estado"
              />
              <label class="ml-3" for="robada">{{ t('blockCardText3') }}</label>
            </div>
            <div class="p-field-radiobutton card shadow">
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
          <div class="col-5">
            <Button
              :label="t('blockCardText6')"
              :loading="loading"
              icon="pi pi-angle-right"
              iconPos="right"
              @click="requireConfirmation()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <ConfirmDialog group="templating">
    <template #message="slotProps">
      <div class="flex flex-column align-items-center w-full">
        <i :class="slotProps.message.icon" class="text-primary" style="font-size: 3rem"></i>
        <p>{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmDialog>

  <ModalGeneric
    :subtitle="t('textBlock2')"
    :title="t('textBlock')"
    :visible="visible"
    @update:display="handleDisplayUpdate"
  />
</template>

<script lang="ts" setup>
import RadioButton from 'primevue/radiobutton'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import ConfirmDialog from 'primevue/confirmdialog'
import { useToast } from 'primevue/usetoast'
import ModalGeneric from '../../../components/ModalGeneric.vue'
import { useConfirm } from 'primevue/useconfirm'
import { useCardBlock } from '../../cards/composables/useCardBlock'
import { ReasonLockingCard } from '../../cards/enums/cardBlock.enum'
import { useRouter } from 'vue-router'
import SelectCardHeader from '../components/SelectCardHeader.vue'

const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const confirm = useConfirm()
const { blockCard, dataBlockCard, visible, loading } = useCardBlock()

const requireConfirmation = () => {
  confirm.require({
    group: 'templating',
    header: t('labelQuestion'),
    icon: 'pi pi-exclamation-circle',
    message: t('labelQuestion2'),
    accept: () => {
      blockCard()
    },
  })
}
const handleDisplayUpdate = (newValue: boolean) => {
  visible.value = newValue
  router.push('new-card')
}
</script>

<style lang="scss">
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

.shadow {
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08) !important;
}

.p-dialog-header,
.p-dialog-footer {
  background-color: white !important;
}
</style>
