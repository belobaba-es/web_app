<template>
  <SpeedDial :model="items" :radius="80" direction="up" style="bottom: 4rem; right: 0; left: 0">
    <template #item="{ item, toggleCallback }">
      <router-link :class="[item.class, 'p-ripple']" :to="item.to">
        <div
          :class="items.length === 1 ? 'pt-3' : ''"
          class="flex flex-row p-2 cursor-pointer align-items-center link-tab-bar"
        >
          <i :class="item.class" class="pi" style="color: #00beb0"></i>
          <span class="test pl-2">{{ item.label }}</span>
        </div>
      </router-link>
    </template>
  </SpeedDial>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import SpeedDial from 'primevue/speeddial'
import { useI18n } from 'vue-i18n'
import { isEnableCardModule } from '../../shared/services/remoteConfig'

const { t } = useI18n({ useScope: 'global' })

const enableCardModule = ref(false)

const items = reactive([
  {
    label: t('transactionHistory'),
    icon: 'pi',
    class: 'icon-history text-center',
    to: '/transaction-history',
  },
])

onMounted(async () => {
  enableCardModule.value = await isEnableCardModule()
  if (enableCardModule.value) {
    items.unshift({
      label: t('swap'),
      class: 'icon-swap',
      icon: 'pi',
      to: '/swap',
    })
  }
})
</script>

<style lang="scss">
.p-speeddial-button.p-button.p-button-icon-only {
  width: 3.5rem;
  height: 3.5rem;
}

.background-speeddial {
  border-radius: 2rem 2rem 0 0;
  background: white;
  padding-top: 1rem;
  width: 100%;
}

.p-speeddial-item {
  border-radius: 0 0 0 0;
  background: white;
  padding-left: 1rem;
  width: 100%;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.p-speeddial-item:last-of-type {
  border-radius: 2rem 2rem 0 0;
  padding-bottom: 0.5rem;
  padding-top: 1.5rem;
  box-shadow: 0 -10px 10px -10px rgba(0, 0, 0, 0.5);
}

.p-speeddial-item:first-of-type {
  padding: 0rem 1rem 2.5rem;
}

.p-speeddial-list {
  width: 100%;
  padding-bottom: 1.5rem;
  display: none;
  z-index: 0;
}

.rotate-icon {
  transform: rotate(90deg);
}

.p-speeddial-opened > ul {
  position: fixed;
  width: 100%;
  display: flex !important;
}
</style>
