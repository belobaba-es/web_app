<template>
  <ProgressSpinner
    v-if="displayEditOpportunity"
    style="width: 50px; height: 50px"
    strokeWidth="8"
    fill="var(--surface-ground)"
    animationDuration=".5s"
    aria-label="Custom ProgressSpinner"
  />

  <Dialog
    :visible="display"
    @update:visible="emit('update:display', $event)"
    :modal="true"
    closeIcon="pi pi-times-circle"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '65vw' }"
    header=" "
  >
    <div class="col-12 content">
      <div class="inner-row-flex mt-20">
        <div class="col-6 md:6 lg:6 xl:6 p-hide-xs p-hide-sm">
          <img
            class="business-allie-image"
            :src="BusinessOpportunitiesImg"
            alt="business-alli-image"
            style="width: 100%; height: 80%"
          />
        </div>

        <div class="col-12 sm:col-5 md:col-5 lg:col-5 xl:col-5 pt-1">
          <h3 class="business-allie text-center">
            {{ t('edit') }}
            <span class="partner">{{ t('businessPartner') }}</span>
          </h3>
          <label class="required-label">{{ t('requiredInformation') }}</label>

          <div class="p-inputgroup input-allie">
            <label>{{ t('dni') }}</label>
            <InputText type="text" v-model="props.businessOpportunityEdit.taxId" :placeholder="t('dni')" readonly />
          </div>

          <div class="p-inputgroup input-allie">
            <label>{{ t('fullName') }}</label>
            <InputText type="text" v-model="props.businessOpportunityEdit.name" :placeholder="t('fullName')" readonly />
          </div>

          <div class="p-inputgroup input-allie">
            <label>{{ t('emailLabel') }}</label>
            <InputText
              type="text"
              v-model="props.businessOpportunityEdit.email"
              :placeholder="t('emailLabel')"
              readonly
            />
          </div>

          <div class="p-inputgroup input-allie">
            <label>{{ t('fee') }} %</label>
            <InputNumber
              style="width: 200px"
              :minFractionDigits="2"
              :maxFractionDigits="2"
              v-model="props.businessOpportunityEdit.feeSwap"
              :placeholder="t('fee')"
            />
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="col-12 btn-container">
        <Button
          class="w-50 p-button mt-5"
          :label="'update'"
          :loading="isSendingRequest"
          @click="updateBusinessOpportunity()"
        />
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import BusinessOpportunitiesImg from '../../../assets/img/be_business_partner.png'
import { useToast } from 'primevue/usetoast'
import { BusinessAllie } from '../services/businessAllie'
import { BusinessOpportunity } from '../types/businessOpportunity'

const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const emit = defineEmits(['update:asset-select', 'update:display', 'create', 'update'])

const props = defineProps<{
  display: boolean
  businessOpportunityEdit: BusinessOpportunity
}>()
const displayEditOpportunity = ref(false)
const isSendingRequest = ref(false)
const businessAllieService = new BusinessAllie()

const updateBusinessOpportunity = () => {
  isSendingRequest.value = true

  if (!validasteFee()) {
    showErrorMessage('Fee must have a value between 0 or 100')
    isSendingRequest.value = false
    return
  }

  const updatedOpportunity = props.businessOpportunityEdit
  businessAllieService
    .updateOpportunityFeeSwap(props.businessOpportunityEdit.taxId, props.businessOpportunityEdit.feeSwap)
    .then(res => {
      emit('update', {
        ...updatedOpportunity,
      })
      isSendingRequest.value = false
      showSucessMessage('You have updated successfully')
      cleanOpportunityForm()
    })
    .catch(e => {
      isSendingRequest.value = false
      toast.add({
        severity: 'error',
        summary: 'Something went wrong',
        detail: e.response.data.message,
        life: 4000,
      })
    })
}

const validasteFee = (): boolean => {
  let isValid = true
  if (props.businessOpportunityEdit.feeSwap < 0 || props.businessOpportunityEdit.feeSwap > 100) {
    isValid = false
  }

  return isValid
}

const showSucessMessage = (msg: string) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: msg,
    life: 4000,
  })
}

const showErrorMessage = (msg: string) => {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: msg,
    life: 4000,
  })
}

const cleanOpportunityForm = () => {
  props.businessOpportunityEdit.name = ''
  props.businessOpportunityEdit.email = ''
  props.businessOpportunityEdit.taxId = ''
  props.businessOpportunityEdit.feeSwap = 0
}
</script>

<style lang="css" scoped>
.content {
  display: contents;
}
.inner-row-flex {
  display: flex;
  padding: 0;
}
.green-color {
  color: var(--primary-color);
}
.p-divider-dashed.p-divider-horizontal:before {
  border-color: var(--primary-color);
}

.content {
  display: contents;
}

.green-color {
  color: var(--primary-color);
}

.p-divider-dashed.p-divider-horizontal:before {
  border-color: var(--primary-color);
}

.pt-1 {
  padding-top: 1%;
}

.white-div {
  width: 40px;
  background: #fff;
}

.mt-20 {
  margin-top: 20px;
}

.required-label {
  font-size: 1rem;
}

.business-allie {
  font-size: 25px;
}

.required-label {
  font-size: 1rem;
}
.input-allie {
  margin: 10px;
  display: flex;
  flex-direction: column;
}

.input-allie input {
  width: 90%;
}

span.partner {
  color: var(--primary-color);
}

@media (max-width: 508px) {
  .should-hide {
    display: none !important;
  }
}
</style>
