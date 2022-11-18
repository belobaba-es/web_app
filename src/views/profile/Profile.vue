<template>
    <PageLayout :title="t('profile')" class="profile">
        <template #contentHeader>
            <div class="grid gap-4 py-4">
                <div 
                    v-for="(item, idx) in menuItemsFiltered"
                    :key="idx"
                    class="col-auto">
                    <RouterLink
                        :to="item.to"
                        class="p-button profile-navigation" 
                        exact
                    >
                        {{ item.label }}
                    </RouterLink>
                </div>
            </div>
        </template>
        <router-view />
    </PageLayout>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import PageLayout from '../../components/PageLayout.vue';
import { useAccount } from '../../composables/useAccount';
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: 'global' });
const { natureAccount, accountId, fetchAccount } = useAccount();

const checkCanSee = (...args: string[]) => {
    if (!natureAccount.value) return;
    return args.includes(natureAccount.value || '');
}

onMounted(async () => await fetchAccount());

const menuItems = ref([
        {
            label: t('profile'),
            to: `/profile/${accountId.value}`,
            canSee: checkCanSee('company', 'natural_person')
        },
        {
            label: t('shareholders'),
            to: `/profile/${accountId.value}/partners`,
            canSee: checkCanSee('company')
        },
        {
            label: t('documents'),
            to: `/profile/${accountId.value}/documentation`,
            canSee: checkCanSee('company', 'natural_person')
        },
        {
            label:t('setting'),
            to: `/profile/${accountId.value}/settings`,
            canSee: checkCanSee('company', 'natural_person')
        }
]);

const menuItemsFiltered = computed(() => menuItems.value.filter(item => item.canSee))
</script>

<style lang="scss" scoped>

::v-deep(.p-tabmenuitem) {
  font-size: 14pt;
}
</style>