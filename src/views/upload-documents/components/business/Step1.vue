<template>
  <section class="section-main">
    <div class="mb-4">
      <h1 class="text-2xl">
        {{ t('accountRegistration') }}
      </h1>
      <p class="text-3xl font-medium">{{ t('titleBusinessAccount') }}</p>
    </div>

    <div class="formgrid grid col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('businessNameLabel') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="name" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextCompanyName') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('emailLabel') }}</label>
        <div class="p-inputgroup">
          <!-- //FIX readonly -->
          <InputText type="text" v-model="email" class="w-full" required />
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelDocumentCompany') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="registerNumber" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextCompanyTax') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelNaics') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="naics" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextNaics') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelnaicsDescription') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="naicsDescription" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextNaicsDescription') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
        <label>{{ t('labelEstablishedDate') }}</label>
        <div class="p-inputgroup">
          <Calendar v-model="establishedDate" placeholder="0000/00/00" dateFormat="yy/mm/dd" />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextEstablishedDate') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('labelWebsite') }}</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="website" class="w-full" required />
        </div>
        <div>
          <span class="help-text">{{ t('helpTextWebsite') }}</span>
        </div>
      </div>

      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 phone-input">
        <label>{{ t('phoneLabel') }}</label>
        <div class="field grid">
          <div class="col-4">
            <Dropdown class="w-full" v-model="phoneCountry" :options="calling_code" />
          </div>
          <div class="col-8">
            <InputText id="phoneNumber" type="text" class="" v-model="phoneNumber" required />
            <div>
              <span class="help-text">{{ t('helpTextPhone') }}</span>
            </div>
          </div>
        </div>
      </div>

      <p class="mt-4 mb-0 text-uppercase">{{ t('labelAdressRegistration') }}</p>
      <Divider class="mt-0"></Divider>
      <div class="grid mt-2">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('countryLabel') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="registerCountry"
              :options="countries"
              optionLabel="name"
              option-value="country_code"
              :loading="loadingCountiesField"
              :placeholder="t('countryPlaceholder')"
              :disabled="countriesInputIsEmpty"
              class="w-full"
              @change="onChangeCountryHandler"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCountry') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('stateLabel') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="registerState"
              :options="states"
              optionLabel="name"
              option-value="state_code"
              :loading="loadingStatesField"
              :placeholder="t('statePlaceHolder')"
              :disabled="statesInputIsEmpty"
              class="w-full"
              @change="onChangeStateHandler"
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextState') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('cityLabel') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="registerCity" class="w-full" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCity') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddress') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="registerStreetOne" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressOne') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="registerStreetTwo" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressTwo') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('postalCodeLabel') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="registerPostalCode" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressPostalCode') }}</span>
          </div>
        </div>
      </div>

      <div class="flex w-100 justify-content-between align-items-center mt-2">
        <div>
          <p class="mt-4 mb-0 text-uppercase">{{ t('labelAdressFisical') }}</p>
        </div>
        <div class="field-checkbox mt-2">
          <Checkbox
            inputId="patriot"
            v-model="isFisicalAdress"
            @change="physicalAddressIsSameRegisteredAddress"
            :binary="true"
          />
          <label for="patriot">Click aqui si la direccion fisica es igual que la direccion de registro</label>
        </div>
      </div>

      <Divider class="mt-0"></Divider>
      <div class="grid mt-2">
        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('countryLabel') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="fisicalCountry"
              :options="countries"
              optionLabel="name"
              option-value="country_code"
              :loading="loadingCountiesField"
              :placeholder="t('countryPlaceholder')"
              :disabled="countriesInputIsEmpty"
              class="w-full"
              @change="onChangeCountryHandlerTwo"
              required
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCountry') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('stateLabel') }}</label>
          <div class="p-inputgroup">
            <Dropdown
              v-model="fisicalState"
              :options="statesTwo"
              optionLabel="name"
              option-value="state_code"
              :loading="loadingStatesFieldTwo"
              :placeholder="t('statePlaceHolder')"
              :disabled="statesInputIsEmpty"
              class="w-full"
              @change="onChangeStateHandler"
            />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextState') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('cityLabel') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="fisicalCity" class="w-full" required />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextCity') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddress') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="fisicalStreetOne" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressOne') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('streetAddressTwo') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="fisicalStreetTwo" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressTwo') }}</span>
          </div>
        </div>

        <div class="field col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <label>{{ t('postalCodeLabel') }}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="fisicalPostalCode" />
          </div>
          <div>
            <span class="help-text">{{ t('helpTextAddressPostalCode') }}</span>
          </div>
        </div>
      </div>

      <div class="field col-12 flex align-items-center justify-content-end">
        <Button :label="t('save')" class="px-5 mt-2 btn-submit" @click="saveData()" :loading="submitting" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Divider from 'primevue/divider'
