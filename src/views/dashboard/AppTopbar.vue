<template>
	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<img alt="Logo" :src="'/src/assets/icons/logo.svg'" />
			<span></span>
		</router-link>
		<Button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
			<i class="pi pi-bars"></i>
		</Button>

		<button class="p-link layout-topbar-menu-button layout-topbar-button"
		    v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
			<i class="pi pi-ellipsis-v"></i>
		</button>
		<ul class="layout-topbar-menu hidden lg:flex origin-top">
			
			<li>
				<div>
					<p style="margin: 0; font-size: 12px;">Mi Saldo</p>
					<span>14.000.000</span>

				</div>

				
			</li>
			<li>
				<Button class="p-button-outlined" >
					<i class="pi pi-bell  p-text-secondary"  v-badge.danger="2"></i>
					
				</Button>
			</li>
			
		</ul>
		<SplitButton label="Save"  :model="items" class="p-button-text mr-2 mb-2">
			<img alt="logo" src="/src/assets/icons/maletin.svg" style="width: 2.5rem"/>
			<span style="margin: auto 0;">Pintosoft CA</span>
		</SplitButton>
		
	</div>
</template>

<script lang="ts">

import Tooltip from 'primevue/tooltip';
import SplitButton from 'primevue/splitbutton'
import Button from 'primevue/button';
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
	components: {
		SplitButton,
		Button
	},
	directives: {
		'tooltip': Tooltip
		
	},
	emits: {
		'menu-toggle': (payload: any) => {
			return payload
		}
  	},
	setup (props,{emit}) {
		const router = useRouter()
		const menu = ref();
		const onMenuToggle = (payload: any) => {
			emit('menu-toggle', payload);
		}

		const logout = (event: Event) =>{}

		const items = ref([
			{
				label: 'Mi Perfil',
				icon: 'pi pi-user',
				command: () => router.push('/profile')
			},
			{
				label: 'Contacto',
				icon: 'pi pi-phone',

				command: () => {
					
				}
			},
            {
				label: 'Ayuda',
				icon: 'pi ',
				class: 'icon-home',
				command: () => {
					
				}
            },
			{
				separator: true
			},
			{
				label: 'Cerrar sesion',
				icon: 'pi pi-sign-out',
				command: () => {
					
				}
            },

        ]);

		const toggle = (event: any) =>{
			console.log(menu)
			menu.value.toggle(event);
		}

		return {
			onMenuToggle,
			logout,
			toggle,
			items
		}
  	},
});

</script>

<style lang="scss">
	

</style>