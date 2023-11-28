<template>
  <section class="section-main pt-3" v-for="(shareholder, idx) in getPartners()" :key="idx">
    <UploadDocumentNaturalCompany :name="shareholder.firstName + shareholder.lastName" :dni="shareholder.dni" v-if="getAccountStatus() !== AccountStatus.SUBMITTED"/>
  </section>
    <DocumentsAlreadyVerified v-if="getAccountStatus() === AccountStatus.SUBMITTED" />

</template>

<script setup lang="ts">
  import UploadDocumentNaturalCompany from "./UploadDocumentNaturalCompany.vue";
  import {AccountStatus} from "../../../../types/accountStatus.enum";
  import {useAuth} from "../../../../composables/useAuth";
  import DocumentsAlreadyVerified from "../../components/DocumentsAlreadyVerified.vue";
  import {useOnboardingCompany} from "../../../../composables/useOnboardingCompany";

  const { getAccountStatus } = useAuth()
  const { getPartners } = useOnboardingCompany()

  console.log(getAccountStatus())
</script>