import Checkbox from 'primevue/checkbox'

import { useToast } from 'primevue/usetoast'

import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useWorld } from '../../../../composables/useWorld'
import { useAccount } from '../../../../composables/useAccount'
import showExceptionError from '../../../../shared/showExceptionError'
import showMessage from '../../../../shared/showMessageArray'

import { UploadDocumentsService } from '../../services/upload-documents'
import router from '../../../../router'
const {
  countries,
  fetchCountries,
  loadingCountiesField,
  countriesInputIsEmpty,
  statesInputIsEmpty,
  loadingStatesField,
  loadingStatesFieldTwo,
  states,
  statesTwo,
  onChangeCountryHandler,
  onChangeCountryHandlerTwo,
  onChangeStateHandler,
  calling_code,
} = useWorld()

const { t } = useI18n({ useScope: 'global' })

const toast = useToast()

const submitting = ref(false)

const name = ref<string>('')
const email = ref<string>('')
const registerNumber = ref<string>('')
const naics = ref<string>('')
const naicsDescription = ref<string>('')
const establishedDate = ref<string>('')
const website = ref<string>('')
const phoneCountry = ref<string>('')
const phoneNumber = ref<string>('')

const registerStreetOne = ref<string>('')
const registerStreetTwo = ref<string>('')
const registerPostalCode = ref<string>('')
const registerCity = ref<string>('')
const registerState = ref<string>('')
const registerCountry = ref<string>('')

const fisicalStreetOne = ref<string>('')
const fisicalStreetTwo = ref<string>('')
const fisicalPostalCode = ref<string>('')
const fisicalCity = ref<string>('')
const fisicalState = ref<string>('')
const fisicalCountry = ref<string>('')

const isFisicalAdress = ref<boolean>(false)

onMounted(async () => {
  await fetchCountries()
})

const convertISODateToYYYYMMDD = (isoDateString: string) => {
  const date = new Date(isoDateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}
const physicalAddressIsSameRegisteredAddress = () => {
  if (isFisicalAdress.value) {
    fisicalStreetOne.value = registerStreetOne.value
    fisicalStreetTwo.value = registerStreetTwo.value
    fisicalPostalCode.value = registerPostalCode.value
    fisicalCity.value = registerCity.value
    fisicalState.value = registerState.value
    fisicalCountry.value = registerCountry.value
  }else{
    fisicalStreetOne.value = ''
    fisicalStreetTwo.value = ''
    fisicalPostalCode.value = ''
    fisicalCity.value = ''
    fisicalState.value = ''
    fisicalCountry.value = ''
  }
}

const saveData = () => {
  submitting.value = true

  const formData = ref()

  formData.value = {
    name: name.value,
    dateBirth: convertISODateToYYYYMMDD(establishedDate.value),
    phoneCountry: phoneCountry.value,
    phoneNumber: phoneNumber.value,
  }

  const uploadDocumentsService = UploadDocumentsService.instance()

  uploadDocumentsService
    .openingAccountPersonal(formData.value)
    .then(resp => {
      submitting.value = false
      toast.add({
        severity: 'success',
        detail: resp.message,
        life: 4000,
      })
      //save localstorage

      router.push('/upload-documents/personal/step2')
    })
    .catch(e => {
      submitting.value = false

      if (e.response.data.data?.warning) {
        e.response.data.data.warning.forEach((element: any) => {
          showExceptionError(toast, 'error', t('somethingWentWrong'), `${element.field} ${element.message}`, 4000)
        })
        return
      }

      if (e.response.data.message) {
        showExceptionError(toast, 'error', t('somethingWentWrong'), e.response.data.message, 4000)
        return
      }

      showMessage(toast, e.response.data)
    })
}
</script>
<style lang="scss">
.phone-input {
  margin-top: 7px;
}

.btn-submit {
  @media only screen and (max-width: 992px) {
    width: 100% !important;
  }
}

#phoneNumber {
  width: 97%;
}
</style>
