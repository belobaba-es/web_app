<template>
  <div :class="{ selected: isSelected }" class="card p-4 border" @click="toggleSelection">
    <div class="flex justify-content-around">
      <img :src="isSelected ? imgSelected : img" alt="" />
    </div>
    <p :style="{ color: isSelected ? '#ffffff' : '' }" class="text-2xl font-medium">{{ typeCard }}</p>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { useOnboardingCard } from '../composables/useOnboardingCard'
import { CardModality } from '../enums/cardModality.enum'

const { typeCardSelect } = useOnboardingCard()

interface Props {
  img: string
  imgSelected: string
  typeCard: CardModality
}

const props = defineProps<Props>()

const isSelected = ref(false)

const toggleSelection = () => {
  if (!isSelected.value && typeCardSelect.value.length > 2) {
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
  border: 1px solid #00beb0;
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
