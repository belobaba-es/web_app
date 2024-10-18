export const routerCard = [
  {
    path: '',
    children: [
      {
        path: 'recharge-card',
        component: () => import('../views/cards/rechargeCard/RechargeCard.vue'),
      },
      {
        path: 'transactions-card',
        component: () => import('../views/cards/transactionsCard/TransactionHistory.vue'),
      },
      {
        path: 'onboarding',
        component: () => import('../views/cards/onboardingCard/SelectModalityCard.vue'),
      },
      {
        path: 'onboarding/reposition',
        component: () => import('../views/cards/repositionCard/IndexReposition.vue'),
      },
      {
        path: 'onboarding/reposition/pysical',
        component: () => import('../views/cards/repositionCard/Physical.vue'),
      },
      {
        path: 'onboarding/reposition/confirmation',
        component: () => import('../views/cards/components/stepOnboarding/finalStep.vue'),
      },
      {
        path: 'new-card',
        component: () => import('../views/cards/blockCard/MessageCardBlock.vue'),
      },
      {
        path: 'onboarding/reposition/denied',
        component: () => import('../views/cards/components/stepOnboarding/requestDenied.vue'),
      },
      {
        path: 'onboarding/step',
        component: () => import('../views/cards/onboardingCard/OnboardingCard.vue'),
        children: [
          {
            path: 'user-data',
            component: () => import('../views/cards/components/stepOnboarding/userData.vue'),
          },
          {
            path: 'document-upload',
            component: () => import('../views/cards/components/stepOnboarding/uploadDocument.vue'),
          },
          {
            path: 'confirmation',
            component: () => import('../views/cards/components/stepOnboarding/finalStep.vue'),
          },
        ],
      },
      {
        path: 'block-card',
        component: () => import('../views/cards/blockCard/BlockCard.vue'),
      },

      {
        path: 'activation-card',
        children: [
          {
            path: 'wait',
            component: () => import('../views/cards/activationCard/ActivationCard.vue'),
          },
          {
            path: 'code',
            component: () => import('../views/cards/activationCard/ActivationLastFourthCode.vue'),
          },
          {
            path: 'pin',
            component: () => import('../views/cards/activationCard/ActivationPinCard.vue'),
          },
          {
            path: 'questions',
            component: () => import('../views/cards/activationCard/ActivationQuestionCard.vue'),
          },
        ],
      },
      {
        path: 'change-pin',
        component: () => import('../views/cards/changePinRecoveryCard/IndexStep.vue'),
        children: [
          {
            path: '',
            component: () => import('../views/cards/changePinRecoveryCard/QuestionStepOne.vue'),
          },
          {
            path: 'pin',
            component: () => import('../views/cards/changePinRecoveryCard/PinStepTwo.vue'),
          },
        ],
      },
    ],
  },
]
