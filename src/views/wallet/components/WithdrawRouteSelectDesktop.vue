<template>
  <div class="col-4 flex justify-content-start container-link-historic-desktop">
    <div class="dropdown-wrapper">
      <router-link class="link-historic-desktop" to="#" exact role="menuitem" v-ripple @click="toggleDropdown">
        <h5 class="text-link-historic-desktop">Withdraw <span class="p-2 pi pi-angle-down secondary-color"></span></h5>
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

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { FiatAssetCodes } from '../types/assetCodes.interface'

const props = defineProps<{
  assetCode: string
}>()
const fiatLinks = [
  { name: 'Transfer between BELOBABA accounts', link: '/withdraw/noba/fiat' },
  { name: 'Domestic Wire', link: '/withdraw/usa/fiat/domestic' },
  { name: 'International Wire', link: '/withdraw/usa/fiat/international' },
  { name: 'ACH', link: '/withdraw/usa/fiat/domestic/ACH' },
]
const assetLinks = [
  { name: 'Between BELOBABA Crypto Wallets', link: '/withdraw/noba/asset' },
  { name: 'To other platform crypto wallets', link: '/withdraw/crypto/other' },
]
const achPanamaLinks = [
  { name: 'betweenBelobaba', link: '/withdraw/noba/fiat' },
  { name: 'ACH Panama', link: '/withdraw/panama' },
]
const links: any = ref()
const router = useRouter()

onMounted(() => {
  const linkOptions = {
    [FiatAssetCodes.USD]: fiatLinks,
    [FiatAssetCodes.USD_PANAMA]: achPanamaLinks,
  }
  if (!linkOptions[props.assetCode as FiatAssetCodes]) {
    links.value = assetLinks
  } else {
    links.value = linkOptions[props.assetCode as FiatAssetCodes]
  }
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
