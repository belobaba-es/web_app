<template>
  <div :class="{ selected: isSelected }" class="card p-4 border" @click="toggleSelection">
    <div class="flex justify-content-around">
      <img :src="isSelected ? imgSelected : img" alt="" />
    </div>
    <p :style="{ color: isSelected ? '#ffffff' : '' }" class="text-2xl font-medium">{{ typeCard }}</p>
    <div v-if="loading && isSelected">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem; color: #fff"></i>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, watchEffect } from 'vue'
import { CardModality } from '../enums/cardModality.enum'
import { useCardReposition } from '../repositionCard/composable/useCardReposition'
import { useLayoutCard } from '../composables/useLayoutCard'

const { loading } = useCardReposition()
const { typeCardSelect } = useLayoutCard()

interface Props {
  img: string
  imgSelected: string
  typeCard: CardModality
}

const props = defineProps<Props>()

const isSelected = ref(false)

watchEffect(() => {
  isSelected.value = typeCardSelect.value.includes(props.typeCard)
})

const toggleSelection = () => {
  if (!isSelected.value && typeCardSelect.value.length > 2) {
    return
  }

  if (!isSelected.value && typeCardSelect.value.includes(props.typeCard)) {
    return
  }

  isSelected.value = !isSelected.value
  if (isSelected.value) {
    typeCardSelect.value.push(props.typeCard)
  } else {
    typeCardSelect.value = typeCardSelect.value.filter(type => type !== props.typeCard)
  }
}
</script>
<style lang="scss" scoped>
.border {
  border: 1px solid var(--primary-color);
  cursor: pointer;
}

img {
  width: 41px;
  height: 42px;
}

.selected {
  background-color: var(--primary-color);
}
</style>
