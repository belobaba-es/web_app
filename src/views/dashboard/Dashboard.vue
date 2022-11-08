<template>
	<div class="layout-wrapper" @click="onMenuToggle_2">
         <AppTopBar />
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
    <div>
        asdasd
    </div>
</template>

<script lang="ts">
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';

import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    'AppTopBar': AppTopBar,
    'AppMenu': AppMenu,
  },
  props: {

  },
  data() {
        return {
            layoutMode: 'overlay',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menu : [
                {
                    label: 'Home',
                    items: [{
                        label: 'Conciliaciones', icon: 'pi pi-fw pi-home', to: '/'
                    }]
         

                },
                {
                    label: 'Configuración',
                    items: [
                        {label: 'Empresa', icon: 'pi pi-fw pi-building', to: '/company',},
                        {label: 'Categoria', icon: 'pi pi-fw pi-tags', to: '/category'}
                    ]
                    
                },
            ]
        }
    },
    setup (props,{emit}) {
        const onMenuToggle_2 = (event: Event) => {
        // `event` implicitly has `any` type
            console.log((event.target as HTMLInputElement).value)
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
            onMenuToggle_2,
            onWrapperClick,
            onSidebarClick,
            onMenuItemClick
        }
    },
  
})


// export default {
//     components: {
//         'AppTopBar': AppTopBar,
//         'AppMenu': AppMenu,
       
//     },
//     emits: ['change-theme'],
//     data() {
//         return {
//             layoutMode: 'overlay',
//             staticMenuInactive: false,
//             overlayMenuActive: false,
//             mobileMenuActive: false,
//             menu : [
//                 {
//                     label: 'Home',
//                     items: [{
//                         label: 'Conciliaciones', icon: 'pi pi-fw pi-home', to: '/'
//                     }]
         

//                 },
//                 {
//                     label: 'Configuración',
//                     items: [
//                         {label: 'Empresa', icon: 'pi pi-fw pi-building', to: '/company',},
//                         {label: 'Categoria', icon: 'pi pi-fw pi-tags', to: '/category'}
//                     ]
                    
//                 },
//             ]
//         }
//     },
//     watch: {
//         $route() {
//             this.menuActive = false;
//             this.$toast.removeAllGroups();
//         }
//     },
//     methods: {
//         onWrapperClick() {
//             if (!this.menuClick) {
//                 this.overlayMenuActive = false;
//                 this.mobileMenuActive = false;
//             }

//             this.menuClick = false;
//         },
//         onMenuToggle() {
//             this.menuClick = true;

//             if (this.isDesktop()) {
//                 if (this.layoutMode === 'overlay') {
// 					if(this.mobileMenuActive === true) {
// 						this.overlayMenuActive = true;
// 					}

//                     this.overlayMenuActive = !this.overlayMenuActive;
// 					this.mobileMenuActive = false;
//                 }
//                 else if (this.layoutMode === 'static') {
//                     this.staticMenuInactive = !this.staticMenuInactive;
//                 }
//             }
//             else {
//                 this.mobileMenuActive = !this.mobileMenuActive;
//             }

//             event.preventDefault();
//         },
//         onSidebarClick() {
//             this.menuClick = true;
//         },
//         onMenuItemClick(event) {
//             if (event.item && !event.item.items) {
//                 this.overlayMenuActive = false;
//                 this.mobileMenuActive = false;
//             }
//         },
// 		onLayoutChange(layoutMode) {
// 			this.layoutMode = layoutMode;
// 		},
//         addClass(element, className) {
//             if (element.classList)
//                 element.classList.add(className);
//             else
//                 element.className += ' ' + className;
//         },
//         removeClass(element, className) {
//             if (element.classList)
//                 element.classList.remove(className);
//             else
//                 element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
//         },
//         isDesktop() {
//             return window.innerWidth >= 992;
//         },
//         isSidebarVisible() {
//             if (this.isDesktop()) {
//                 if (this.layoutMode === 'static')
//                     return !this.staticMenuInactive;
//                 else if (this.layoutMode === 'overlay')
//                     return this.overlayMenuActive;
//             }

//             return true;
//         }
//     },
//     computed: {
//         containerClass() {
//             return ['layout-wrapper', {
//                 'layout-overlay': this.layoutMode === 'overlay',
//                 'layout-static': this.layoutMode === 'static',
//                 'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
//                 'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
//                 'layout-mobile-sidebar-active': this.mobileMenuActive,
// 				'p-input-filled': this.$primevue.config.inputStyle === 'filled',
// 				'p-ripple-disabled': this.$primevue.config.ripple === false
//             }];
//         },
//         logo() {
//             return (this.$appState.darkTheme) ? "images/logo-white.svg" : "images/logo.svg";
//         }
//     },
//     beforeUpdate() {
//         if (this.mobileMenuActive)
//             this.addClass(document.body, 'body-overflow-hidden');
//         else
//             this.removeClass(document.body, 'body-overflow-hidden');
//     },
    
// }
</script>

<style >

</style>
