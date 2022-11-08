<template>
	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<img alt="Logo" :src="'/src/assets/logo.svg'" />
			<span></span>
		</router-link>
		<button class="p-link layout-menu-button layout-topbar-button" >
			<i class="pi pi-bars"></i>
		</button>

		<button class="p-link layout-topbar-menu-button layout-topbar-button"
		    v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
			<i class="pi pi-ellipsis-v"></i>
		</button>
		<ul class="layout-topbar-menu hidden lg:flex origin-top">
			
			
			<li>
				
					<p style="margin: 0; font-size: 0.8em;">Mi Saldo</p>
					<span>14.000.000</span>

				
			</li>
			<li>
				<button class="p-link layout-topbar-button"
					
					@click="logout">
					<i class="pi pi-bell"></i>
					<span>Cerrar Sesión</span>
				</button>

			</li>
			
		</ul>
		<SplitButton label="Save"  :model="items" class="p-button-text mr-2 mb-2">
			<img alt="logo" src="/src/assets/maletin.svg" style="width: 2.5rem"/>
			<span style="margin: auto 0;">Pintosoft CA</span>
		</SplitButton>
		
	</div>
</template>

<script lang="ts">

import Tooltip from 'primevue/tooltip';
import SplitButton from 'primevue/splitbutton'
import { defineComponent, ref } from 'vue'

export default defineComponent({
	components: {
		SplitButton
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
		const menu = ref();
		const onMenuToggle = (payload: any) => {
			emit('menu-toggle', payload);
		}

		const logout = (event: Event) =>{

		}

		const items = ref([
			{
				label: 'Mi Perfil',
				icon: 'pi pi-user',
				command: () => {
				
				}
			},
			{
				label: 'Contacto',
				icon: 'pi ',
				class: 'example',
				command: () => {
					
				}
			},
            {
                label: 'Navigate',
                items: [{
                    label: 'Vue Website',
                    icon: 'pi pi-external-link',
                    url: 'https://vuejs.org/'
                },
                {
                    label: 'Router',
                    icon: 'pi pi-upload',
                    command: () => {
                        window.location.hash = "/fileupload"
                    }
                }
            ]}
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
	// methods: {
	// 	onMenuToggle(event) {
	// 		this.$emit('menu-toggle', event);
	// 	},
	// 	onTopbarMenuToggle(event) {
	// 		this.$emit('topbar-menu-toggle', event);
	// 	},
	// 	topbarImage() {
	// 		return  '/images/logo-horizontal.png' 
	// 	},
	// 	logout(){
			
	// 	}
	// },
});

</script>

<style lang="scss">
	
.example .p-menuitem-icon::before{
	content: url(/src/assets/home.svg);;
}
</style>