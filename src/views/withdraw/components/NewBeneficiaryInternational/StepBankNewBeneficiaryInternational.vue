<template>
  <div class="col-12 md:col-8 mt-5"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWorld } from '../../../../composables/useWorld'
import { useUserStore } from '../../../../stores/user'

import { useToast } from 'primevue/usetoast'

const { t } = useI18n({ useScope: 'global' })

const toast = useToast()

const { getUserName } = useUserStore()

const emit = defineEmits(['nextPage', 'prevPage'])

const {
  countries,
  fetchCountries,
  loadingCountiesField,
  countriesInputIsEmpty,
  statesInputIsEmpty,
  loadingStatesField,
  states,
  onChangeCountryHandler,
  onChangeStateHandler,
} = useWorld()

const {
  countries: bankCountries,
  statesInputIsEmpty: bankStatesInputIsEmpty,
  loadingStatesField: bankLoadingStatesField,
  states: bankStates,
  onChangeCountryHandler: onBankChangeCountryHandler,
  onChangeStateHandler: onBankChangeStateHandler,
} = useWorld()

const props = defineProps<{
  formData: object
}>()

const realName = ref<string>(getUserName())
const country = ref<string>('')
const streetOne = ref<string>('')
const streetTwo = ref<string>('')
const city = ref<string>('')
const state = ref<string>('')
const postalCode = ref<string>('')

onMounted(() => {
  fetchCountries(true).then(() => {
    bankCountries.value = countries.value
  })

  console.log(props.formData)
})

const validateFields = () => {
  return [realName, country, streetOne, city, state, postalCode].every(field => field.value.trim() !== '')
}

const nextPage = () => {
  if (validateFields()) {
    const formData = ref<object>({
      ...props.formData,
      realName: realName.value, // Asignar el valor actual
      country: country.value,
      streetOne: streetOne.value,
      streetTwo: streetTwo.value,
      city: city.value,
      state: state.value,
      postalCode: postalCode.value,
    })

    const page = 1
    emit('nextPage', {
      pageIndex: page,
      formData: JSON.stringify(formData.value),
    })
  } else {
    toast.add({
      severity: 'warn',
      summary: t('warningAllFieldRequired'),
      detail: t('warningDetailAllFieldRequired'),
      life: 4000,
    })
  }
}
</script>
