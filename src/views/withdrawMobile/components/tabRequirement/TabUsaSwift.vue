<template>
  <div>
    <img alt="" class="float-right" src="../../../../assets/icons/eeu.svg" width="50" />
    <h4 class="font-medium mt-2">{{ t('modalUSAGlobalSubtitle') }}</h4>
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
          <p class="font-semi-bold mb-0">{{ t('modalSwiftBic') }}</p>
          <span class="font-regular"
            >{{ t('modalSwiftBicSpan') }} <br />
            {{ t('modalSwiftBicSpan2') }}
          </span>
        </li>
        <li>
          <p class="font-semi-bold mb-0">{{ t('modalIbanBeneficiary') }}</p>
          <span class="font-regular">{{ t('modalIbanBeneficiarySpan') }}</span>
        </li>
        <li>
          <p class="font-semi-bold mb-0">{{ t('bankAddress') }}</p>
          <span class="font-regular">{{ t('modalTextBankAddressSpan') }} </span>
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
          <p class="font-semi-bold mb-0">{{ t('beneficiaryAddress') }}o</p>
          <span class="font-regular">{{ t('modalTextBeneficiaryAddressSpan') }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>
<style lang="scss"></style>
