<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menuDesktop" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <router-view />
      </div>
      <ButtonCreateWallet v-if="isCurrentRouteWallet" />
      <AppFooter />

      <AppTabBarContainer :model="menuMobile"></AppTabBarContainer>
    </div>

    <transition name="layout-mask">
      <div class="layout-mask p-component-overlay" v-if="mobileMenuActive" @click="onMenuToggle"></div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppTopBar from './AppTopbar.vue'
import AppMenu from './AppMenu.vue'
import AppFooter from './AppFooter.vue'
import AppTabBarContainer from './AppTabBarContainer.vue'
import ButtonCreateWallet from '../../components/ButtonCreateWallet.vue'

import { useI18n } from 'vue-i18n'
import { useBalanceWallet } from '../../composables/useBalanceWallet'
import { LoginService } from '../login/services/login'

const router = useRouter()
const inactiveTime = ref(0)
const timeout = 5
let interval: number = 0

const { t } = useI18n({ useScope: 'global' })
const { fetchBalanceWallets } = useBalanceWallet()

const menuDesktop = [
  {
    label: '',
    items: [
      { label: t('home'), class: 'icon-home', icon: 'pi', to: '/dashboard' },
      { label: t('deposit'), class: 'icon-piggy-bank', icon: 'pi', to: '/deposit' },
      { label: t('withdraw'), class: 'icon-bank', icon: 'pi', to: '/withdraw' },
      { label: t('wallet'), class: 'icon-wallet', icon: 'pi', to: '/wallet' },
      { label: t('swap'), class: 'icon-swap', icon: 'pi', to: '/swap' },
      { label: t('transactionHistory'), class: 'icon-history', icon: 'pi', to: '/transaction-history' },
    ],
  },
]

const menuMobile = [
  {
    label: '',
    items: [
      { label: t('home'), class: 'icon-home', icon: 'pi', to: '/dashboard' },
      { label: t('deposit'), class: 'icon-piggy-bank', icon: 'pi', to: '/deposit' },
      { label: t('withdraw'), class: 'icon-bank', icon: 'pi', to: '/withdraw' },
      { label: t('wallet'), class: 'icon-wallet', icon: 'pi', to: '/wallet' },
      { label: t('swap'), class: 'icon-swap', icon: 'pi', to: '/swap' },
    ],
  },
]


const mobileMenuActive = ref(false)

fetchBalanceWallets()

const containerClass = computed(() => {
  return [
    'layout-wrapper',
    'layout-static',
    {
      'layout-mobile-sidebar-active': mobileMenuActive.value,
    },
  ]
})

const onMenuToggle = () => {
  mobileMenuActive.value = !mobileMenuActive.value
}
const onWrapperClick = () => {}
const onSidebarClick = () => {}

const onMenuItemClick = (event: any) => {
  if (event.item && !event.item.items) {
    // this.overlayMenuActive = false;
    // this.mobileMenuActive = false;
  }
}

onMounted(() => {
  window.addEventListener('focus', () => {
    inactiveTime.value = 0
    clearInterval(interval)
  })

  window.addEventListener('mousemove', () => {
    inactiveTime.value = 0
    clearInterval(interval)
  })

  window.addEventListener('keydown', () => {
    inactiveTime.value = 0
    clearInterval(interval)
  })

  window.addEventListener('blur', () => {
    interval = setInterval(() => {
      inactiveTime.value++
      if (inactiveTime.value >= timeout) {
        clearInterval(interval)
        closedSession()
      }
    }, 60000)
  })

  interval = setInterval(() => {
    inactiveTime.value++
    if (inactiveTime.value >= timeout) {
      clearInterval(interval)
      closedSession()
    }
  }, 60000)
})

const closedSession = async () => {
  const loginService = LoginService.instance()
  await loginService.logout()
  window.location.href = '/'
}

const isCurrentRouteWallet = computed(() => {
  return router.currentRoute.value.path === '/wallet'
})

</script>

<style></style>
