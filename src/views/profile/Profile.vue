<template>
  <section class="section-main">
    <PageLayout :title="t('profile')" class="profile">
      <template #contentHeader>
        <template v-if="loading">
          <div class="grid gap-4 py-4">
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
import { useAuth } from '../../composables/useAuth'

const { t } = useI18n({ useScope: 'global' })
const { fetchAccount, loading } = useAccount()
const menuItems = ref()

const { getAccountType, getClientId } = useAuth()
const checkCanSee = (...args: string[]) => {
  if (getAccountType() === '') {
    return
  }
  return args.includes(getAccountType() || '')
}
onBeforeMount(async () => {
  setMenuItems()
})

const setMenuItems = () => {
  menuItems.value = [
    {
      label: t('profile'),
      to: `/profile/${getClientId()}`,
      canSee: checkCanSee('COMPANY', 'NATURAL_PERSON'),
    },
    {
      label: t('shareholders'),
      to: `/profile/${getClientId()}/partners`,
      canSee: checkCanSee('COMPANY'),
    },
    {
      label: t('setting'),
      to: `/profile/${getClientId()}/settings`,
      canSee: checkCanSee('COMPANY', 'NATURAL_PERSON'),
    },
    {
      label: t('businessPartners'),
      to: `/profile/${getClientId()}/business-partners`,
      canSee: checkCanSee('COMPANY', 'NATURAL_PERSON'),
    },
  ].filter(item => item.canSee)
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
