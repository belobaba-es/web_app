<template>
  <div class="col-4 flex justify-content-start container-link-historic-desktop">
    <div class="dropdown-wrapper">
      <router-link v-ripple class="link-historic-desktop" exact role="menuitem" to="#" @click="toggleDropdown">
        <h5 class="text-link-historic-desktop">
          {{ t('withdraw') }} <span class="p-2 pi pi-angle-down primary-color"></span>
        </h5>
      </router-link>

      <div v-if="isDropdownOpen" class="dropdown">
        <ul>
          <li v-for="option in links" :key="option.id" @click="handleOptionClick(option)">
            {{ option.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { FiatAssetCodes } from '../types/assetCodes.interface'
import { useI18n } from 'vue-i18n'
import { useWallet } from '../composable/useWallet'
import { WalletProvider } from '../../login/types/login.interface'

const props = defineProps<{
  assetCode: string
}>()
const { t } = useI18n({ useScope: 'global' })
const links: any = ref()
const router = useRouter()
const { getWalletProvider } = useWallet()
const usdPanama = getWalletProvider() === WalletProvider.PINTTOSOFT
const fiatLinks = [
  { name: 'Transfer between BELOBABA accounts', link: '/withdraw/fiat/internal' },
  { name: t('Withdraw Fiat'), link: '/withdraw/fiat/usa' },
]
const assetLinks = [
  { name: 'Between BELOBABA Crypto Wallets', link: '/withdraw/crypto/internal/beneficiary' },
  { name: 'To other platform crypto wallets', link: '/withdraw/crypto/other-platforms/beneficiary' },
]
const achPanamaLinks = [
  { name: 'Transfer between BELOBABA accounts', link: '/withdraw/fiat/internal' },
  { name: 'ACH Panama', link: '/withdraw/fiat/panama' },
]

onMounted(() => {
  const linkOptions = {
    [FiatAssetCodes.USD]: fiatLinks,
    [FiatAssetCodes.USD_PANAMA]: usdPanama ? achPanamaLinks : undefined,
  }
  links.value = linkOptions[props.assetCode as FiatAssetCodes] || assetLinks
})

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleOptionClick = (option: { name: any; link: string }) => {
  isDropdownOpen.value = false
  router.push(option.link)
}
</script>

<style lang="scss" scoped>
.dropdown-wrapper {
  position: relative;
}

.dropdown {
  width: 220px;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid gray;
  z-index: 100;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown ul li {
  padding: 8px;
  cursor: pointer;
  color: rgb(0, 0, 0);
}

.dropdown ul li:hover {
  color: var(--primary-color);
}

//
.container-link-historic-desktop {
  margin-left: 4%;
}

.link-historic-desktop {
  color: white;
}

.primary-color {
  color: var(--primary-color);
}
</style>
