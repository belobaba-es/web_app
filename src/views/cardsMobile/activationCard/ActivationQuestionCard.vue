<template>
  <div>
    <SelectCardHeader title="activation" />
    <div class="flex flex-column justify-content-center md:align-items-end m-4 pb-8 md:pt-6">
      <div class="flex justify-content-start w-12 pl-3">
        <h2 class="m-0 font-medium mb-0">{{ t('securityQuestions') }}</h2>
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
  </div>

  <ActivationCardConfirmationModal
    :show-modal="openConfirmationModal"
    @update:visible="handleConfirmationModal($event)"
  />
</template>

<script lang="ts" setup>
import ActivationCardConfirmationModal from '../../cards/activationCard/components/ActivationCardConfirmationModal.vue'
import { useI18n } from 'vue-i18n'
import QuestionCard from '../../cards/components/QuestionCard.vue'
import { QuestionRecoveryPassword } from '../../cards/enums/questionRecoveryPassword.enum'
import { useActivationCard } from '../../cards/activationCard/composables/useActivationCard'
import router from '../../../router/router'
import SelectCardHeader from '../components/SelectCardHeader.vue'

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
