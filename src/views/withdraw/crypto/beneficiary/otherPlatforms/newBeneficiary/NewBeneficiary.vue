<template>
  <div class="grid" style="padding: 0 20px">
    <div class="mb-2 col-12">
      <p class="font-semi-bold m-0" style="font-size: 1.2rem">{{ t('addNewBeneficiary') }}</p>
      <p class="font-extra-light m-0">{{ t('CompleteBeneficiaryDetailsTransaction') }}.</p>
    </div>

    <div class="beneficiary-form col-12">
      <div class="form-container">
        <div class="col-12 form-group px-2 float-left">
          <SelectAssetsWithdraw
            :asset-classification-filter="AssetClassificationFilter.CRYPTO_STABLE_COIN"
            :beneficiary="form"
            :isAssetEdit="isAssetEdit"
            :isWithdrawal="isWithdrawal"
            @selectedAsset="selectAsset"
          />
        </div>
        <div class="col-12 md:col-12 lg:col-12 xl:col-4 float-left form-group px-2">
          <label for="fullName">{{ t('firstNameBeneficiary') }}</label>
          <InputText id="fullName" v-model="firstName" class="custom-dropdown w-full" style="box-sizing: border-box" />
          <span style="font-size: 12px">{{ t('ifYouHaveTwoNames') }}</span>
        </div>
        <div class="col-12 md:col-12 lg:col-12 xl:col-4 float-left form-group px-2">
          <label for="fullName">{{ t('firstLastNameBeneficiary') }}</label>
          <InputText id="fullName" v-model="lastName" class="custom-dropdown w-full" style="box-sizing: border-box" />
          <span style="font-size: 12px">{{ t('ifYouHaveTwoLastNames') }}</span>
        </div>
        <div class="col-12 md:col-12 lg:col-12 xl:col-4 float-left form-group px-2">
          <label for="fullName">{{ t('Alias') }}</label>
          <InputText
            id="fullName"
            v-model="form.informationWallet.label"
            class="custom-dropdown w-full"
            style="box-sizing: border-box"
          />
          <span style="font-size: 12px">{{ t('helpTextAlias') }}o</span>
        </div>

        <div class="col-12 md:col-12 lg:col-12 xl:col-6 float-left form-group px-2">
          <label for="walletAddress" class="font-semi-bold">{{ t('walletAddress') }}</label>
          <InputText
            id="walletAddress"
            v-model="form.informationWallet.address"
            class="custom-dropdown w-full"
            style="box-sizing: border-box"
          />
        </div>

        <div class="col-12 md:col-12 lg:col-12 xl:col-6 float-left form-group px-2">
          <label for="countryOfResidence">{{ t('beneficiaryCountry') }}</label>
          <Dropdown
            id="countryOfResidence"
            v-model="form.informationOwner.country"
            :options="countryAllowedForUSA"
            class="custom-dropdown w-full"
            option-value="countryCode"
            optionLabel="name"
          />
        </div>

        <div class="col-12 md:col-12 lg:col-12 xl:col-6 float-left form-group px-2">
          <label for="relationshipWithBeneficiary">{{ t('relationshipConsumer') }}</label>
          <Dropdown
            v-model="form.informationWallet.relationshipConsumer"
            :options="relationshipOptions"
            class="custom-dropdown w-full"
            option-value="value"
            optionLabel="label"
          />
        </div>

        <div class="col-12 md:col-12 lg:col-12 xl:col-6 float-left form-group px-2">
          <label for="beneficiaryType">{{ t('typeBeneficiary') }}</label>
          <Dropdown
            v-model="form.informationWallet.originWallet"
            :options="originWalletOptions"
            class="custom-dropdown w-full"
            option-value="value"
            optionLabel="label"
            @change="toggleInstitutionSection"
          />
        </div>

        <div v-if="showInstitutionSection">
          <p class="mt-3 mb-0 text-uppercase">{{ t('institutionAddress') }}</p>
          <Divider class="mt-0"></Divider>
          <div class="grid mt-5">
            <div class="field col-12 md:col-12 lg:col-12 xl:col-6 float-left">
              <label>{{ t('institutionName') }}</label>
              <div class="p-inputgroup">
                <InputText v-model="form.informationWallet.institutionName" class="custom-dropdown w-full" required />
              </div>
            </div>

            <div class="field col-12 md:col-12 lg:col-12 xl:col-6 float-left">
              <label>{{ t('countryLabel') }}</label>
              <div class="p-inputgroup">
                <Dropdown
                  v-model="form.informationWallet.institutionAddress.country"
                  :loading="loadingCountriesField"
                  :options="countryAllowedForUSA"
                  :placeholder="t('countryPlaceholder')"
                  class="custom-dropdown w-full"
                  filter
                  option-value="countryCode"
                  optionLabel="name"
                  required
                />
              </div>
            </div>

            <div class="field col-12 md:col-12 lg:col-12 xl:col-4 float-left">
              <label>{{ t('stateLabel') }}</label>
              <div class="p-inputgroup">
                <InputText v-model="form.informationWallet.institutionAddress.region" class="custom-dropdown w-full" />
              </div>
            </div>

            <div class="field col-12 md:col-12 lg:col-12 xl:col-4 float-left">
              <label>{{ t('cityLabel') }}</label>
              <div class="p-inputgroup">
                <InputText
                  v-model="form.informationWallet.institutionAddress.city"
                  class="custom-dropdown w-full"
                  required
                  type="text"
                />
              </div>
            </div>

            <div class="field col-12 md:col-12 lg:col-12 xl:col-4 float-left">
              <label>{{ t('postalCodeLabel') }}</label>
              <div class="p-inputgroup">
                <InputText
                  v-model="form.informationWallet.institutionAddress.postalCode"
                  class="custom-dropdown w-full"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div class="field col-12 md:col-12 lg:col-12 xl:col-4 float-left">
            <label>{{ t('streetAddress') }}</label>
            <div class="p-inputgroup">
              <InputText
                v-model="form.informationWallet.institutionAddress.streetOne"
                class="custom-dropdown w-full"
                required
                type="text"
              />
            </div>
          </div>
        </div>

        <div v-if="form.informationWallet.assetId !== ''" class="col-12 float-left">
          <Message :closable="false" icon="pi pi-check-circle" severity="success">
            {{ t('warningAssetNetwork', { networkName: networkAddress }) }}
          </Message>
        </div>
      </div>
      <div class="form-actions mt-4">
        <Button :label="t('back')" class="mx-2 w-8rem" outlined severity="secondary" @click="goBack()" />
        <Button :label="t('save')" :loading="submitting" class="mx-2 w-8rem" @click="saveBeneficiary()" />
      </div>
    </div>
  </div>
  <DialogConfirmationBeneficiaryCrypto :isOpen="isModalOpen" @update:visible="openConfirmationModal($event)" />
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import Divider from 'primevue/divider'
import { useWorld } from '../../../../../../composables/useWorld'
import { AssetClassificationFilter } from '../../../../../deposit/types/asset.interface'
import SelectAssetsWithdraw from '../../../components/SelectAssetsWithdraw.vue'
import DialogConfirmationBeneficiaryCrypto from './components/DialogConfirmationBeneficiaryCrypto.vue'
import { useBeneficiaryCrypto } from '../../../composable/useBeneficiaryCrypto'
import { useWithdrawalCrypto } from '../../../composable/useWithdrawalCrypto'
import { getSeparateName } from '../../../../helpers/getSeparateName'

