<template>
  <div class="p-4 text-center">
    <div class="justify-content-center">
      <img alt="" src="../../assets/icons/withdraw.svg" width="164" />
      <h1 class="font-regular m-0">
        {{ t('withdraw') }} <span style="color: var(--primary-color)">{{ t('fiat') }}</span>
      </h1>
      <p class="mb-4 text-2xl">{{ t('withdrawText') }}</p>

      <Button :label="t('click')" @click="visible = true" />
    </div>
  </div>

  <Dialog
    v-model:visible="visible"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :header="t('withdraw') + ' ' + t('fiat')"
    :show-header="false"
    :style="{ width: '105rem' }"
    modal
  >
    <div class="p-dialog-header-icons w-full justify-content-end p-2 float-right" style="position: relative; top: 7px">
      <button
        aria-label="Close"
        class="p-dialog-header-icon p-dialog-header-close p-link p-2"
        type="button"
        @click="close"
      >
        <span class="p-dialog-header-close-icon pi pi-times-circle"></span>
      </button>
    </div>

    <div>
      <h1 class="font-medium m-0">
        {{ t('withdraw') }} <span style="color: var(--primary-color)">{{ t('fiat') }}</span>
      </h1>
      <h3 class="mt-0">{{ t('withdrawText') }}</h3>

      <div class="flex justify-content-center mt-2 p-2">
        <div class="col-4">
          <img alt="" src="../../assets/icons/panama.svg" width="50" />
          <div class="line-right mt-2">
            <h4 class="font-medium mt-0">{{ t('modalPanamaSubtitle') }}</h4>
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
                  <p class="font-semi-bold mb-0">{{ t('modalTextTypeAccount') }}</p>
                  <span class="font-regular">{{ t('modalTextTypeAccountSpan') }}</span>
                </li>
                <li>
                  <p class="font-semi-bold mb-0">{{ t('modalTextCodeAch') }}</p>
                  <span class="font-regular">{{ t('modalTextCodeAchSpan') }}</span>
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
                  <p class="font-semi-bold mb-0">{{ t('beneficiaryAddress') }}</p>
                  <span class="font-regular">{{ t('modalTextBeneficiaryAddressSpan') }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-4">
          <img alt="" src="../../assets/icons/eeu.svg" width="50" />
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
                <br /><br /><br />
              </ul>
            </div>
          </div>
        </div>

        <div class="col-4">
          <img alt="" src="../../assets/icons/eeu.svg" width="50" />
          <h4 class="font-medium mt-0">{{ t('modalUSAGlobalSubtitle') }}</h4>
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
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n({ useScope: 'global' })
const visible = ref(false)

const close = () => {
  visible.value = false
}
</script>

<style lang="scss" scoped>
.line-right {
  border-right: 2px solid #000000;
}
</style>
