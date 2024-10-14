import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import blockMobile from '../../../assets/icons/block-mobile.svg'
import cardMobile from '../../../assets/icons/card-mobile.svg'
import pinMobile from '../../../assets/icons/pin-mobile.svg'
import securityMobile from '../../../assets/icons/security-mobile.svg'
import historyMobile from '../../../assets/icons/history-mobile.svg'
import { useCardCenter } from '../../cards/cardCenter/Composables/useCardCenter'

export const useLayoutCardMobile = () => {
  const { t } = useI18n({ useScope: 'global' })

  const { selectedCard, cardInfo } = useCardCenter()

  let itemsDefaultMobile = [
    {
      label: t('labelHistorialCard'),
      to: '/cards/transactions-card',
      icon: historyMobile,
    },
    {
      label: t('labelRecargaCard'),
      to: '/cards/recharge-card',
      icon: cardMobile,
    },

  ]

  const itemsMenuLayoutMobile = ref()

  const setItemsMenu = () => {
    if (selectedCard.value?.isPhysical) {
      itemsMenuLayoutMobile.value = itemsDefaultMobile.concat(
        {
          label: t('labelPinChange'),
          to: '/cards/change-pin',
          icon: pinMobile,
        },
        {
          label: t('labelBlockCard'),
          to: '/cards/block-card',
          icon: blockMobile,
        },
        {
          label: t('labelConfigCard'),
          to: '',
          icon: securityMobile,
        }
      )
    } else {
      itemsMenuLayoutMobile.value = itemsDefaultMobile
    }
  }

  onMounted(() => {
    setItemsMenu()
  })

  watch(cardInfo, () => {
    setItemsMenu()
  })

  return { itemsMenuLayoutMobile }
}
