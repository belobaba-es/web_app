<template>
  <Dropdown
    :modelValue="localCardInfo"
    @update:modelValue="(val: any)  => (localCardInfo = val)"
    :options="listCards"
    optionLabel="cardNumber"
    :placeholder="t('selectCard')"
    checkmark
    :highlightOnSelect="false"
    class="w-full md:w-27rem border-round"
  >
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

const props = defineProps({
  listCards: Array,
  cardInfo: Object,
})

const t = useI18n({ useScope: 'global' }).t
const localCardInfo = ref(props.cardInfo)
</script>
<style scoped lang="scss"></style>
