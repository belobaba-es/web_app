<template>
  <Dialog
    :visible="display"
    @update:visible="emit('update:display', $event)"
    :modal="true"
    closeIcon="pi pi-times-circle"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '35vw' }"
  >
    <template #header>
      <div class="white-div">{{ t('createBusisnesPartner') }}</div>
    </template>

    <div class="col-12 content">
      <div class="inner-row-flex mt-20">
        <div class="col-6">create busisness partners</div>

        <div class="col-6 pt-1"></div>
      </div>

      <Divider type="dashed"></Divider>

      <div class="inner-row-flex">
        <div class="col-6"></div>

        <div class="col-6 pt-1">
          <p></p>
        </div>
      </div>

      <Divider type="dashed"></Divider>

      <div class="inner-row-flex">
        <div class="col-6"></div>

        <div class="col-6 pt-1"></div>
      </div>
    </div>

    <template #footer>
      <div class="col-12 btn-container">
        <Button
          class="w-50 p-button mt-5"
          :label="'save'"
          :loading="isSendingRequest"
          icon="pi pi-file-pdf"
          iconPos="right"
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
import Divider from 'primevue/divider'

const { t } = useI18n({ useScope: 'global' })
const emit = defineEmits(['update:asset-select', 'update:display', 'create'])
const props = defineProps<{
  display: boolean
}>()
const isSendingRequest = ref(false)
</script>

<style lang="css" scoped>
.content {
  display: contents;
}
.inner-row-flex {
  display: flex;
  padding: 0;
}
.green-color {
  color: var(--primary-color);
}
.p-divider-dashed.p-divider-horizontal:before {
  border-color: var(--primary-color);
}

.content {
  display: contents;
}

.green-color {
  color: var(--primary-color);
}

.p-divider-dashed.p-divider-horizontal:before {
  border-color: var(--primary-color);
}

.pt-1 {
  padding-top: 1%;
}

.white-div {
  width: 40px;
  background: #fff;
}

.mt-20 {
  margin-top: 20px;
}
</style>
