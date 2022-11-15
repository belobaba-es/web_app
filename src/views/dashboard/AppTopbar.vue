<template>
	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<img alt="Logo" :src="'/src/assets/icons/logo.svg'" />
			<span></span>
		</router-link>
		<Button class="p-link layout-menu-button  lg:hidden layout-topbar-button p-button-text" @click="onMenuToggle">
			<i class="pi pi-bars"></i>
		</Button>
		<div class="flex ">
			<div class="mr-2 ml-2">
				<p style="margin: 0; font-size: 12px;">{{t('balance')}}</p>
				<span>14.000.000</span>
			</div>
			<Button class="p-button-outlined mr-2 ml-2" >
				<i class="pi pi-bell  p-text-secondary"  v-badge.danger="2"></i>	
			</Button>

			<SplitButton label="Save"  :model="items" class="p-button-text mr-2 mb-2 ml-2">
				<img alt="logo" src="/src/assets/icons/maletin.svg" style="width: 2.5rem"/>
				<span style="margin: auto 0;">Pintosoft CA</span>
			</SplitButton>

		</div>
		
	</div>
</template>

<script lang="ts" setup>
import SplitButton from 'primevue/splitbutton'
import Button from 'primevue/button';
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {useI18n} from "vue-i18n";

const router = useRouter()
const menu = ref();
const emit = defineEmits(['menu-toggle'])

const { t } = useI18n({ useScope: 'global' })

const onMenuToggle = (payload: any) => {
	emit('menu-toggle', payload);
}

const items = ref([
	{
		label: t('profile'),
		icon: 'pi pi-user',
		command: () => router.push('/profile')
	},
	{
		label: t('contact'),
		icon: 'pi pi-phone',
		command: () => {}
	},
	{
		label: t('help'),
		icon: 'pi ',
		class: 'icon-home',
		command: () => {}
	},
	{
		separator: true
	},
	{
		label: t('logOut'),
		icon: 'pi pi-sign-out',
		command: () => {
			
		}
	},

]);

</script>


<style lang="scss">

</style>