<template>
  <div class="card flex flex-column justify-content-center align-items-end m-4 pb-8 pt-6">
    <div class="flex justify-content-start w-12 pl-3">
      <h2 class="m-0 font-medium mb-0">{{ t('questionTitle') }}</h2>
    </div>

    <QuestionCard
      :isQuestionAnswerPairsValid="isQuestionAnswerPairsValid"
      :loading="loading"
      :questionAnswerPairs="questionAnswerPairs"
      :questionsWithTranslations="questionsWithTranslations"
      @cancel="handleCancel"
      @continue="handleActivationCard"
    />
  </div>
  <ActivationCardConfirmationModal
    :show-modal="openConfirmationModal"
    @update:visible="handleConfirmationModal($event)"
  />
</template>

<script lang="ts" setup>
import { useActivationCard } from './composables/useActivationCard'
import { QuestionRecoveryPassword } from '../enums/questionRecoveryPassword.enum'
import ActivationCardConfirmationModal from './components/ActivationCardConfirmationModal.vue'
import { useI18n } from 'vue-i18n'
import QuestionCard from '../components/QuestionCard.vue'
import router from '../../../router/router'

const { t } = useI18n()

const questionsArray = Object.values(QuestionRecoveryPassword)
const questionsWithTranslations = questionsArray.map(question => t(question))

const handleCancel = () => {
  router.push('/dashboard')
}

const {
  openConfirmationModal,
  handleActivationCard,
  handleConfirmationModal,
  questionAnswerPairs,
  isQuestionAnswerPairsValid,
  loading,
} = useActivationCard()
</script>

<style lang="scss" scoped></style>
