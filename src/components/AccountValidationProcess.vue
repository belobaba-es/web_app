<template>
  <Message severity="warn">
    <div class="pl-4">
      <h3>{{t('titleAccountValidationProcess')}}</h3>
      {{t('accountValidationProcess')}}
    </div>
  </Message>
</template>

<script setup lang="ts">
import Message from 'primevue/message';
import {useI18n} from "vue-i18n";

const { t } = useI18n({ useScope: 'global' })
</script>