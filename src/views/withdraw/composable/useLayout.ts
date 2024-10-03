import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue'
import router from '../../../router/router'
import coin from '../../../assets/icons/coin.svg'
import nobaIcon from '../../../assets/icons/noba-icon.svg'
import nobaPanama from '../../../assets/icons/panama.svg'
import nobaEstadosUnidos from '../../../assets/icons/eeu.svg'
import { useAuthStore } from '../../../stores/useAuthStore'
import { WalletProvider } from '../../login/types/login.interface'

export const useLayout = () => {
  const selectedOption = ref('fiat')
  const { t } = useI18n({ useScope: 'global' })
  const { getWalletProvider } = useAuthStore()
  const bankingProvider = getWalletProvider()
  const optionButtonsFiat = []
  const routerCrypto = [
    'crypto',
    'crypto-beneficiary-list',
    'crypto-internal-beneficiary-list',
    'crypto-new-beneficiary',
    'crypto-make-withdrawal',
    'crypto-internal-make-withdrawal',
  ]

  if (bankingProvider === WalletProvider.LAYER2) {
    optionButtonsFiat.push({
      label: t('uniteState'),
      icon: 'pi pi-angle-right',
      iconPos: 'right',
      img: nobaEstadosUnidos,
      to: '/withdraw/fiat/usa',
    })
  }
  if (bankingProvider === WalletProvider.PINTTOSOFT) {
    optionButtonsFiat.push({
      label: t('Panama'),
      icon: 'pi pi-angle-right',
      iconPos: 'right',
      img: nobaPanama,
      to: '/withdraw/fiat/panama',
    })
  }
  optionButtonsFiat.push({
    label: t('betweenNOBA'),
    icon: 'pi pi-angle-right',
    iconPos: 'right',
    img: nobaIcon,
    to: '/withdraw/fiat/internal',
  })
  const optionButtonsCrypto = [
    {
      label: t('walletNob'),
      icon: 'pi pi-angle-right',
      iconPos: 'right',
      to: '/withdraw/crypto/internal/beneficiary',
      img: nobaIcon,
    },
    {
      label: t('otherPlatformCrypto'),
      icon: 'pi pi-angle-right',
      iconPos: 'right',
      to: '/withdraw/crypto/other-platforms/beneficiary',
      img: coin,
    },
  ]

  const selectOption = (option: string) => {
    selectedOption.value = option
    router.push(`/withdraw/${option}`)
  }
  watch(selectedOption, value => {
    selectedOption.value = value
  })
  return {
    optionButtonsFiat,
    optionButtonsCrypto,
    selectOption,
    selectedOption,
    routerCrypto,
  }
}
