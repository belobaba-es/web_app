<template>
  <h1 class="font-bold text-center mt-5">{{ t('twoFactorMessage') }}</h1>

  <section class="container-center mt-5">
    <Message :closable="false" class="left-0"
      >{{ t('twoFactorSecondMessage') }}

      <ul>
        <li>{{ t('twoFactorActionOne') }}</li>
        <li>{{ t('twoFactorActionTwo') }}</li>
      </ul>
    </Message>
  </section>
</template>

<script setup lang="ts">
import Message from 'primevue/message'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  useScope: 'global',
})
</script>
