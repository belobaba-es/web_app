<template>
  <div class="mb-2">
    <img :src="IconUser" />
  </div>
  <div>
    <p class="text-lg text-capitalize m-0">{{ firstName + ' ' + lastName }}</p>
  </div>
  <span class="text-base">{{ email }}</span>

  <span class="p-buttonset w-100 container-center pb-0 pt-5">
    <Button
      size="small"
      icon="pi pi-user-minus"
      class="w-50 pr-3 pl-3"
      severity="danger"
      placeholder="Top"
      v-tooltip.top="'Remove shareholder'"
      @click="deleteShareholder(dni)"
    />
    <Button
      size="small"
      icon="pi pi-user-edit"
      placeholder="Top"
      v-tooltip.top="'Edit shareholder'"
      class="w-50 pr-3 pl-3"
      @click="editShareholder(dni)"
    />
  </span>
</template>
<script lang="ts" setup>
import IconUser from '../../../../assets/icons/icon-user.svg'
import Button from 'primevue/button'
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { useShareholder } from '../../../../composables/useShareholder'

defineProps<{
  lastName: string
  firstName: string
  email: string
  dni: string
}>()

const { t } = useI18n({ useScope: 'global' })
const { deleteShareholder, editShareholder } = useShareholder()
</script>

<style scoped lang="scss"></style>
