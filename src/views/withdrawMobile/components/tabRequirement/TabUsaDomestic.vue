<template>
  <div>
    <img alt="" class="float-right" src="../../../../assets/icons/eeu.svg" width="50" />
    <div class="line-right mt-2">
      <h4 class="font-medium mt-0">{{ t('modalUSALocalSubtitle') }}</h4>
      <div>
        <p class="font-medium" style="color: var(--primary-color)">{{ t('modalText') }}</p>
        <ul class="pr-4">
          <li>
            <p class="font-semi-bold mb-0">{{ t('modalTextAccount') }}</p>
            <span class="font-regular">{{ t('modalTextAccountSpan') }}</span>
          </li>
          <li>
            <p class="font-semi-bold mb-0">{{ t('accountNumber') }}</p>
            <span class="font-regular">{{ t('modalTextNumberSpan') }}</span>
          </li>
          <li>
            <p class="font-semi-bold mb-0">{{ t('abaFedwire') }}</p>
            <span class="font-regular">{{ t('modalAbaFedwireSpan') }}</span>
          </li>
          <li>
            <p class="font-semi-bold mb-0">{{ t('bankAddress') }}</p>
            <span class="font-regular">{{ t('modalBankAddressAbaFedwire') }}</span>
          </li>
        </ul>

        <p class="font-medium" style="color: var(--primary-color); text-transform: uppercase">
          {{ t('bankAccountHolder') }}
        </p>
        <ul class="pr-4">
          <li>
            <p class="font-semi-bold mb-0">{{ t('modalTextNameHolder') }}</p>
            <span class="font-regular">{{ t('modalTextNameHolderSpan') }}</span>
          </li>
          <li>
            <p class="font-semi-bold mb-0">{{ t('typeBeneficiary') }}</p>
            <span class="font-regular">{{ t('modalTextTypeBeneficiarySpan') }}</span>
          </li>
          <li>
            <p class="font-semi-bold mb-0">{{ t('beneficiaryAddress') }}</p>
            <span class="font-regular">{{ t('modalTextBeneficiaryAddressSpan') }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>
<style lang="scss"></style>
