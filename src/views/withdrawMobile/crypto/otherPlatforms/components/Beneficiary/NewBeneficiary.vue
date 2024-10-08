<template>
  <div class="pl-3">
    <BackButtonMobile v-if="!showInstitutionSection" :title="t('otherPlatforms')" :subtitle="t('newBeneficiary')" />
    <BackButtonStep v-else :title="t('otherPlatforms')" :subtitle="t('newBeneficiary')" @goBack="backForm" />
  </div>

  <div class="grid" style="padding: 0 20px">
    <div v-if="!showInstitutionSection" class="container-form-beneficiary">
      <div class="col-12 pb-0">
        <label class="font-semi-bold m-0">{{ t('addNewBeneficiary') }}</label>
      </div>
      <div class="col-12">
        <label class="font-extra-light m-0">{{ t('CompleteBeneficiaryDetailsTransaction') }}.</label>
      </div>

      <div class="col-12 p-0 pb-3">
        <SelectAssetsWithdraw @selectedAsset="selectAsset" />
      </div>
      <div class="col-12">
        <label>{{ t('firstNameBeneficiary') }}</label>
        <InputText style="box-sizing: border-box" class="custom-dropdown w-full" v-model="firstName" type="text" />
        <span style="font-size: 12px">{{ t('ifYouHaveTwoNames') }}</span>
      </div>
      <div class="col-12">
        <label>{{ t('firstLastNameBeneficiary') }}</label>
        <InputText style="box-sizing: border-box" class="custom-dropdown w-full" v-model="lastName" type="text" />
        <span style="font-size: 12px">{{ t('ifYouHaveTwoLastNames') }}</span>
      </div>
      <div class="col-12">
        <label for="fullName">{{ t('Alias') }}</label>
        <InputText
          id="fullName"
          v-model="form.informationWallet.label"
          class="custom-dropdown w-full"
          style="box-sizing: border-box"
        />
        <span style="font-size: 12px">{{ t('helpTextAlias') }}</span>
      </div>
      <div class="col-12 px-2">
        <label for="walletAddress" class="font-semi-bold">{{ t('walletAddress') }}</label>
        <InputText
          class="custom-dropdown w-full"
          style="box-sizing: border-box"
          v-model="form.informationWallet.address"
          id="walletAddress"
        />
      </div>
      <div class="col-12 px-2">
        <label for="countryOfResidence">{{ t('beneficiaryCountry') }}</label>
        <Dropdown
          class="custom-dropdown w-full"
          v-model="form.informationOwner.country"
          id="countryOfResidence"
          :options="countryAllowedForUSA"
          optionLabel="name"
          option-value="countryCode"
        />
      </div>
      <div class="col-12 px-2">
        <label for="relationshipWithBeneficiary">{{ t('relationshipConsumer') }}</label>
        <Dropdown
          class="custom-dropdown w-full"
          v-model="form.informationWallet.relationshipConsumer"
          :options="relationshipOptions"
          optionLabel="label"
          option-value="value"
        />
      </div>
      <div class="col-12 px-2">
        <label for="beneficiaryType">{{ t('typeBeneficiary') }}</label>
        <Dropdown
          class="custom-dropdown w-full"
          v-model="form.informationWallet.originWallet"
          :options="originWalletOptions"
          optionLabel="label"
          option-value="value"
          @change="toggleInstitutionSection"
        />
      </div>
    </div>
    <div v-else>
      <p class="mt-3 mb-0 text-uppercase">{{ t('institutionAddress') }}</p>
      <Divider class="mt-0"></Divider>
      <div class="grid mt-2">
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
              filter
              v-model="form.informationWallet.institutionAddress.country"
              :options="countryAllowedForUSA"
              optionLabel="name"
              option-value="countryCode"
              :loading="loadingCountriesField"
              :placeholder="t('countryPlaceholder')"
              class="custom-dropdown w-full"
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
              type="text"
              v-model="form.informationWallet.institutionAddress.city"
              class="custom-dropdown w-full"
              required
            />
          </div>
        </div>

        <div class="field col-12 md:col-12 lg:col-12 xl:col-4 float-left">
          <label>{{ t('postalCodeLabel') }}</label>
          <div class="p-inputgroup">
            <InputText
              type="text"
              class="custom-dropdown w-full"
              v-model="form.informationWallet.institutionAddress.postalCode"
            />
          </div>
        </div>
      </div>

      <div class="field col-12 md:col-12 lg:col-12 xl:col-4 float-left">
        <label>{{ t('streetAddress') }}</label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            class="custom-dropdown w-full"
            required
            v-model="form.informationWallet.institutionAddress.streetOne"
          />
        </div>
      </div>
    </div>
    <div class="col-12 float-left" v-if="form.informationWallet.assetId !== ''">
      <Message severity="success" icon="pi pi-check-circle" :closable="false">
        {{ t('warningAssetNetwork', { networkName: networkAddress }) }}
      </Message>
    </div>
  </div>
  <div class="form-actions text-center mt-4">
    <Button
      severity="secondary"
      outlined
      class="mx-2 w-8rem"
      :label="t('back')"
      @click="showInstitutionSection ? backForm() : goBack()"
    />
    <Button class="mx-2 w-8rem" :label="t('save')" @click="saveBeneficiary()" :loading="submitting" />
  </div>

  <DialogConfirmationBeneficiaryCrypto :isOpen="isModalOpen" @update:visible="openConfirmationModal($event)" />
</template>
<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import SelectAssetsWithdraw from '../../../../../withdraw/crypto/components/SelectAssetsWithdraw.vue'
import InputText from 'primevue/inputtext'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import DialogConfirmationBeneficiaryCrypto from '../../../../../withdraw/crypto/beneficiary/otherPlatforms/newBeneficiary/components/DialogConfirmationBeneficiaryCrypto.vue'
import Message from 'primevue/message'
import { useWorld } from '../../../../../../composables/useWorld'
import { useI18n } from 'vue-i18n'
import { useBeneficiaryCrypto } from '../../../../../withdraw/crypto/composable/useBeneficiaryCrypto'
import { useWithdrawalCrypto } from '../../../../../withdraw/crypto/composable/useWithdrawalCrypto'
import { onMounted, ref, watch } from 'vue'
import BackButtonMobile from '../../../../../../components/BackButtonMobile.vue'
import BackButtonStep from '../../../../components/BackButtonStep.vue'

const { fetchCountryAllowUsa, loadingCountriesField, countryAllowedForUSA } = useWorld()
const { t } = useI18n({ useScope: 'global' })
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
  firstName,
  lastName,
} = useBeneficiaryCrypto()
const { isWithdrawal } = useWithdrawalCrypto()
const networkAddress = ref('')

onMounted(async () => {
  isWithdrawal.value = false
  await fetchCountryAllowUsa()
  if (form.value.informationOwner.name !== '') {
    firstName.value = form.value.informationOwner.name.split(' ')[0]
    lastName.value = form.value.informationOwner.name.split(' ')[1]
  }
})
const openConfirmationModal = (b: boolean) => {
  isModalOpen.value = b
}
const backForm = () => {
  form.value.informationWallet.originWallet = 'OTHER'
  showInstitutionSection.value = false
}
watch([firstName, lastName], () => {
  form.value.informationOwner.name = `${firstName.value} ${lastName.value}`
})
</script>
<style scoped lang="scss">
.selectCypto {
  border-radius: 4px !important;
  border: 1px solid #ececec !important;
}

.p-dropdown {
  border-radius: 4px !important;
}
</style>
