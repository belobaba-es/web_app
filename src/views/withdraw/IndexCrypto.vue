<template>
  <div class="p-4 text-center">
    <div class="justify-content-center">
      <img alt="" src="../../assets/icons/withdraw.svg" width="164" />
      <h1 class="font-regular m-0">
        {{ t('withdraw') }} <span style="color: #00beb0">{{ t('crypto') }}</span>
      </h1>
      <p class="mb-4 text-2xl">{{ t('withdrawText') }}</p>

      <Button :label="t('click')" @click="visible = true" />
    </div>
  </div>
  <Dialog
    v-model:visible="visible"
    :breakpoints="{ '2048px': '30vw', '1199px': '40vw', '575px': '90vw' }"
    :show-header="false"
    modal
    class="dialog-requirements-withdrawal-crypto"
  >
    <div
      class="p-dialog-header-icons w-full justify-content-between p-2 float-right pt-3"
      style="position: relative; top: 7px"
    >
      <h1 class="font-medium m-0">
        {{ t('withdraw') }} <span style="color: #00beb0">{{ t('crypto') }}</span>
      </h1>
      <button
        aria-label="Close"
        class="p-dialog-header-icon p-dialog-header-close p-link p-2 absolute right-0 top-0"
        type="button"
        @click="close"
      >
        <span class="p-dialog-header-close-icon pi pi-times-circle"></span>
      </button>
    </div>
    <div>
      <h3 class="mt-0">{{ t('withdrawText') }}</h3>

      <div class="flex justify-content-center mt-2 p-2">
        <div class="col-12">
          <div class="line-right mt-2">
            <h4 class="font-semi-bold mt-0">{{ t('titleRequirementsOtherPlatforms') }}</h4>
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
            </div>
            <h4 class="font-semi-bold mt-0">{{ t('titleRequirementsBetweenWallets') }}</h4>
            <div>
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
      </div>
    </div>
  </Dialog>
</template>
<script setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'
import Message from 'primevue/message'

const { t } = useI18n({ useScope: 'global' })

const visible = ref(false)

const close = () => {
  visible.value = false
}
</script>
