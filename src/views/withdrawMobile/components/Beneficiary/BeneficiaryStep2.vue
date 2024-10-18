<template>
  <div v-if="showsStepTwoFirstPart" class="grid step2-1">
    <div class="col-12">
      <h3 class="mt-5 mb-0 font-semi-bold">{{ t('dataBeneficiary') }}</h3>
    </div>
    <div class="col-12">
      <h4 class="m-0 font-normal">{{ t('textAddBeneficiaryUsa') }}</h4>
    </div>
    <div class="field col-12">
      <label>{{ t('firstNameBeneficiary') }}</label>
      <InputText v-model="firstName" class="float-left w-full" type="text" />
      <div>
        <span class="help-text text-1xl">{{ t('helpTextNameBeneficiary') }}</span>
      </div>
    </div>
    <div class="field col-12">
      <label>{{ t('firstLastNameBeneficiary') }}</label>
      <InputText v-model="lastName" class="float-left w-full" type="text" />
      <div>
        <span class="help-text text-1xl">{{ t('helpTextLastNameBeneficiary') }}</span>
      </div>
    </div>
    <div class="field col-12">
      <label>{{ t('beneficiaryType') }}</label>
      <Dropdown
        v-model="props.data.formObject.profileType"
        :options="props.data.accountType"
        class="custom-dropdown w-full"
        option-value="description"
        optionLabel="name"
      />
    </div>
    <div class="field col-12">
      <label>{{ t('relationToBeneficiary') }}</label>
      <Dropdown
        v-model="props.data.formObject.relationshipConsumer"
        :options="getRelationToBeneficiary()"
        class="custom-dropdown w-full"
        option-value="description"
        optionLabel="name"
      />
    </div>
    <div class="flex justify-content-center col-12">
      <Button
        :label="t('back')"
        class="mb-4 mt-3 mr-2 w-8rem"
        outlined
        severity="secondary"
        style="color: #242731; display: flex; justify-content: center"
        @click="goBack()"
      />

      <Button
        :loading="props.data.loading"
        class="mb-4 mt-3 ml-2 w-8rem"
        style="display: flex; justify-content: center"
        @click="continuesStep()"
        >{{ t('next') }} <i class="pi pi-arrow-right pl-3"></i>
      </Button>
    </div>
  </div>
  <div v-else class="grid step2-2">
    <div class="col-12">
      <h3 class="mt-5 mb-0 font-semi-bold">{{ t('dataBeneficiary') }}</h3>
    </div>
    <div class="col-12">
      <h3 class="font-normal m-0">
        {{ t('beneficiaryAddress') }}
      </h3>
    </div>
    <div class="col-12">
      <label>{{ t('countryLabel') }}</label>
      <Dropdown
        v-model="props.data.formObject.informationOwner.address.country"
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
    <div class="col-12">
      <label class="label">{{ t('stateLabel') }}</label>
      <Dropdown
        v-if="props.data.formObject.informationOwner.address.country === 'US'"
        v-model="props.data.formObject.informationOwner.address.region"
        :options="state_us"
        :placeholder="t('stateLabel')"
        class="custom-dropdown w-full"
        option-value="state_code"
        optionLabel="name"
        required
      />
      <InputText v-else v-model="props.data.formObject.informationOwner.address.region" class="w-full" type="text" />
    </div>

    <div class="col-12">
      <label>{{ t('cityLabel') }}</label>
      <InputText v-model="props.data.formObject.informationOwner.address.city" class="w-full" required type="text" />
    </div>
    <div class="col-12">
      <label>{{ t('postalCodeLabel') }}</label>
      <InputText v-model="props.data.formObject.informationOwner.address.postalCode" class="w-full" type="text" />
    </div>
    <div class="field col-12">
      <label>{{ t('address') }} </label>
      <Textarea v-model="props.data.formObject.informationOwner.address.streetOne" class="w-full" />
      <small class="pl-2">{{ t('smallAddressBeneficiary') }}</small>
    </div>
    <div class="flex justify-content-center col-12">
      <Button
        :label="t('back')"
        class="mb-4 mt-3 mr-2 w-8rem"
        outlined
        severity="secondary"
        style="color: #242731; display: flex; justify-content: center"
        @click="goBackStep()"
      />
      <Button
        :label="t('next')"
        :loading="props.data.loading"
        class="mb-4 mt-3 ml-2 w-8rem"
        iconPos="right"
        @click="saveBeneficiary()"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { useI18n } from 'vue-i18n'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { useBeneficiary } from '../../composables/useBeneficiary'
import { NewBeneficiary } from '../../../withdraw/type/beneficiary.type'
import { getRelationToBeneficiary } from '../../../../shared/relationshipTypes'
import { useWorld } from '../../../../composables/useWorld'
import { onMounted, ref, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { getSeparateName } from '../../../withdraw/helpers/getSeparateName'

const { t } = useI18n({ useScope: 'global' })
const { countryAllowedForUSA, loadingCountriesField, state_us } = useWorld()
const toast = useToast()
const router = useRouter()
const firstName = ref('')
const lastName = ref('')

const props = defineProps({
  data: {
    type: Object,
    required: true,
    formObject: {
      type: Object as () => NewBeneficiary,
      required: true,
    },
    selectedCountry: {
      type: Object,
      required: true,
    },
    accountType: {
      type: Array as () => Array<{ name: string; description: string }>,
      required: true,
    },
    loading: Boolean,
    step2: Boolean,
  },
})

onMounted(() => {
  if (props.data.formObject.informationOwner.name !== '') {
    const fullName = getSeparateName(props.data.formObject.informationOwner.name)
    firstName.value = fullName.firstName
    lastName.value = fullName.lastName
  }
})

watch([firstName, lastName], () => {
  props.data.formObject.informationOwner.name = `${firstName.value.trim()} ${lastName.value.trim()}`
})

const emit = defineEmits(['goBack', 'saveBeneficiary'])
const { showsStepTwoFirstPart } = useBeneficiary()
const goBack = () => {
  router.go(-1)
}
const saveBeneficiary = () => {
  if (firstName.value === '' || lastName.value === '') {
    toast.add({
      severity: 'warn',
      summary: t('warningAllFieldRequired'),
      detail: t('warningNameAndLastNameRequired'),
      life: 4000,
    })
    return
  }

  emit('saveBeneficiary')
}
const continuesStep = () => {
  showsStepTwoFirstPart.value = false
}
const goBackStep = () => {
  showsStepTwoFirstPart.value = true
}
</script>
<style lang="scss" scoped>
.custom-dropdown {
  border-radius: 4px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  box-sizing: inherit !important;
}

.p-inputtext {
  box-sizing: inherit !important;
}

label {
  float: left;
  width: 100%;
}

.p-inputgroup input:first-child,
.p-inputgroup > .p-inputwrapper:last-child > .p-inputtext,
.p-dropdown.p-component.p-inputwrapper {
  border-radius: 5px;
  padding: 8px 12px 8px 12px;
}
</style>
