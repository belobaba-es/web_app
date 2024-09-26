<template>
  <p class="text-center mt-4 mb-0 px-5" style="font-size: 14px">
    {{ t('labelChangePin2') }}
  </p>

  <QuestionCard
    :isQuestionAnswerPairsValid="isQuestionAnswerPairsValid"
    :loading="loading"
    :questionAnswerPairs="questionAnswerPairs"
    :questionsWithTranslations="questionsWithTranslations"
    @cancel="handleCancel"
    @continue="goToQuetionsChangePin"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import QuestionCard from '../../cards/components/QuestionCard.vue'
import { useChangePin } from '../../cards/changePinRecoveryCard/composable/useChangePinRecovey'
import { QuestionRecoveryPassword } from '../../cards/enums/questionRecoveryPassword.enum'
import { useActivationCard } from '../../cards/activationCard/composables/useActivationCard'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const toast = useToast()
const router = useRouter()

const questionsArray = Object.values(QuestionRecoveryPassword)
const questionsWithTranslations = questionsArray.map(question => t(question))

const handleCancel = () => {
  router.push('/cards/transactions-card')
}

const { goToQuetionsChangePin, isQuestionAnswerPairsValid } = useChangePin()
const { questionAnswerPairs, loading } = useActivationCard()

const complete = () => {
  toast.add({
    severity: 'success',
    summary: t('orderSubmitted'),
    detail: t('orderCompleted'),
    life: 4000,
  })
  router.push('/dashboard')
}
</script>

<style lang="scss" scoped>
.change-pin-section {
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 1rem;
  background-color: #fff;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.questions {
  display: flex;
  gap: 1rem;
  width: 1200px;
  margin: 0 auto;
}

.question-item {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.p-button {
  width: 120px;
}
</style>
