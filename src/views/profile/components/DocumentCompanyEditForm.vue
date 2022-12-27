<template>

</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue';
import Divider from "primevue/divider";
import { useAccount } from '../../../composables/useAccount';
import { useI18n } from 'vue-i18n';
import FileInput from './FileInput.vue';
import FileUploaded from './FileUploaded.vue';
import { useAccountStore } from '../../../stores/account';

const { t } = useI18n({ useScope: 'global' });
const accountStore = useAccountStore();
const { documentToEdit, owner, accountId } = useAccount();

const utilityBill = ref();
const otherDocument = ref();

</script>

<style scoped>

</style>