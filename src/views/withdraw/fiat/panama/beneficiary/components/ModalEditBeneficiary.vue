<template>
  <section class="section-main">
    <div class="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
      <div class="flex align-items-center">
        <div class="mt-1 col-12">
          <h2 class="font-regular text-primary mt-0">{{ t('dataBeneficiary') }}</h2>
        </div>
      </div>

      <div class="field mt-1">
        <label>{{ t('bankName') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObjectPanama.bankName"
            :options="allowed_banks"
            :placeholder="t('bankName')"
            class="select-asset"
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
            class="select-asset"
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

      <div class="field mt-5 flex justify-content-end">
        <Button :label="t('textEditBeneficiary')" :loading="submitting" class="px-5" iconPos="right" @click="save" />
      </div>
    </div>

    <ModalGeneric
      :subtitle="t('confiEditBeneficiary')"
      :title="t('textBtnBeneficiary')"
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
import data_banks from '../../../../../../assets/panama_banks/banks.json'
import { useNewBeneficiaryPanama } from '../../composable/useNewBeneficiaryPanama'
import { ref } from 'vue'
import ModalGeneric from '../../../../../../components/ModalGeneric.vue'
import router from '../../../../../../router/router'

const allowed_banks = ref(data_banks)
const { t } = useI18n({ useScope: 'global' })

const closeModal = () => {
  showModal.value = false
  router.push('/withdraw/fiat/panama')
}

const { formObjectPanama, showModal, save, productAccountType, submitting } = useNewBeneficiaryPanama()
</script>
