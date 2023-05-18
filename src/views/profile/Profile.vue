<template>
  <section class="section-main">
    <PageLayout :title="t('profile')" class="profile">
      <template #contentHeader>
        <template v-if="loading">
          <div class="grid gap-4 py-4">
            <Skeleton width="5rem" height="2rem" borderRadius="16px"></Skeleton>
            <Skeleton width="5rem" height="2rem" borderRadius="16px"></Skeleton>
            <Skeleton width="5rem" height="2rem" borderRadius="16px"></Skeleton>
            <Skeleton width="5rem" height="2rem" borderRadius="16px"></Skeleton>
          </div>
        </template>
        <template v-else>
          <div class="grid gap-4 py-4">
            <div v-for="(item, idx) in menuItems" :key="idx" class="col-auto">
              <RouterLink :to="item.to" class="p-button profile-navigation" exact>
                {{ item.label }}
              </RouterLink>
            </div>
            <AffiliateLink class="affiliate-link"></AffiliateLink>
          </div>
        </template>
      </template>
      <router-view />
    </PageLayout>
  </section>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, computed } from 'vue'
import PageLayout from '../../components/PageLayout.vue'
import { useAccount } from '../../composables/useAccount'
import { useI18n } from 'vue-i18n'
import Skeleton from 'primevue/skeleton'
import { TypeAccount } from './types/account.interface'
import AffiliateLink from "./components/AffiliateLink.vue";

const { t } = useI18n({ useScope: 'global' })
const { natureAccount, accountId, fetchAccount, loading } = useAccount()

const menuItems = ref()

const checkCanSee = (...args: string[]) => {
  if (!natureAccount.value) return
  return args.includes(natureAccount.value || '')
}

onBeforeMount(async () => {
  await fetchAccount()
  setMenuItems()
})

const documentsPath = computed(() => {
  return natureAccount.value === TypeAccount.natural
    ? `/profile/${accountId.value}/documentation/person`
    : `/profile/${accountId.value}/documentation/company`
})

const setMenuItems = () => {
  menuItems.value = [
    {
      label: t('profile'),
      to: `/profile/${accountId.value}`,
      canSee: checkCanSee('company', 'natural_person'),
    },
    {
      label: t('shareholders'),
      to: `/profile/${accountId.value}/partners`,
      canSee: checkCanSee('company'),
    },
    {
      label: t('documents'),
      to: documentsPath,
      canSee: checkCanSee('company', 'natural_person'),
    },
    {
      label: t('setting'),
      to: `/profile/${accountId.value}/settings`,
      canSee: checkCanSee('company', 'natural_person'),
    },
    // todo verificar la restriccion para quien se mostraran los business partners
    {
      label: t('businessPartners'),
      to: `/profile/${accountId.value}/business-partners`,
      canSee: checkCanSee('company', 'natural_person'),
      // todo
      // canSee: checkCanSee('company'),
    },
  ].filter(item => item.canSee)
}
</script>

<style lang="scss" scoped>
::v-deep(.p-tabmenuitem) {
  font-size: 14pt;
}

.affiliate-link {
  margin-top: -24px;
}
</style>
