import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export const useLayoutCard = () => {
  const router = useRouter()
  const { t } = useI18n({ useScope: 'global' })

  const itemsMenuLayout = ref([
    {
      label: t('labelHistorialCard'),
      command: () => {
        router.push('/cards/transactions-card')
      },
      disabled: false,
    },
    {
      label: t('labelRecargaCard'),
      command: () => {
        router.push('/cards/recharge-card')
      },
      disabled: false,
    },
    {
      separator: true,
    },
    {
      label: t('labelPinChange'),
      command: () => {
        router.push('/cards/change-pin')
      },
      disabled: false,
    },
    {
      label: t('labelConfigCard'),
      command: () => {},
      disabled: false,
    },

    {
      label: t('labelBlockCard'),
      command: () => {
        router.push('/cards/block-card')
      },
      disabled: false,
    },
  ])

  return { itemsMenuLayout }
}
