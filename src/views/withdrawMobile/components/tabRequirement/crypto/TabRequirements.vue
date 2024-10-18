<template>
  <div style="font-size: 1rem">
    <div class="line-right mt-2">
      <h4 class="font-medium mt-0">{{ t('titleRequirementsOtherPlatforms') }}</h4>
      <div>
        <ul class="pr-4">
          <li>
            <p class="font-semi-bold mb-0">{{ t('cryptocurrencySelection') }}</p>
            <span class="font-regular">{{ t('cryptocurrencySelectionText') }}</span>
          </li>
          <li>
            <p class="font-semi-bold mb-0">{{ t('beneficiaryDetails') }}</p>
            <ul class="p-0 pl-3">
              <li>{{ t('beneficiaryDetailsText1') }}</li>
              <li>{{ t('beneficiaryDetailsText2') }}</li>
              <li>{{ t('beneficiaryDetailsText3') }}</li>
            </ul>
          </li>
          <li>
            <p class="font-semi-bold mb-0">{{ t('walletAddress') }}</p>
            <span class="font-regular">{{ t('walletAddressText') }}</span>
          </li>
          <li>
            <p class="font-semi-bold mb-0">{{ t('countryOfResidenceBeneficiary') }}</p>
            <span class="font-regular">{{ t('countryOfResidenceBeneficiaryText') }}</span>
          </li>
          <li>
            <p class="font-semi-bold mb-0">{{ t('RelationshipBeneficiary') }}</p>
            <span class="font-regular">{{ t('RelationshipBeneficiaryText') }} </span>
          </li>
          <li>
            <p class="font-semi-bold mb-0">{{ t('typeBeneficiary') }}</p>
            <span class="font-regular">{{ t('typeBeneficiaryText') }} </span>
          </li>
        </ul>

        <h4 class="font-semi-bold mt-0">{{ t('titleRequirementsBetweenWallets') }}</h4>
        <ul>
          <li>
            <span class="font-regular">{{ t('RequirementsBetweenWalletsText') }}</span>
          </li>
        </ul>
      </div>
      <span class="font-regular">{{ t('RequirementsEssentialText') }}</span>
      <Message :closable="false" class="my-3" severity="warn">
        {{ t('importantNote') }}{{ t('importantNoteText') }}
      </Message>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Message from 'primevue/message'

const { t } = useI18n({ useScope: 'global' })
</script>
<style lang="scss"></style>
