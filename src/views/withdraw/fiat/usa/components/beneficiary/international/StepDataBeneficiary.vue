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
            v-model="formObject.profileType"
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
            v-model="formObject.relationshipConsumer"
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
          <span style="">
            {{ t('beneficiaryAddress') }}
          </span>
        </h3>
      </div>
      <div class="col-10 pl-0">
        <div class="font-line"></div>
      </div>
    </div>

    <div class="flex">
      <div class="field col">
        <label>{{ t('countryLabel') }}</label>
        <div class="p-inputgroup">
          <Dropdown
            v-model="formObject.informationOwner.address.country"
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
            v-if="formObject.informationOwner.address.country === 'US'"
            v-model="formObject.informationOwner.address.region"
            :options="state_us"
            :placeholder="t('stateLabel')"
            class="custom-dropdown w-full"
            option-value="state_code"
            optionLabel="name"
            required
          />
          <InputText v-else v-model="formObject.informationOwner.address.region" type="text" />
        </div>
      </div>

      <div class="field col">
        <label>{{ t('cityLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationOwner.address.city" class="w-full" required type="text" />
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="field col-4">
        <label>{{ t('postalCodeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationOwner.address.postalCode" type="text" />
        </div>
      </div>
      <div class="field col">
        <label
          >{{ t('address') }} <small class="pl-2">{{ t('smallAddressBeneficiary') }}</small></label
        >
        <div class="p-inputgroup">
          <InputText v-model="formObject.informationOwner.address.streetOne" type="text" />
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
        :label="t('next')"
        :loading="submitting"
        class="mb-4 mt-3 mr-2 w-8rem"
        iconPos="right"
        @click="activateModal()"
      />
    </div>
  </div>

  <ModalStep />
</template>
<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useNewBeneficiaryInternational } from '../composable/useNewBeneficiaryInternational'
import { useWorld } from '../../../../../../../composables/useWorld'
import Dropdown from 'primevue/dropdown'
import { getRelationToBeneficiary } from '../../../../../../../shared/relationshipTypes'
import ModalStep from '../components/modalStep.vue'
import { useValidateFormInternational } from '../composable/useValidateFormInternational'
import { onMounted, ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { getSeparateName } from '../../../../../helpers/getSeparateName'

const emit = defineEmits(['nextPage', 'prevPage'])
const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const router = useRouter()

const { formObject, accountType, modalStepActivation, submitting } = useNewBeneficiaryInternational()
const { validateDataBeneficiaryForm } = useValidateFormInternational()
const { countryAllowedForUSA, state_us } = useWorld()
const firstName = ref('')
const lastName = ref('')

onMounted(() => {
  if (formObject.value.informationOwner.name !== '') {
    const fullName = getSeparateName(formObject.value.informationOwner.name)
    firstName.value = fullName.firstName
    lastName.value = fullName.lastName
  }
})

watch([firstName, lastName], () => {
  formObject.value.informationOwner.name = `${firstName.value} ${lastName.value}`
})

const activateModal = () => {
  if (firstName.value === '' || lastName.value === '') {
    toast.add({
      severity: 'warn',
      summary: t('warningAllFieldRequired'),
      detail: t('warningNameAndLastNameRequired'),
      life: 4000,
    })
    return
  }
  if (validateDataBeneficiaryForm(formObject.value)) {
    modalStepActivation.value = true
  }
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
