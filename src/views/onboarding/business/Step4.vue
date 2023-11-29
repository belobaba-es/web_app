<template>
  <DocumentsPartners v-if="getAccountStatus() !== AccountStatus.APPROVED"/>

  <DocumentsAlreadyVerified v-if="getAccountStatus() === AccountStatus.APPROVED" />

</template>
<script setup lang="ts">


import {AccountStatus} from "../../../types/accountStatus.enum";
import {useAuth} from "../../../composables/useAuth";
import DocumentsAlreadyVerified from "../components/DocumentsAlreadyVerified.vue";
import DocumentsPartners from "./components/DocumentsPartners.vue";

const { getAccountStatus } = useAuth()

</script>