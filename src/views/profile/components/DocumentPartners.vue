<template>
  <Panel :header="getFullName(props.partner)">
    <template #icons>
      <div class="icon-profile-user">
        <i class="pi"></i>
      </div>
    </template>
    <div class="grid">
      <div v-for="document in props.partner.documents" class="col-12 md:col-6">
        <Document :document=document />
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { Member } from '../types/account.interface';
import Document from './Document.vue';
import Panel from 'primevue/panel';
import { useAccount } from '../../../composables/useAccount';

interface Props {
    partner: Member
}

const props = defineProps<Props>();
const { getFullName } = useAccount();

</script>

<style scoped>

</style>