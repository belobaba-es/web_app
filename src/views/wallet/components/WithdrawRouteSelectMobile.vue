<template>
  <div class="col-4 flex justify-content-center">
    <div class="dropdown-wrapper">
      <router-link class="link-historic" to="#" exact role="menuitem" v-ripple @click="toggleDropdown">
        <div class="flex align-items-center gap-2">
          <h5 class="text-link-historic">Withdraw</h5>
          <span class="pi pi-angle-down primary-color"></span>
        </div>
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

const props = defineProps<{
  isFiat: boolean
}>()
const fiatLinks = [
  { name: 'Transfer between BELOBABA accounts', link: '/withdraw/noba/fiat' },
  { name: 'Domestic Wire', link: '/withdraw/usa/fiat/domestic' },
  { name: 'International Wire', link: '/withdraw/usa/fiat/international' },
]
const assetLinks = [
  { name: 'Between BELOBABA Crypto Wallets', link: '/withdraw/noba/crypto' },
  { name: 'To other platform crypto wallets', link: '/withdraw/crypto/other' },
]
const links: any = ref()
const router = useRouter()

onMounted(() => {
  if (props.isFiat) {
    links.value = fiatLinks
  }
  if (!props.isFiat) {
    links.value = assetLinks
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