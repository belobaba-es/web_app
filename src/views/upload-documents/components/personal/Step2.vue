<template>
  <section class="section-main">
    <div class="mb-4">
      <h1 class="text-2xl">
        {{ t('accountRegistration') }}
      </h1>
      <p class="text-3xl font-medium">{{ t('titleNaturalPerson') }}</p>
    </div>

    <h1>This is the step 2</h1>
    <div class="p-panel p-component shareholders-panel col-8">
      <div class="p-panel-header">
        <span class="p-panel-title">CARGA DE DOCUMENTOS</span>
      </div>
      <div class="p-toggleable-content" role="region">
        <div class="p-panel-content">
          <div class="p-scrollpanel p-component custom" style="height: 400px;">
            <div class="p-scrollpanel-wrapper">
              <div class="p-scrollpanel-content">
                <div class="px-3 pt-3 pb-0">
                  <div class="field">
                    <div class="grid">
                      <div class="col-8">
                        <div class="field col-12">
                          <div class="col-12">
                            <div class="field">
                              <label>{{ t('Document Type') }}</label>
                              <div class="p-inputgroup">
                                <Dropdown
                                    :options="data"
                                    optionLabel="label"
                                    option-value="value"
                                    class="w-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex justify-content-between align-items-center p-3 mt-5 border-round bg-primary cursor-pointer">
                          <span>Seleccionar archivo</span>
                          <span>
                            <i class="pi pi-upload"></i><input id="frontyes" type="file">
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div class="p-divider p-component p-divider-horizontal p-divider-solid p-divider-left" role="separator"
                  aria-orientation="horizontal"></div>

                <div class="px-3 py-3">
                  <div class="field">
                    <div class="grid">
                      <div class="col-8">
                        <label>Documentos constitutivos de la empresa</label>
                        <div class="mt-2 mb-4"></div>

                        <div
                          class="flex justify-content-between align-items-center p-3 border-round bg-primary cursor-pointer">
                          <span>Seleccionar archivo</span>
                          <span><i class="pi pi-upload"></i><input id="otherfrontyes" type="file"></span>
                        </div>
                      </div>
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

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import Dropdown from 'primevue/dropdown'
import { Document } from '../../../profile/types/account.interface';

const { t } = useI18n({ useScope: 'global' })

const data = [
  { id: 1, name: 'Ram' },
  { id: 2, name: 'Shyam' },
  { id: 3, name: 'Hari' },
  { id: 4, name: 'Krishna' },
  { id: 5, name: 'Balram' },
  { id: 6, name: 'Arjun' },
]

const selectedItem = ref({})

</script>

