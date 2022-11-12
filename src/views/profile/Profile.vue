<template>
    <TabMenu :model="menuItems" v-model:activeIndex="active" class="profile-tabmenu" />
    <router-view />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TabMenu from 'primevue/tabmenu';

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

<style lang="scss" scoped>
::v-deep(.p-tabmenu.p-component.profile-tabmenu) {
    ul.p-tabmenu-nav.p-reset {
        background: red!important;
        border: none;
        border-width: 0 0 2px 0;
    }
}
</style>