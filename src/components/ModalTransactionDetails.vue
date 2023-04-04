<template>
  <Dialog
    :visible="display"
    @update:visible="emit('update:display', $event)"
    :modal="true"
    closeIcon="pi pi-times-circle"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '35vw' }"
  >
    <template #header> </template>
<!--    <div class="formgrid grid mt-3">-->
<!--      <div class="col-12">-->
<!--        <span class="text-xl txt-border-bottom mb-2">Some span</span>-->
<!--      </div>-->
<!--      <div class="field col-12 mt-4"></div>-->
<!--      <div class="field col-12" style="display: grid">-->
<!--        <label for="name">Some info</label>-->
<!--      </div>-->
<!--    </div>-->

    <div class="col-12 content">
      <div class="col-6">
        <p class="font-medium text-sm">{{ t('bankAccountHolder') }}</p>
        <p class="font-medium text-sm">{{ t('accountNumber') }}</p>
      </div>

      <div class="col-6">
        <p>name</p>
        <p>amount</p>
      </div>

      <Divider type="dashed"></Divider>

      <div class="col-6">
        <p class="font-medium text-sm">1</p>
        <p class="font-medium text-sm">2</p>
        <p class="font-medium text-sm">3</p>
      </div>

      <div class="col-6">
        <p>asdf}</p>
        <p>qwer}</p>
        <p>zxcv</p>
      </div>

      <Divider type="dashed"></Divider>

      <div class="col-6">
        <p class="font-medium text-sm">number</p>
      </div>

      <div class="col-6">
        <p>asdf-2345234-sadfa-23c2-234c234</p>
      </div>
    </div>

<!--    -->

    <template #footer>
      <div class="col-12 btn-container">
        <Button
          class="w-50 p-button mt-5"
          :label="'PDF'"
          @click="generatePDFTransactionReceipt()"
          :loading="isGeneratingTransactionPDF"
          icon="pi pi-angle-right"
        />
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Divider from 'primevue/divider';

const { t } = useI18n({ useScope: 'global' })
const emit = defineEmits(['update:asset-select', 'update:display', 'create'])
defineProps<{
  display: boolean
}>()
const isGeneratingTransactionPDF = ref(false)

const generatePDFTransactionReceipt = () => {
  console.log('downloadPDF')
}
</script>

<style lang="css" scoped>
.content {
  display: contents;
}
.green-color {
  color: var(--primary-color);
}
.p-divider-dashed.p-divider-horizontal:before {
  border-color: var(--primary-color);
}
</style>
