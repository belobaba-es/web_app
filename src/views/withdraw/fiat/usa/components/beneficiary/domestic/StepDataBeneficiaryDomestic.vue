<template>
  <h3 class="mt-5 font-normal">{{ t('textAddBeneficiaryUsa') }}</h3>
  <div class="card col-12 md:col-12">
    <div class="flex">
      <div class="field col">
        <label>{{ t('firstNameBeneficiary') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="firstName" type="text" />
        </div>
        <div>
          <span class="help-text text-1xl">{{ t('helpTextNameBeneficiary') }}</span>
        </div>
      </div>
      <div class="field col">
        <label>{{ t('firstLastNameBeneficiary') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="lastName" type="text" />
        </div>
        <div>
          <span class="help-text text-1xl">{{ t('helpTextLastNameBeneficiary') }}</span>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="field col">
        <label>{{ t('beneficiaryType') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObjectDomestic.profileType"
            :options="accountType"
            class="w-full md:w-14rem"
            option-value="description"
            optionLabel="name"
          />
        </div>
      </div>
      <div class="field col">
        <label>{{ t('relationToBeneficiary') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObjectDomestic.relationshipConsumer"
            :options="getRelationToBeneficiary()"
            class="w-full md:w-14rem"
            option-value="description"
            optionLabel="name"
          />
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="col">
        <h3 class="font-medium">
          <span style="font-size: 14px">
            {{ t('beneficiaryAddress') }}
          </span>
        </h3>
      </div>
      <div class="col-10">
        <div class="font-line"></div>
      </div>
    </div>

    <div class="flex">
      <div class="field col">
        <label>{{ t('countryLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObjectDomestic.informationOwner.address.country"
            :loading="loadingCountriesField"
            :options="countryAllowedForUSA"
            :placeholder="t('countryPlaceholder')"
            class="w-full"
            filter
            option-value="countryCode"
            optionLabel="name"
            required
          />
        </div>
      </div>
      <div class="field col">
        <label>{{ t('stateLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-if="formObjectDomestic.informationOwner.address.country === 'US'"
            v-model="formObjectDomestic.informationOwner.address.region"
            :options="state_us"
            :placeholder="t('stateLabel')"
            class="custom-dropdown w-full"
            option-value="state_code"
            optionLabel="name"
            required
          />
          <InputText v-else v-model="formObjectDomestic.informationOwner.address.region" type="text" />
        </div>
      </div>

      <div class="field col">
        <label>{{ t('cityLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObjectDomestic.informationOwner.address.city" class="w-full" required type="text" />
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="field col-4">
        <label>{{ t('postalCodeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObjectDomestic.informationOwner.address.postalCode" type="text" />
        </div>
      </div>
      <div class="field col">
        <label
          >{{ t('address') }} <small class="pl-2">{{ t('smallAddressBeneficiary') }}</small></label
        >
        <div class="p-inputgroup">
          <InputText v-model="formObjectDomestic.informationOwner.address.streetOne" type="text" />
        </div>
      </div>
    </div>
  </div>

  <div class="field mt-5 flex">
    <div class="col">
      <h3 class="font-normal m-0" style="color: #979797">
        {{ t('textAddBeneficiaryUsaStepNote1') }}
        <span class="font-medium" style="color: #1b1b19"> {{ t('textAddBeneficiaryUsaStepNote2') }}</span>
        {{ t('textAddBeneficiaryUsaStepNote3') }}
      </h3>
    </div>
    <div class="justify-content-end flex">
      <Button
        class="mb-4 mt-3 mr-2 w-8rem"
        outlined
        severity="secondary"
        style="color: #242731; display: flex; justify-content: center"
        @click="goBack"
        >{{ t('back') }}
      </Button>
      <Button
        :label="t('send')"
        :loading="submitting"
        class="mb-4 mt-3 mr-2 w-8rem"
        iconPos="right"
        @click="sendData()"
      />
    </div>
  </div>

  <Dialog
    v-model:visible="visibleModal"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :header="t('withdraw') + ' ' + t('fiat')"
    :style="{ width: '25rem' }"
    :show-header="false"
    modal
  >
    <div class="flex justify-content-end text-2xl cursor-pointer" @click="close()">x</div>
    <div class="text-center">
      <h1 class="font-medium" style="line-height: 1; color: #00beb0">{{ t('modalCreateBeneficiary') }}</h1>
      <p>{{ t('modalCreateBeneficiary2') }}</p>
      <Button :loading="submitting" class="col-12 p-3" label="OK" @click="redirectButton()" />
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useWorld } from '../../../../../../../composables/useWorld'
import Dropdown from 'primevue/dropdown'
import { useNewBeneficiaryDomestic } from '../composable/useNewBeneficiaryDomestic'
import { getRelationToBeneficiary } from '../../../../../../../shared/relationshipTypes'
import { useValidateFormDomestic } from '../composable/useValidateFromDomestic'
import Dialog from 'primevue/dialog'
import { NetworkBank, TypeBankDetails } from '../../../../../enums/beneficiary.enum'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'

const emit = defineEmits(['nextPage', 'prevPage'])
const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const router = useRouter()

const { formObjectDomestic, accountType, saveBeneficiaryDomestic, submitting, visibleModal } =
  useNewBeneficiaryDomestic()
const { validateDomesticBeneficiaryForm } = useValidateFormDomestic()
const { countryAllowedForUSA, loadingCountriesField, state_us } = useWorld()
const Route = useRoute()
const firstName = ref('')
const lastName = ref('')

onMounted(() => {
  if (formObjectDomestic.value.informationOwner.name !== '') {
    firstName.value = formObjectDomestic.value.informationOwner.name.split(' ')[0]
    lastName.value = formObjectDomestic.value.informationOwner.name.split(' ')[1]
  }
})

watch([firstName, lastName], () => {
  formObjectDomestic.value.informationOwner.name = `${firstName.value} ${lastName.value}`
})

const close = () => {
  visibleModal.value = false
}

const sendData = () => {
  if (firstName.value === '' || lastName.value === '') {
    toast.add({
      severity: 'warn',
      summary: t('warningAllFieldRequired'),
      detail: t('warningNameAndLastNameRequired'),
      life: 4000,
    })
    return
  }
  if (validateDomesticBeneficiaryForm(formObjectDomestic.value)) {
    formObjectDomestic.value.informationBank.typeBeneficiaryBankWithdrawal = TypeBankDetails.NATIONAL
    formObjectDomestic.value.informationBank.networkBank = Route.path.includes('ACH')
      ? NetworkBank.ACH
      : NetworkBank.WIRE
    saveBeneficiaryDomestic()
  }
}

const redirectButton = () => {
  visibleModal.value = false
  router.push('/withdraw/fiat/usa')
}

const goBack = () => {
  router.go(-1)
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
