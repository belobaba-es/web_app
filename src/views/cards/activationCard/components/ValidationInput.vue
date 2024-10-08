<template>
  <div class="flex mb-4">
    <InputText
      maxlength="1"
      v-model="firstsInput"
      class="inputDigit"
      ref="firstsInputRef"
      @input="activeSecondInput()"
    />
    <InputText
      maxlength="1"
      v-model="secondInput"
      class="inputDigit"
      ref="secondInputRef"
      @input="activeThirdInput()"
    />
    <InputText maxlength="1" v-model="thirdInput" class="inputDigit" ref="thirdInputRef" @input="activeFourthInput()" />
    <InputText maxlength="1" v-model="fourthInput" class="inputDigit" ref="fourthInputRef" />
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import InputText from 'primevue/inputtext'
import { useActivationCard } from '../composables/useActivationCard'

const { lastFourDigits } = useActivationCard()

const firstsInput = ref('')
const secondInput = ref('')
const thirdInput = ref('')
const fourthInput = ref('')

const firstsInputRef = ref(null)
const secondInputRef = ref(null)
const thirdInputRef = ref(null)
const fourthInputRef = ref(null)

const activeSecondInput = () => {
  if (secondInputRef.value) {
    secondInputRef.value.$el.focus()
  }
}
const activeThirdInput = () => {
  if (thirdInputRef.value) {
    thirdInputRef.value.$el.focus()
  }
}
const activeFourthInput = () => {
  if (fourthInputRef.value) {
    fourthInputRef.value.$el.focus()
  }
}

const concatenatedInputValue = computed(() => {
  return `${firstsInput.value}${secondInput.value}${thirdInput.value}${fourthInput.value}`
})

watch(concatenatedInputValue, value => {
  if (value.length === 4) {
    lastFourDigits.value = value
  }
})
</script>
<style scoped>
.inputDigit {
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 24px;
  margin: 0 5px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}
</style>
