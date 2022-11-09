<template>
	<div :class="containerClass" @click="onWrapperClick">
         <AppTopBar  @menu-toggle="onMenuToggle"/>
        <div class="layout-sidebar" @click="onSidebarClick">
            <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
        </div> 

        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
        </div>

        <transition name="layout-mask">
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
        </transition>
	</div>
    
</template>

<script lang="ts">
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';

import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  components: {
    'AppTopBar': AppTopBar,
    'AppMenu': AppMenu,
  },
  props: {
  },
  data() {
        return {
            staticMenuInactive: false,
            example:true,
            menu : [
                {
                    label: '',
                    items: [
                        {label: 'Inicio', class: 'icon-home', icon: 'pi', to: '/'},
                        {label: 'Depositos', class: 'icon-piggy-bank', icon: 'pi', to: '/',},
                        {label: 'Retiros', class: 'icon-bank', icon: 'pi', to: '/'},
                        {label: 'Billetera', class:'icon-wallet', icon: 'pi', to: '/'},
                        {label: 'Intercambio', class: 'icon-swap', icon: 'pi', to: '/'},
                    ]
                    
                },
            ]
        }
    },
    setup (props,{emit}) {
        const mobileMenuActive = ref(false);
        const overlayMenuActive = ref(false)
        const staticMenuInactive = ref(false)
        const containerClass = computed(()=>

            {
                return ['layout-wrapper', 'layout-static', {
                    'layout-static-sidebar-inactive': !staticMenuInactive.value,
                    'layout-mobile-sidebar-active': mobileMenuActive.value,
                }];
            }
        ) 
        
        const onMenuToggle = () =>{
            staticMenuInactive.value = !staticMenuInactive.value
            console.log('menu',staticMenuInactive.value)
        }
        const onWrapperClick = ()=> {

        }
        const onSidebarClick = () => {

        }

        const onMenuItemClick = (event:Event) =>{

            if (event.item && !event.item.items) {
                
                // this.overlayMenuActive = false;
                // this.mobileMenuActive = false;
            }
        }

        
        return {
            containerClass,
            onWrapperClick,
            onSidebarClick,
            onMenuItemClick,
            mobileMenuActive,
            overlayMenuActive,
            staticMenuInactive,
            onMenuToggle
        }
    },
  
})

</script>

<style >

</style>
