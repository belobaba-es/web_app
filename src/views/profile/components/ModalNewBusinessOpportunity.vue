<template>
  <Dialog
    :visible="display"
    @update:visible="emit('update:display', $event)"
    :modal="true"
    closeIcon="pi pi-times-circle"
    header=" "
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '65vw' }"
  >
    <div class="col-12 content">
      <div class="inner-row-flex mt-20">
        <div class="col-6 should-hide">
          <img
            class="business-allie-image"
            :src="BusinessOpportunitiesImg"
            alt="business-alli-image"
            style="width: 100%; height: 100%"
          />
        </div>

        <div class="col-12 sm:col-5 md:col-5 lg:col-5 xl:col-5 pt-1">
          <div class="form-header">
            <h3 class="business-allie">
              {{ t('save') }}
              <span class="partner">{{ t('businessPartner') }}</span>
            </h3>
            <label class="required-label">{{ t('requiredInformation') }}</label>
          </div>

          <div class="p-inputgroup input-allie">
            <label>{{ t('dni') }}</label>
            <InputText
                type="text"
                v-model="businessOpportunityPayload.taxId"
                :placeholder="t('dni')"
            />
          </div>

          <div class="p-inputgroup input-allie">
            <label>{{ t('fullName') }}</label>
            <InputText
              type="text"
              v-model="businessOpportunityPayload.name"
              :placeholder="t('fullName')"
            />
          </div>

          <div class="p-inputgroup input-allie">
            <label>{{ t('emailLabel') }}</label>
            <InputText
              type="text"
              v-model="businessOpportunityPayload.email"
              :placeholder="t('emailLabel')"
            />
          </div>

          <div class="p-inputgroup input-allie">
            <label>{{ t('fee') }}</label>
            <InputNumber
                style="width: 200px"
              :min="0" :max="100"
              :minFractionDigits="2" :maxFractionDigits="2"
              class="p-invalid" mode="decimal"
              v-model="businessOpportunityPayload.feeSwap"
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
          :label="'save'"
          :loading="isSendingRequest"
          @click="saveBusinessOpportunity()"
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
import BusinessOpportunitiesImg from '../../../assets/img/be_business_partner.png'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { useToast } from 'primevue/usetoast'
import {BusinessAllie} from "../services/businessAllie";

const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const emit = defineEmits(['update:asset-select', 'update:display', 'create'])
const props = defineProps<{
  display: boolean
}>()
const businessOpportunityPayload = ref<{ name?: string, email?: string, taxId?: string, feeSwap: number, status: string}>({
  name: '',
  email: '',
  taxId: '',
  status: '',
  feeSwap: 0,
})
const isSendingRequest = ref(false)
const businessAllieService = new BusinessAllie()

const saveBusinessOpportunity = () => {
  isSendingRequest.value = true
  if (!isValidBusinessOpportunityPayload()) {
    isSendingRequest.value = false
    return
  }
  businessAllieService
      .saveBusinessOpportunity(businessOpportunityPayload.value)
      .then((res: any) => {
        showSucessMessage('Business opportunity saved')
        emit('create', {
          ...res.businessOpportunities
        })
        isSendingRequest.value = false
        cleanPartnerForm()
      })
      .catch((e : any) => {
        isSendingRequest.value = false
        toast.add({
          severity: 'error',
          summary: 'Something went wrong',
          detail: e.response.data.message,
          life: 4000,
        })
      })
}

const isValidBusinessOpportunityPayload = (): boolean => {
  const { name, email, taxId } = businessOpportunityPayload.value
  if (!name || !email || !taxId || name.length < 1 || email.length < 1 || taxId.length < 1) {
    toast.add({
      severity: 'error',
      summary: 'Something went wrong',
      detail: 'All fields are required.',
      life: 4000,
    })

    return false
  }

  return true
}

const showSucessMessage = (msg: string) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: msg,
    life: 4000,
  })
}

const cleanPartnerForm = () => {
  businessOpportunityPayload.value.name = ''
  businessOpportunityPayload.value.email = ''
  businessOpportunityPayload.value.taxId = ''
  businessOpportunityPayload.value.feeSwap = 0
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

.form-header {
  text-align: center;
}

.form-header h3 {
  margin-bottom: 0;
}

@media (max-width: 508px) {
  .should-hide {
    display: none !important;
  }
}
</style>
