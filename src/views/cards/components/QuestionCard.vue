<template>
  <div class="flex justify-content-between mt-4 w-full">
    <div v-for="(pair, index) in questionAnswerPairs" :key="index" class="w-4 px-3">
      <Dropdown
        v-model="pair.question.value"
        :options="questionsWithTranslations"
        :placeholder="t('selectQuestion')"
        class="w-full"
        required
      />
      <div class="pr-3">
        <InputText v-model="pair.answer.value" :placeholder="t('writeAnswer')" class="w-full mt-2" required />
      </div>
    </div>
  </div>
  <div class="footer-container mt-6 flex justify-content-center">
    <Button
      :label="t('cancel')"
      class="accept-button py-2 mr-4 w-9rem flex justify-content-center"
      severity="secondary"
      @click="$emit('cancel')"
    />
    <Button
      :disabled="loading"
      :label="t('continue')"
      :loading="loading"
      class="py-2 w-9rem"
      icon="pi pi-sync"
      iconPos="right"
      @click="$emit('continue')"
    />
  </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useActivationCard } from '../activationCard/composables/useActivationCard'
import { QuestionRecoveryPassword } from '../enums/questionRecoveryPassword.enum'

const { t } = useI18n({ useScope: 'global' })

const questionsArray = Object.values(QuestionRecoveryPassword)
const questionsWithTranslations = questionsArray.map(question => t(question))

const { questionAnswerPairs, loading } = useActivationCard()
</script>

<style scoped></style>
