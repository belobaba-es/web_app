<template>
  <section class="section-main">
    <div class="mt-4 ml-3">
      <BackButtonMobile :subtitle="t('typeWithdrawText')" :title="t('newBeneficiary')" />
    </div>

    <div class="col-12 sm:col-12 md:col-12 lg:col-8 xl:col-12">
      <div class="flex align-items-center">
        <div class="mt-1 col-12">
          <h3 class="">{{ t('textAddBeneficiary') }}</h3>
        </div>
      </div>

      <div class="card p-2">
        <div class="field mt-1">
          <label>{{ t('bankName') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="formObjectPanama.bankName"
              :options="allowed_banks"
              :placeholder="t('bankName')"
              :showClear="true"
              class="dropdown-select"
              optionLabel="name"
              optionValue="name"
            />
          </div>
        </div>

        <div class="field">
          <label>{{ t('accountNumber') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="formObjectPanama.accountDestinationNumber" required type="text" />
          </div>
        </div>

        <div class="field">
          <label>{{ t('typeProduct') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="formObjectPanama.productType"
              :options="productAccountType"
              :placeholder="t('typeProduct')"
              :showClear="true"
              class="dropdown-select"
              optionLabel="name"
              optionValue="name"
            />
          </div>
        </div>
        <div></div>
        <div class="field">
          <label>{{ t('beneficiaryName') }}</label>
          <div class="p-inputgroup">
            <InputText v-model="formObjectPanama.holderName" required type="text" />
          </div>
        </div>

        <h3 class="font-normal mt-3" style="color: #979797">
          {{ t('textAddBeneficiaryUsaStepNote1') }}
          <span class="font-medium" style="color: #1b1b19"> {{ t('textAddBeneficiaryUsaStepNote2') }}</span>
          {{ t('textAddBeneficiaryUsaStepNote3') }}
        </h3>
        <div class="flex justify-content-center">
          <Button
            class="mb-4 mt-3 mr-2 w-8rem"
            outlined
            severity="secondary"
            style="color: #242731; display: flex; justify-content: center"
            @click="cancelProcess()"
            >{{ t('cancel') }}
          </Button>

          <Button
            :loading="submitting"
            class="mb-4 mt-3 ml-2 w-8rem"
            style="display: flex; justify-content: center"
            @click="save"
            >{{ t('send') }} <i class="pi pi-arrow-right pl-3"></i>
          </Button>
        </div>
      </div>
    </div>

    <ModalGeneric
      :subtitle="t('modalBeneficiaryText')"
      :title="t('modalBeneficiaryTitle')"
      :visible="showModal"
      @update:display="closeModal"
    />
  </section>
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'

import { ref } from 'vue'
import router from '../../../../router/router'
import data_banks from '../../../../assets/panama_banks/banks.json'
import ModalGeneric from '../../../../components/ModalGeneric.vue'
import { useNewBeneficiaryPanama } from '../../../withdraw/fiat/panama/composable/useNewBeneficiaryPanama'
import BackButtonMobile from '../../../../components/BackButtonMobile.vue'

const allowed_banks = ref(data_banks)
const { t } = useI18n({ useScope: 'global' })

const closeModal = () => {
  showModal.value = false
  router.push('/withdraw/fiat/panama')
}

const cancelProcess = () => {
  router.push('/withdraw/fiat/panama')
}

const { formObjectPanama, showModal, save, productAccountType, submitting } = useNewBeneficiaryPanama()
</script>

<style lang="scss" scoped>
.card {
  margin: 0 auto;
}

.p-inputgroup input:first-child,
.p-inputgroup > .p-inputwrapper:last-child > .p-inputtext,
.p-dropdown.p-component.p-inputwrapper {
  border-radius: 5px;
  padding: 8px 12px 8px 12px;
}

.dropdown-select {
  padding: 2px 12px 2px 12px !important;
  border-radius: 6px !important;
}
</style>
