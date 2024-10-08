<template>
  <section class="section-main">
    <div class="col-12 sm:col-12 md:col-12 lg:col-8 xl:col-12">
      <div class="flex align-items-center">
        <Button class="p-button-text" icon="pi pi-angle-left" iconPos="left" label="" @click="toBack" />
        <p class="font-regular" style="font-size: 16px">
          <span style="color: #cecece">{{ t('newBeneficiary') }}</span> /
          <span>{{ t('typeWithdrawText') }}</span>
        </p>
      </div>

      <div class="flex align-items-center">
        <div class="mt-1 col-12">
          <h3 class="">{{ t('textAddBeneficiary') }}</h3>
        </div>
      </div>

      <div class="card border">
        <div class="field mt-1">
          <label>{{ t('bankName') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="formObjectPanama.bankName"
              :options="allowed_banks"
              :placeholder="t('bankName')"
              :showClear="true"
              class="select-asset"
              optionLabel="name"
              optionValue="value"
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
          <Button
            v-if="isNewBeneficiaryRoute"
            :label="t('saveNewPayee')"
            :loading="submitting"
            class="px-5"
            iconPos="right"
            @click="validateAndSave"
          />
          <Button
            v-else
            :label="t('textEditBeneficiary')"
            :loading="submitting"
            class="px-5"
            iconPos="right"
            @click="validateAndSave"
          />
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
import data_banks from '../../../../../../assets/panama_banks/banks.json'
import { useNewBeneficiaryPanama } from '../../composable/useNewBeneficiaryPanama'
import { computed, ref } from 'vue'
import ModalGeneric from '../../../../../../components/ModalGeneric.vue'
import router from '../../../../../../router/router'
import { useRoute } from 'vue-router'

const route = useRoute()
const allowed_banks = ref(data_banks)

const isNewBeneficiaryRoute = computed(() => route.path.includes('new-beneficiary'))
const { t } = useI18n({ useScope: 'global' })

const closeModal = () => {
  showModal.value = false
  router.push('/withdraw/fiat/panama')
}

const { formObjectPanama, validateFields, showModal, save, toBack, productAccountType, submitting } =
  useNewBeneficiaryPanama()

const validateAndSave = () => {
  if (validateFields()) {
    save()
  }
}
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid var(--primary-color);
  margin: 0 auto;
}

.p-inputgroup input:first-child,
.p-inputgroup > .p-inputwrapper:last-child > .p-inputtext,
.p-dropdown.p-component.p-inputwrapper {
  border-radius: 5px;
  padding: 8px 12px 8px 12px;
}

.p-dropdown {
  border-radius: 5px !important;
  padding: 1px !important;
}

.font-line {
  border-bottom: 1px solid var(--primary-color);
  height: 27px;
}
</style>
