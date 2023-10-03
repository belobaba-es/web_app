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
            <div class="affiliate-link-container">
              <!--              todo-->
              <!--              <AffiliateLink></AffiliateLink>-->
            </div>
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
import AffiliateLink from './components/AffiliateLink.vue'
import { useUserStore } from '../../stores/user'

const { t } = useI18n({ useScope: 'global' })
const { natureAccount, fetchAccount, loading } = useAccount()
const menuItems = ref()
const checkCanSee = (...args: string[]) => {
  if (!userStore.getUser.client.type) {
    console.log('no value')
    return
  }

  console.log('args', ...args)
  return args.includes(userStore.getUser.client.type || '')
}
const userStore = useUserStore()
const { getUser } = useUserStore()
onBeforeMount(async () => {
  console.log('getUser.client.type', getUser.client.type)
  await fetchAccount()
  setMenuItems()
  console.log('-- userStore.getUser', userStore.getUser)
  console.log('-- userStore.getUser.clientId', userStore.getUser.clientId)
  console.log('userStore.getUser.clientId', userStore.getUser.clientId)
  console.log('userStore.getUser.type ', userStore.getUser.client.type)
  console.log(' TypeAccount.natural', userStore.getUser.client.type === TypeAccount.NATURAL_PERSON)
})

const documentsPath = computed(() => {
  return userStore.getUser.client.type === TypeAccount.COMPANY
    ? `/profile/${userStore.getUser.clientId}/documentation/person`
    : `/profile/${userStore.getUser.clientId}/documentation/company`
})

const setMenuItems = () => {
  menuItems.value = [
    {
      label: t('profile'),
      to: `/profile/${userStore.getUser.clientId}`,
      canSee: checkCanSee('COMPANY', 'NATURAL_PERSON'),
    },
    {
      label: t('shareholders'),
      to: `/profile/${userStore.getUser.clientId}/partners`,
      canSee: checkCanSee('COMPANY'),
    },
    {
      label: t('documents'),
      to: documentsPath,
      canSee: checkCanSee('COMPANY', 'NATURAL_PERSON'),
    },
    {
      label: t('setting'),
      to: `/profile/${userStore.getUser.clientId}/settings`,
      canSee: checkCanSee('COMPANY', 'NATURAL_PERSON'),
    },
    {
      label: t('businessPartners'),
      to: `/profile/${userStore.getUser.clientId}/business-partners`,
      canSee: checkCanSee('COMPANY', 'NATURAL_PERSON'),
    },
  ].filter(item => item.canSee)

  console.log('menuItems', menuItems.value)
}
</script>

<style lang="scss" scoped>
::v-deep(.p-tabmenuitem) {
  font-size: 14pt;
}

.affiliate-link-container {
  margin-top: -24px;
}

@media only screen and (max-width: 680px) {
  .affiliate-link-container {
    margin-top: 4px;
  }
}
</style>
