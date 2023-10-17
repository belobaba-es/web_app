<template>
  <section class="section-main">
    <div class="mb-4">
      <h1 class="text-2xl">
        {{ t('accountRegistration') }}
      </h1>
      <p class="text-3xl font-medium">{{ t('titleBusinessAccount') }} - {{ t('uploadDocumentsTitle') }}</p>
    </div>

    <div class="grid">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 p-panel p-component shareholders-panel">
        <div class="p-panel-header">
          <span class="p-panel-title">{{ t('uploadDocumentsTitle') }}</span>
        </div>
        <div class="p-toggleable-content" role="region">
          <div class="p-panel-content">
            <div class="p-scrollpanel p-component custom" style="height: 400px">
              <div class="p-scrollpanel-wrapper">
                <div class="p-scrollpanel-content">
                  <div class="px-3 pt-3 pb-0">
                    <div class="field" v-for="(shareholder, idx) in partners" :key="idx">
                      <DocumentsShareholders :dni="shareholder.dni" :tax-id="shareholder.taxId" />
                    </div>
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
import { ref, onBeforeMount, defineProps, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import DocumentsShareholders from '../DocumentsShareholders.vue'

const { t } = useI18n({ useScope: 'global' })

const formData = ref()
const partners = ref()
const registerNumber = ref()

onMounted(() => {
  const data = localStorage.getItem('companyData') || '{}'

  if (data) {
    formData.value = JSON.parse(data)
    registerNumber.value = formData.value.informationCompany.registerNumber
    partners.value = formData.value.partners
  }
})

//router.push('/personal/completed')
</script>

<style scoped></style>
