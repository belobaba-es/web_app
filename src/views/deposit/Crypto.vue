<template>
    <TabMenu :model="menuItems" v-model:activeIndex="active" />
    <router-view />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface tabItem {
    label: string;
    icon?: string;
    to: string;
}

const active = ref<number>(1);

const menuItems = ref<tabItem[]>([
    {
        label: 'Perfil',
        to: '/profile'
    },
    {
        label: 'Accionistas',
        to: '/profile/partners'
    },
    {
        label: 'Documentación',
        to: '/profile/documentation'
    },
    {
        label: 'Ajustes',
        to: '/profile/settings'
    }
])
</script>

<style lang="css">
.p-tabmenu .p-tabmenu-nav {
    background: transparent!important;
    border: 1px solid #dee2e6;
    border-width: 0 0 2px 0;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
    background: transparent!important;
    border-color: var(--primary-color);
    color: var(--primary-color);
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
    border: solid #dee2e6;
    border-width: 0 0 2px 0;
    border-color: transparent transparent #dee2e6 transparent;
    background: transparent!important;
    color: #6c757d;
    padding: 1rem;
    font-weight: 600;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    transition: box-shadow 0.2s;
    margin: 0 0 -2px 0;
}
</style>