const { fetchCountryAllowUsa, loadingCountriesField, countryAllowedForUSA } = useWorld()
const { t } = useI18n({ useScope: 'global' })

const { isWithdrawal } = useWithdrawalCrypto()
const networkAddress = ref('')
const {
  form,
  showInstitutionSection,
  toggleInstitutionSection,
  originWalletOptions,
  relationshipOptions,
  saveBeneficiary,
  selectAsset,
  submitting,
  goBack,
  isModalOpen,
  isAssetEdit,
  firstName,
  lastName,
} = useBeneficiaryCrypto()

onMounted(async () => {
  isWithdrawal.value = false
  await fetchCountryAllowUsa()

  if (form.value.informationOwner.name !== '') {
    const fullName = getSeparateName(form.value.informationOwner.name)
    firstName.value = fullName.firstName
    lastName.value = fullName.lastName
  }
})

const openConfirmationModal = (b: boolean) => {
  isModalOpen.value = b
}
watch([firstName, lastName], () => {
  form.value.informationOwner.name = `${firstName.value} ${lastName.value}`
})
</script>
<style lang="scss" scoped>
.beneficiary-form {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--primary-color);
}

label {
  font-size: 1.15rem;
}

.form-container {
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 380px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.custom-dropdown {
  border-radius: 10px !important;
  border: 1px solid var(--primary-color) !important;
}

.float-left {
  float: left;
}

.p-message.p-message-success {
  background: #d3f3e5;
  border: medium solid #d3f3e5;
  color: #30624a;
  border-radius: 4px;
}
</style>
