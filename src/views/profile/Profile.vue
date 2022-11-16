<template>
    <PageLayout title="My Profile" class="profile">
        <template #contentHeader>
            <div class="grid gap-4 py-4">
                <div v-for="(item, idx) in menuItems" class="col-auto">
                    <RouterLink :to="item.to" class="p-button profile-navigation" exact>
                        {{ item.label }}
                    </RouterLink>
                </div>
            </div>
        </template>
        <router-view />
    </PageLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {useI18n} from "vue-i18n";
import PageLayout from '../../components/PageLayout.vue';

const { t } = useI18n({ useScope: 'global' })

interface tabItem {
    label: string;
    icon?: string;
    to: string;
    canSee: string[]
}

const menuItems = ref<tabItem[]>([
    {
        label: t('profile'),
        to: '/profile',
        canSee: ['person', 'company']
    },
    {
        label: t('shareholders'),
        to: '/profile/partners',
        canSee: ['company']
    },
    {
        label: t('documents'),
        to: '/profile/documentation',
        canSee: ['person']
    },
    {
        label:t('setting'),
        to: '/profile/settings',
        canSee: ['person']
    }
])
</script>

<style lang="scss" scoped>

::v-deep(.p-tabmenuitem) {
  font-size: 14pt;
}
</style>