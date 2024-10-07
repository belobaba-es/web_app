<template>
  <div class="p-4">
    <BackButtonMobile :subtitle="t('fiat')" :title="t('withdraw')" />

    <h1 class="font-regular m-0">
      {{ t('withdraw') }} <span style="color: var(--primary-color)">{{ t('fiat') }}</span>
    </h1>

    <p class="mb-4 text-1xl">{{ t('withdrawText') }}</p>

    <TabView>
      <TabPanel :header="t('panama')">
        <TabPanama />
      </TabPanel>
      <TabPanel header="USA (ACH/FeeWire)">
        <TabUsaDomestic />
      </TabPanel>
      <TabPanel header="USA (SWIFT)">
        <TabUsaSwift />
      </TabPanel>
    </TabView>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import BackButtonMobile from '../../../../components/BackButtonMobile.vue'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import TabPanama from './TabPanama.vue'
import TabUsaDomestic from './TabUsaDomestic.vue'
import TabUsaSwift from './TabUsaSwift.vue'

const { t } = useI18n({ useScope: 'global' })
</script>
<style lang="scss"></style>
