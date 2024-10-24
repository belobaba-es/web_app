<template>
  <div class="p-4">
    <div class="card p-fluid flex-column justify-content-center">
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
        <div class="p-field flex justify-content-center">
          <InputText v-model="dataBlockCard.note" :placeholder="t('blockCardText5')" style="width: 100%" />
        </div>
        <div class="flex justify-content-center">
          <div style="width: 100%">
            <Button :label="t('labelBlockCard')" :loading="loading" @click="requireConfirmation()" />
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
    :subtitle="t('textCancel2')"
    :title="t('textCancel')"
    :visible="visible"
    @update:display="handleDisplayUpdate"
  />
</template>

<script lang="ts" setup>
import RadioButton from 'primevue/radiobutton'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useCardBlock } from '../composables/useCardBlock'
import ConfirmDialog from 'primevue/confirmdialog'
import { ReasonLockingCard } from '../enums/cardBlock.enum'
import ModalGeneric from '../../../components/ModalGeneric.vue'
import { useConfirm } from 'primevue/useconfirm'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const confirm = useConfirm()
const { blockCard, dataBlockCard, visible, loading } = useCardBlock()
const requireConfirmation = () => {
  confirm.require({
    group: 'templating',
    header: t('labelQuestion'),
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
