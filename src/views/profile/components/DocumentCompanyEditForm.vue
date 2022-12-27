<template>
  <div class="px-3 pt-3 pb-0">
    <div class="field">
      <div class="grid">
        <div class="col-6">
          <label>{{ t('companyIncorporationFile') }}</label>
          <FileInput
              label="other"
              side="front"
              type="other"
              :account-id="accountId"
              :document-country="getOwner()?.taxCountry"
              :tax-id="getOwner()?.taxId"
              :is-company="true"
          />

        </div>
      </div>
    </div>
  </div>

  <Divider/>
  <div class="px-3 py-3">
    <div class="field">
      <div class="grid">
        <div class="col-6">
          <label>{{ t('utilityBillLabel') }}</label>
          <div class="mt-2 mb-4">
            <Dropdown
                v-model="proofOfAddress"
                :options="documentTypeProofOfAddress"
                option-label="name"
                option-value="value"
                :placeholder="t('documentTypePlaceHolder')"
                class="w-full"
                @change="selectedProofOfAddress"
            />
          </div>
          <FileInput
              :label="getSelectedTypeDocumentProofOfAddress('0')"
              side=""
              :type="getSelectedTypeDocumentProofOfAddress('0')"
              :account-id="accountId"
              :document-country="getOwner()?.taxCountry"
              :tax-id="getOwner()?.taxId"
              :is-company="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import {ref, onBeforeMount} from 'vue';
import Divider from "primevue/divider";
import {useAccount} from '../../../composables/useAccount';
import {useI18n} from 'vue-i18n';
import FileInput from './FileInput.vue';
import {useAccountStore} from '../../../stores/account';
import {useDocuments} from "../../../composables/useDocuments";

const {t} = useI18n({useScope: 'global'});
const {getOwner, accountId} = useAccount();
const {
  addDocument,
  setSelectedTypeDocumentProofOfAddress,
  getSelectedTypeDocumentProofOfAddress
} = useDocuments()

const documentTypeProofOfAddress = ref([
  {value: "monthly_utility", name: t('documentProofOfAddress1')},
  {value: "statements", name: t('documentProofOfAddress2')},
  {value: "rental_lease_agreement", name: t('documentProofOfAddress3')},
  {value: "vehicle_registration", name: t('documentProofOfAddress4')},
  {value: "real_estate_property_title", name: t('documentProofOfAddress5')},
  {value: "property_tax_bill", name: t('documentProofOfAddress6')},
  {value: "w2", name: t('documentProofOfAddress7')}
])

const proofOfAddress = ref('')

onBeforeMount(() => {

  addDocument( '0', {
    selectedTypeDocumentProofOfAddress: '',
    selectedTypeIdentificationDocument: ''
  })

});

const selectedProofOfAddress = (e: any) => {
  setSelectedTypeDocumentProofOfAddress( '0', e.value)
}

</script>

<style scoped>

</style>