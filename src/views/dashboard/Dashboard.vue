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
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive" @click="onMenuToggle"></div>
        </transition>
	</div>
    
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';

interface MenuI {
    label: string;
    class: string;
    icon:  string;
    to?:   string;
    items: MenuI[];
}
const menu = [
    {
        label: '',
        items: [
            {label: 'Inicio', class: 'icon-home', icon: 'pi', to: '/'},
            {label: 'Depositos', class: 'icon-piggy-bank', icon: 'pi', to: '/deposit',},
            {label: 'Retiros', class: 'icon-bank', icon: 'pi', to: '/'},
            {label: 'Billetera', class:'icon-wallet', icon: 'pi', to: '/'},
            {label: 'Intercambio', class: 'icon-swap', icon: 'pi', to: '/'},
        ]
        
    },
]


const mobileMenuActive = ref(false);
const overlayMenuActive = ref(false)

const containerClass = computed(()=>

    {
        return ['layout-wrapper', 'layout-static', {
            'layout-mobile-sidebar-active': mobileMenuActive.value,

        }];
    }
) 

const onMenuToggle = () =>{
    mobileMenuActive.value = !mobileMenuActive.value
}
const onWrapperClick = ()=> {

}
const onSidebarClick = () => {

}

const onMenuItemClick = (event:Event) =>{

    // if (event.item && !event.item.items) {
        
    //     // this.overlayMenuActive = false;
    //     // this.mobileMenuActive = false;
    // }
}

</script>
<!-- <script lang="ts">
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';

import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
    components: {
    'AppTopBar': AppTopBar,
    'AppMenu': AppMenu,
    },
    props: {},
    data() {
        return {
            
        }
    },
    setup (props,{emit}) {
        
        
        
    },
  
})

</script> -->

<style >

</style>
