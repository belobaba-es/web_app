<template>
  <div class="px-3 pt-3 pb-0">
    <div>
      <p class="font-medium">
        {{ getFullName(member) }}
      </p>
    </div>
    <div class="grid">
      <div class="field col-12">
        <Dropdown
            v-model="identifyDocument"
            :options="documentTypeOptions"
            option-label="name"
            option-value="value"
            :placeholder="t('documentTypePlaceHolder')"
            class="w-full"
            @change="selectedIdentifyDocument"
        />
      </div>
      <div class="field col-12 md:col-6">
        <label>{{ t('dni') }} {{ t('shareholderFileFrontLabel') }}</label>
        <FileInput
            :label="getSelectedTypeIdentificationDocument(taxId)"
            side="front"
            :type="getSelectedTypeIdentificationDocument(taxId)"
            :account-id="accountId??''"
            :document-country="member.taxCountry"
            :tax-id="member.taxId"
        />
      </div>
      <div class="field col-12 md:col-6">
        <label>{{ t('dni') }} {{ t('shareholderFileBackLabel') }}</label>
        <FileInput
            :label="getSelectedTypeIdentificationDocument(taxId)"
            side="backside"
            :type="getSelectedTypeIdentificationDocument(taxId)"
            :account-id="accountId??''"
            :document-country="member.taxCountry"
            :tax-id="member.taxId"
        />

      </div>

      <div class="field col-12">

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
                  side=""
                  :label="getSelectedTypeDocumentProofOfAddress(taxId)"
                  :type="getSelectedTypeDocumentProofOfAddress(taxId)"
                  :account-id="accountId??''"
                  :document-country="member.taxCountry"
                  :tax-id="member.taxId"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Divider/>
</template>

<script setup lang="ts">
import {ref, defineProps, onBeforeMount, watch} from 'vue';
import Dropdown from 'primevue/dropdown';
import Divider from "primevue/divider";
import {useAccount} from '../../../composables/useAccount';
import {useI18n} from 'vue-i18n';
import FileInput from './FileInput.vue';
import {useAccountStore} from '../../../stores/account';
import {useDocuments} from "../../../composables/useDocuments";

const {t} = useI18n({useScope: 'global'});
const accountStore = useAccountStore();
const {
  addDocument,
  setSelectedTypeIdentificationDocument,
  setSelectedTypeDocumentProofOfAddress,
  getSelectedTypeIdentificationDocument,
  getSelectedTypeDocumentProofOfAddress
} = useDocuments()

interface Props {
  taxId: string
}

const props = defineProps<Props>()

const proofOfAddress = ref('')
const identifyDocument = ref('')

const {getFullName, accountId, findMember} = useAccount();


const documentTypeOptions = ref([
  {value: "drivers_license", name: t('docTypeLabelDriversLicense')},
  {value: "government_id", name: t('docTypeLabelGovernmentId')},
  {value: "passport", name: t('docTypeLabelPassport')},
]);

const documentTypeProofOfAddress = ref([
  {value: "monthly_utility", name: t('documentProofOfAddress1')},
  {value: "statements", name: t('documentProofOfAddress2')},
  {value: "rental_lease_agreement", name: t('documentProofOfAddress3')},
  {value: "vehicle_registration", name: t('documentProofOfAddress4')},
  {value: "real_estate_property_title", name: t('documentProofOfAddress5')},
  {value: "property_tax_bill", name: t('documentProofOfAddress6')},
  {value: "w2", name: t('documentProofOfAddress7')}
])

const member = ref();

onBeforeMount(() => {
  addDocument(props.taxId, {selectedTypeDocumentProofOfAddress: '', selectedTypeIdentificationDocument: ''})
  member.value = findMember(props.taxId);
});

const selectedIdentifyDocument = (e: any) => {
  setSelectedTypeIdentificationDocument(props.taxId, e.value)
}

const selectedProofOfAddress = (e: any) => {
  setSelectedTypeDocumentProofOfAddress(props.taxId, e.value)
}


</script>

<style scoped>

</style>