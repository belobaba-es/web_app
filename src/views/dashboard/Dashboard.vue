<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle"/>
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick"/>
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <router-view/>
      </div>
      <AppFooter></AppFooter>
      <AppTabBarContainer :model="menu"></AppTabBarContainer>
    </div>

    <transition name="layout-mask">
      <div class="layout-mask p-component-overlay" v-if="mobileMenuActive" @click="onMenuToggle"></div>
    </transition>
  </div>

</template>
<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';
import AppFooter from './AppFooter.vue';
import AppTabBarContainer from './AppTabBarContainer.vue'; 


import {useI18n} from "vue-i18n";
import {useBalanceWallet} from "../../composables/useBalanceWallet";
import {LoginService} from "../login/services/login";


const inactiveTime = ref(0);
const timeout = 5;
let interval: number = 0;

const {t} = useI18n({useScope: 'global'})
const {fetchBalanceWallets} = useBalanceWallet()

const menu = [
  {
    label: '',
    items: [
      {label: t('home'), class: 'icon-home', icon: 'pi', to: '/dashboard'},
      {label: t('deposit'), class: 'icon-piggy-bank', icon: 'pi', to: '/deposit',},
      {label: t('withdraw'), class: 'icon-bank', icon: 'pi', to: '/withdraw'},
      {label: t('wallet'), class: 'icon-wallet', icon: 'pi', to: '/wallet'},
      {label: t('swap'), class: 'icon-swap', icon: 'pi', to: '/swap'},
    ]

  },
]


const mobileMenuActive = ref(false);

fetchBalanceWallets()

const containerClass = computed(() => {

      return ['layout-wrapper', 'layout-static', {
        'layout-mobile-sidebar-active': mobileMenuActive.value,

      }];
    }
)

const onMenuToggle = () => {
  mobileMenuActive.value = !mobileMenuActive.value
}
const onWrapperClick = () => {

}
const onSidebarClick = () => {

}

const onMenuItemClick = (event: any) => {

  if (event.item && !event.item.items) {

    // this.overlayMenuActive = false;
    // this.mobileMenuActive = false;
  }
}

onMounted(() => {
  window.addEventListener('focus', () => {
    inactiveTime.value = 0;
    clearInterval(interval);
  });

  window.addEventListener('mousemove', () => {
    inactiveTime.value = 0;
    clearInterval(interval);
  });

  window.addEventListener('keydown', () => {
    inactiveTime.value = 0;
    clearInterval(interval);
  });

  window.addEventListener('blur', () => {
    interval = setInterval(() => {
      inactiveTime.value++;
      if (inactiveTime.value >= timeout) {
        clearInterval(interval);
        closedSession()
      }
    }, 60000);
  });

  interval = setInterval(() => {
    inactiveTime.value++;
    if (inactiveTime.value >= timeout) {
      clearInterval(interval);
      closedSession()
    }
  }, 60000);
});

const closedSession = async () => {
  const loginService = LoginService.instance()
  await loginService.logout()
  window.location.href = '/'
}

</script>


<style>

</style>
