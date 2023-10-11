<template>
  <section class="section-main">
    <div class="mb-4">
      <h1 class="text-2xl">
        {{ t('accountRegistration') }}
      </h1>
      <p class="text-3xl font-medium">{{ t('titleNaturalPerson') }}</p>
    </div>

    <h1>This is the step 2</h1>
</section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from 'vue'

import { useI18n } from 'vue-i18n'


const { t } = useI18n({ useScope: 'global' })
</script>

<style lang="scss" scoped></style>
