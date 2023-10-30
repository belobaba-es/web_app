<template>
  <section class="section-main">
    <div class="mb-4">
      <p class="text-3xl mt-0 font-medium">{{ t('titleBusinessAccount') }} - {{ t('uploadDocumentsTitle') }}</p>
    </div>

    <div class="grid">
      <DocumentsCompany :register-number="onboardingCompany.informationCompany.registerNumber" />

      <div class="p-panel p-component shareholders-panel col-6">
        <div class="p-panel-header">
          <span class="p-panel-title">{{ t('shareholderTitle') }}</span>
        </div>
        <div class="p-toggleable-content" role="region">
          <div class="p-panel-content">
            <div class="p-scrollpanel p-component custom" style="height: 400px">
              <div class="p-scrollpanel-wrapper">
                <div class="p-scrollpanel-content">
                  <div class="px-3 pt-3 pb-0" v-for="(shareholder, idx) in getPartners()" :key="idx">
                    <DocumentsPartners :name="shareholder.firstName + shareholder.lastName" :dni="shareholder.dni" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DocumentsPartners from './components/DocumentsPartners.vue'
import DocumentsCompany from './components/DocumentsCompany.vue'
import { useOnboardingCompany } from '../../../composables/useOnboardingCompany'

const { t } = useI18n({ useScope: 'global' })

const { onboardingCompany, getPartners } = useOnboardingCompany()

//router.push('/personal/completed')
</script>

<style scoped></style>
