<template>
  <TabView class="mt-5 mb-5">
    <TabPanel :header="t('twoFactor')">
      <TwoFactorSettings v-if="!twoFactorIsActive()" />

      <TwoFactorActiveSuccess v-if="twoFactorIsActive()" />
    </TabPanel>
    <TabPanel :header="t('changePassword')">
      <ChangePassword />
    </TabPanel>
    <TabPanel :header="t('languageSelector')">
      <div class="grid mt-5">
        <div class="col-12 md:col-6">
          <div class="border-1 border-green-200 p-4" style="border-radius: 10px">
            <Lang />
          </div>
        </div>
      </div>
    </TabPanel>
  </TabView>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import ChangePassword from './ChangePassword.vue'
import Lang from '../../../components/Lang.vue'
import TwoFactorSettings from './twofactor/TwoFactorSettings.vue'
import { useTwoFactorAuth } from '../../../composables/useTwoFactorAuth'
import TwoFactorActiveSuccess from './twofactor/TwoFactorActiveSuccess.vue'

const { t } = useI18n({
  useScope: 'global',
})

const { twoFactorIsActive } = useTwoFactorAuth()

</script>

<style lang="css" scoped></style>
