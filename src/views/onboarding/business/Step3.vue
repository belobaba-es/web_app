<template>
  <section class="section-main">
    <div class="mb-4">
      <p class="text-3xl mt-0 font-medium">{{ t('titleBusinessAccount') }} - {{ t('accountPropuseTitle') }}</p>
    </div>

    <div class="formgrid grid col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8">
      <div class="field col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
        <label>{{ t('accountPropuseTitle') }}</label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="onboardingCompany.accountQuestionnaire.purposeAccount"
            class="w-full"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('accountPropuseHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('sourceAssetsAndIncomeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="onboardingCompany.accountQuestionnaire.sourceAssetsAndIncome"
            class="w-full"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('sourceAssetsAndIncomeHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('intendedUseAccountLabel') }}</label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="onboardingCompany.accountQuestionnaire.intendedUseAccount"
            class="w-full"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('intendedUseAccountHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('anticipatedTypesAssetsLabel') }}</label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="onboardingCompany.accountQuestionnaire.anticipatedTypesAssets"
            class="w-full"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('anticipatedTypesAssetsHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('anticipatedMonthlyCashVolumeLabel') }}</label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="onboardingCompany.accountQuestionnaire.anticipatedMonthlyCashVolume"
            class="w-full"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('anticipatedMonthlyCashVolumeHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('anticipatedTradingPatternsLabel') }}</label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="onboardingCompany.accountQuestionnaire.anticipatedTradingPatterns"
            class="w-full"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('anticipatedTradingPatternsHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('anticipatedMonthlyTransactionsIncomingLabel') }}</label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="onboardingCompany.accountQuestionnaire.anticipatedMonthlyTransactionsIncoming"
            class="w-full"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('anticipatedMonthlyTransactionsIncomingHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('anticipatedMonthlyTransactionsOutgoingLabel') }}</label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="onboardingCompany.accountQuestionnaire.anticipatedMonthlyTransactionsOutgoing"
            class="w-full"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('anticipatedMonthlyTransactionsOutgoingHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <label>{{ t('natureBusinessCompanyLabel') }}</label>
        <div class="p-inputgroup">
          <InputText
            type="text"
            v-model="onboardingCompany.accountQuestionnaire.natureBusinessCompany"
            class="w-full"
            required
          />
        </div>
        <div>
          <span class="help-text">{{ t('natureBusinessCompanyHelpText') }}</span>
        </div>
      </div>

      <div class="field col-12 flex align-items-center justify-content-end">
        <Button :label="t('save')" class="px-5 mt-2 btn-submit" @click="saveData()" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useOnboardingCompany } from '../../../composables/useOnboardingCompany'
const { t } = useI18n({ useScope: 'global' })

const toast = useToast()
const { onboardingCompany, saveData } = useOnboardingCompany()
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
