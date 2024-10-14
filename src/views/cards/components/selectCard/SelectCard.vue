<template>
  <Dropdown
    :modelValue="localCardInfo"
    @update:modelValue="(val: any)  => (localCardInfo = val)"
    :options="listCards"
    optionLabel="cardNumber"
    :placeholder="t('selectCard')"
    checkmark
    :highlightOnSelect="false"
    class="w-full md:w-27rem"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex justify-content-between items-center">
        <div>{{ slotProps.value.cardNumber }}</div>
        <p
          class="font-medium m-0"
          :style="getStatusStyle(slotProps.value.status)"
          style="padding: 0.25rem 1.25rem; border-radius: 1rem; font-size: 11px"
        >
          {{ t(`${slotProps.value.status}`) }}
        </p>
      </div>
      <span v-else>
        {{ t('selectCard') }}
      </span>
    </template>
    <template #option="slotProps" class="custom-hover">
      <DropDownItem
        :name="slotProps.option.flagType"
        :number="slotProps.option.cardNumber"
        :status="slotProps.option.status"
      />
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import DropDownItem from '../../cardCenter/Components/DropDownItem.vue'
import Dropdown from 'primevue/dropdown'
import { defineProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCardCenterValidation } from '../../cardCenter/Composables/useCardCenterValidation'

const props = defineProps({
  listCards: Array,
  cardInfo: Object,
})
const { getStatusStyle } = useCardCenterValidation()

const t = useI18n({ useScope: 'global' }).t
const localCardInfo = ref(props.cardInfo)
</script>
<style scoped lang="scss">
.p-dropdown {
  border-radius: 5px !important;
  padding: 1px !important;
  box-sizing: inherit !important;
}
</style>
