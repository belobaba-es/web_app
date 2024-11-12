<template>
  <div class="layout-topbar">
    <router-link to="/dashboard" class="layout-topbar-logo">
      <img alt="Logo" :src="logo" />
      <span></span>
    </router-link>
    <div class="flex">
      <div class="mr-2 ml-2">
        <p style="margin: 0; font-size: 12px">{{ t('balance') }}</p>
        <span>
          <strong class="font-bold"> {{ getBalanceByCode('USD') }} USD</strong>
        </span>
      </div>
      <div class="mx-2">
        <Dropdown
          v-model="selectedWalletProviderDrop"
          :options="walletsProvider"
          :placeholder="t('textOption')"
          class="custom-dropdown p-1 w-8rem"
          option-value="value"
          option-label="name"
          required
        />
      </div>
      <SplitButton label="Save" :model="items" class="p-button-text mr-2 mb-2 ml-2">
        <img alt="logo" :src="avatar()" class="avatar" />
        <span class="hidden sm:hidden md:hidden lg:flex xl:flex" style="margin: auto 0">{{ username }}</span>
      </SplitButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SplitButton from 'primevue/splitbutton'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import logo from '../../assets/img/logo-blanco.png'
import { useBalanceWallet } from '../../composables/useBalanceWallet'
import { useAuth } from '../../composables/useAuth'
import Dropdown from 'primevue/dropdown'
import { useDashboard } from './composable/useDashboard'

const router = useRouter()
const { getBalanceByCode } = useBalanceWallet()
const emit = defineEmits(['menu-toggle'])

const { t } = useI18n({ useScope: 'global' })

const { getUserName, getClientId, logout, getSupportedWalletProviders } = useAuth()

const username = getUserName()
const { handleSelectedWalletProvider } = useDashboard()
const selectedWalletProviderDrop = ref()

const items = ref([
  {
    label: t('profile'),
    icon: 'pi pi-user',
    command: () => {
      router.push(`/profile/${getClientId()}`)
    },
  },
  {
    label: t('help'),
    icon: 'pi ',
    class: 'icon-help',
    command: () => {
      window.open('https://belobaba.io/faq', '_blank')
    },
  },
  {
    separator: true,
  },
  {
    label: t('logOut'),
    icon: 'pi pi-sign-out',
    command: async () => {
      await logout()
      window.location.href = '/'
    },
  },
])

const avatar = () => {
  return `https://ui-avatars.com/api/?name=${getUserName()}`
}

const walletsProvider = ref(
  getSupportedWalletProviders().map(provider => {
    return {
      name: provider,
      value: provider,
    }
  })
)

onMounted(() => {
  selectedWalletProviderDrop.value = getSupportedWalletProviders()[0]
})

watch(selectedWalletProviderDrop, newValue => {
  handleSelectedWalletProvider(newValue)
})
</script>

<style lang="scss">
.avatar {
  border-radius: 100px;
  width: 3rem;
  margin-right: 0.6rem;
}
</style>
