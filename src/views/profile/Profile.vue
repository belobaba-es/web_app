<template>
    <TabMenu :model="menuItems" v-model:activeIndex="active" class="font-light" />
    <router-view />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TabMenu from 'primevue/tabmenu';
import {useI18n} from "vue-i18n";
const { t } = useI18n({ useScope: 'global' })

interface tabItem {
    label: string;
    icon?: string;
    to: string;
}

const active = ref<number>(1);

const menuItems = ref<tabItem[]>([
    {
        label: t('profile'),
        to: '/profile'
    },
    {
        label: t('shareholders'),
        to: '/profile/partners'
    },
    {
        label: t('documents'),
        to: '/profile/documentation'
    },
    {
        label:t('setting'),
        to: '/profile/settings'
    }
])
</script>

<style lang="scss" scoped>

::v-deep(.p-tabmenuitem) {
  font-size: 14pt;
}
</style>