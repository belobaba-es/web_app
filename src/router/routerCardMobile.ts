export const routerCardMobile = [
  {
    path: '',
    children: [
      {
        path: 'card-center',
        component: () => import('../views/cardsMobile/index.vue'),
      },
      {
        path: '/details-card',
        component: () => import('../views/cards/cardCenter/Components/CardMobileInformation.vue'),
      },
      {
        path: 'recharge-card',
        component: () => import('../views/cardsMobile/rechargeCard/RechargeCard.vue'),
      },
      {
        path: 'request-card',
        component: () => import('../views/cardsMobile/onboardingCardMobile/RequestCard.vue'),
      },
      {
        path: 'transactions-card',
        component: () => import('../views/cardsMobile/transactionsCardMobile/TransactionHistory.vue'),
      },
      {
        path: 'onboarding',
        component: () => import('../views/cardsMobile/onboardingCardMobile/SelectModalityCard.vue'),
      },
      {
        path: 'onboarding/reposition',
        component: () => import('../views/cardsMobile/repositionCard/IndexReposition.vue'),
      },
      {
        path: 'onboarding/reposition/pysical',
        component: () => import('../views/cardsMobile/repositionCard/Physical.vue'),
      },
      {
        path: 'onboarding/reposition/denied',
        component: () => import('../views/cards/components/stepOnboarding/requestDenied.vue'),
      },
      {
        path: 'onboarding/reposition/confirmation',
        component: () => import('../views/cardsMobile/onboardingCardMobile/stepOnboarding/finalStep.vue'),
      },
      {
        path: 'new-card',
        component: () => import('../views/cardsMobile/blockCard/MessageCardBlock.vue'),
      },
      {
        path: 'onboarding/step',
        component: () => import('../views/cardsMobile/onboardingCardMobile/OnboardingCard.vue'),
        children: [
          {
            path: 'user-data',
            component: () => import('../views/cardsMobile/onboardingCardMobile/stepOnboarding/userData.vue'),
          },
          {
            path: 'document-upload',
            component: () => import('../views/cardsMobile/onboardingCardMobile/stepOnboarding/uploadDocument.vue'),
          },
          {
            path: 'confirmation',
            component: () => import('../views/cardsMobile/onboardingCardMobile/stepOnboarding/finalStep.vue'),
          },
        ],
      },
      {
        path: 'block-card',
        component: () => import('../views/cardsMobile/blockCard/BlockCard.vue'),
      },
      {
        path: 'activation-card',
        children: [
          {
            path: 'wait',
            component: () => import('../views/cardsMobile/activationCard/ActivationCard.vue'),
          },
          {
            path: 'code',
            component: () => import('../views/cardsMobile/activationCard/ActivationLastFourthCode.vue'),
          },
          {
            path: 'pin',
            component: () => import('../views/cardsMobile/activationCard/ActivationPinCard.vue'),
          },
          {
            path: 'questions',
            component: () => import('../views/cardsMobile/activationCard/ActivationQuestionCard.vue'),
          },
        ],
      },
      {
        path: 'change-pin',
        component: () => import('../views/cardsMobile/changePinRecoveryCard/IndexStep.vue'),
        children: [
          {
            path: '',
            component: () => import('../views/cardsMobile/changePinRecoveryCard/QuestionStepOne.vue'),
          },
          {
            path: 'pin',
            component: () => import('../views/cardsMobile/changePinRecoveryCard/PinStepTwo.vue'),
          },
        ],
      },
    ],
  },
]
