<template>
	<div class="layout-topbar">
		<router-link to="/dashboard" class="layout-topbar-logo">
			<img alt="Logo" :src="logo" />
			<span></span>
		</router-link>
		<Button class="p-link layout-menu-button  lg:hidden layout-topbar-button p-button-text" @click="onMenuToggle">
			<i class="pi pi-bars"></i>
		</Button>
		<div class="flex ">
			<div class="mr-2 ml-2">
				<p style="margin: 0; font-size: 12px;">{{t('balance')}}</p>
				<span>
         <strong class="font-bold"> {{balanceWalletUsd()}} USD</strong>
        </span>
			</div>
			<Button class="p-button-outlined mr-2 ml-2" >
				<i class="pi pi-bell  p-text-secondary"  v-badge.danger="2"></i>	
			</Button>

			<SplitButton label="Save"  :model="items" class="p-button-text mr-2 mb-2 ml-2">
				<img alt="logo" src="../../assets/icons/maletin.svg" style="width: 2.5rem"/>
				<span style="margin: auto 0;">{{username}}</span>
			</SplitButton>

		</div>
		
	</div>
</template>

<script lang="ts" setup>
import SplitButton from 'primevue/splitbutton'
import Button from 'primevue/button';
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useI18n} from "vue-i18n";
import logo from '../../assets/img/logo.svg'
import {useUserStore} from '../../stores/user';
import {LoginService} from '../login/services/login';
import {useBalanceWallet} from "../../composables/useBalanceWallet";

const router = useRouter()
const {getBalanceByCode} = useBalanceWallet()
const emit = defineEmits(['menu-toggle'])

const { t } = useI18n({ useScope: 'global' })

const onMenuToggle = (payload: any) => {
	emit('menu-toggle', payload);
}

const userStore = useUserStore();
const loginService = LoginService.instance();

const username = userStore.getUser.firstName ? userStore.getUser.firstName + ' ' + userStore.getUser.lastName :  userStore.getUser.name


const balanceWalletUsd = () => {
  const balanceWalletUsd = getBalanceByCode('USD')
  if (balanceWalletUsd) {
    return balanceWalletUsd.balance ?? 0
  }

  return 0
}

const items = ref([
	{
		label: t('profile'),
		icon: 'pi pi-user',
		command: () => {
      router.push(`/profile/${userStore.getUser.account.accountId}`)
    }
	},
	{
		icon: 'pi',
		class: 'icon-headset',
		label: t('contact'),
		command: () => {}
	},
	{
		label: t('help'),
		icon: 'pi ',
		class: 'icon-help',
		command: () => {}
	},
	{
		separator: true
	},
	{
		label: t('logOut'),
		icon: 'pi pi-sign-out',
		command: async () => {
      await loginService.logout();
      window.location.href = '/'
		}
	},

]);

</script>


<style lang="scss">

</style>