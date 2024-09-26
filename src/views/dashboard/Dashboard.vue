<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menuDesktop" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="pt-5 mt-5">
        <CreditCardBanner />
      </div>
      <div class="layout-main">
        <router-view />
      </div>
      <ButtonCreateWallet v-if="isCurrentRouteWallet" />
      <AppFooter />

      <AppTabBarContainer :model="menuMobile"></AppTabBarContainer>
    </div>

    <transition name="layout-mask">
      <div v-if="mobileMenuActive" class="layout-mask p-component-overlay" @click="onMenuToggle"></div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppTopBar from './AppTopbar.vue'
import AppMenu from './AppMenu.vue'
import AppFooter from './AppFooter.vue'
import AppTabBarContainer from './AppTabBarContainer.vue'
import ButtonCreateWallet from '../../components/ButtonCreateWallet.vue'
import { useI18n } from 'vue-i18n'
import { useBalanceWallet } from '../../composables/useBalanceWallet'
import { useAuth } from '../../composables/useAuth'
import CreditCardBanner from '../../components/CreditCardBanner.vue'
import { isEnableCardModule } from '../../shared/services/remoteConfig'

const router = useRouter()
const currentRoute = ref('')
const inactiveTime = ref(0)
const timeout = 5
let interval: number = 0

const { t } = useI18n({ useScope: 'global' })
const { fetchBalanceWallets } = useBalanceWallet()

const enableCardModule = ref(false)

const { getClientId } = useAuth()

watch(
  () => router.currentRoute.value,
  newRoute => {
    currentRoute.value = newRoute.path
  }
)

onMounted(async () => {
  enableCardModule.value = await isEnableCardModule()

  if (enableCardModule.value) {
    menuMobile = reactive([
      { label: t('deposit'), class: 'icon-piggy-bank', icon: 'pi', to: '/deposit' },
      { label: t('withdraw'), class: 'icon-bank', icon: 'pi', to: '/withdraw' },
      { label: t('wallet'), class: 'icon-wallet', icon: 'pi', to: '/wallet' },
      { label: t('cardNoba'), class: 'icon-card', icon: 'pi', to: '/cards/card-center/' },
    ])
  } else {
    menuMobile = reactive([
      { label: t('deposit'), class: 'icon-piggy-bank', icon: 'pi', to: '/deposit' },
      { label: t('withdraw'), class: 'icon-bank', icon: 'pi', to: '/withdraw' },
      { label: t('wallet'), class: 'icon-wallet', icon: 'pi', to: '/wallet' },
      { label: t('swap'), class: 'icon-swap', icon: 'pi', to: '/swap' },
    ])
  }
})

const menuDesktop = computed(() => [
  {
    label: '',
    items: [
      { label: t('home'), class: 'icon-home', icon: 'pi', to: '/dashboard' },
      { label: t('deposit'), class: 'icon-piggy-bank', icon: 'pi', to: '/deposit' },
      { label: t('withdraw'), class: 'icon-bank', icon: 'pi', to: '/withdraw' },
      { label: t('wallet'), class: 'icon-wallet', icon: 'pi', to: '/wallet' },
      { label: t('swap'), class: 'icon-swap', icon: 'pi', to: '/swap' },
      { label: t('transactionHistory'), class: 'icon-history', icon: 'pi', to: '/transaction-history' },
      ...(enableCardModule.value
        ? [
            currentRoute.value && currentRoute.value.includes('/cards/')
              ? { label: t('cardNoba'), class: 'icon-card', icon: 'pi', to: currentRoute.value }
              : { label: t('cardNoba'), class: 'icon-card', icon: 'pi', to: '/cards' },
          ]
        : []),
    ],
  },
])

let menuMobile = reactive([
  { label: t('deposit'), class: 'icon-piggy-bank', icon: 'pi', to: '/deposit' },
  { label: t('withdraw'), class: 'icon-bank', icon: 'pi', to: '/withdraw' },
  { label: t('wallet'), class: 'icon-wallet', icon: 'pi', to: '/wallet' },
  ...(!enableCardModule.value
    ? [
        {
          label: t('swap'),
          class: 'icon-swap',
          icon: 'pi',
          to: '/swap',
        },
      ]
    : [{ label: t('cardNoba'), class: 'icon-card', icon: 'pi', to: '/cards/card-center/' }]),
])

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
  const { logout } = useAuth()
  await logout()
  window.location.href = '/'
}

const isCurrentRouteWallet = computed(() => {
  return router.currentRoute.value.path === '/wallet'
})
</script>

<style></style>
