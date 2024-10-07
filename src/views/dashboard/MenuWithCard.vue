<template>
  <AppSpeeddial />
  <div class="flex flex-row justify-content-between">
    <div class="flex flex-row justify-content-between">
      <div v-for="link of firstPart">
        <div class="col flex flex-row justify-content-center align-content-center align-items-center w-6rem">
          <router-link
            v-if="link.to"
            v-ripple
            :aria-label="link.label"
            :class="[link.class, 'p-ripple', { 'p-disabled': link.disabled }]"
            :target="link.target"
            :to="link.to"
            exact
            role="menuitem"
            @click="onMenuItemClick($event)"
          >
            <div class="link-tab-bar">
              <div class="flex align-items-center justify-content-center">
                <i :class="[link.class, 'p-ripple', { 'p-disabled': link.disabled }, link.icon]" class="icon"></i>
              </div>
              <div class="test">
                <span :class="[link.class]" style="font-size: 12px">{{ link.label }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-content-between">
      <div v-for="link of SecondPart">
        <div class="col flex flex-row justify-content-center align-content-center align-items-center w-6rem">
          <router-link
            v-if="link.to"
            v-ripple
            :aria-label="link.label"
            :class="[link.class, 'p-ripple', { 'p-disabled': link.disabled }]"
            :target="link.target"
            :to="link.to"
            exact
            role="menuitem"
            @click="onMenuItemClick($event)"
          >
            <div class="link-tab-bar">
              <div class="flex align-items-center justify-content-center">
                <i :class="[link.class, 'p-ripple', { 'p-disabled': link.disabled }, link.icon]" class="icon"></i>
              </div>
              <div class="test">
                <span :class="[link.class]" style="font-size: 12px">{{ link.label }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref, watchEffect } from 'vue'
import AppSpeeddial from './AppSpeeddial.vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

let menuMobileOptions = computed(() => props.items)

let firstPart = ref<any[]>([])
let SecondPart = ref<any[]>([])

watchEffect(() => {
  firstPart.value = menuMobileOptions.value.slice(0, 2)
  SecondPart.value = menuMobileOptions.value.slice(2, 4)
})

const onMenuItemClick = (event: any) => {
  let element = document.getElementsByClassName('active').item(0)

  if (element) {
    element.className = 'link-tab-bar'
  }

  event.target.parentNode.parentNode.className = 'active'
}
</script>
<style lang="scss">
.link-tab-bar {
  color: black;
}

.active {
  color: var(--primary-color);
}

.icon {
  height: 26px;
  padding: 1px;
}
</style>
