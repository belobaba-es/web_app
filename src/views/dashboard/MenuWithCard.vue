<template>
  <AppSpeeddial />
  <div class="flex flex-row justify-content-between">
    <div class="flex flex-row justify-content-between">
      <div v-for="link of firstPart">
        <div class="col flex flex-row justify-content-center align-content-center align-items-center w-6rem">
          <router-link
            @click="onMenuItemClick($event)"
            v-if="link.to"
            :to="link.to"
            :class="[link.class, 'p-ripple', { 'p-disabled': link.disabled }]"
            :target="link.target"
            :aria-label="link.label"
            exact
            role="menuitem"
            v-ripple
          >
            <div class="link-tab-bar">
              <div class="flex align-items-center justify-content-center">
                <i class="icon" :class="[link.class, 'p-ripple', { 'p-disabled': link.disabled }, link.icon]"></i>
              </div>
              <div class="test">
                <span style="font-size: 12px" :class="[link.class]">{{ link.label }}</span>
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
            @click="onMenuItemClick($event)"
            v-if="link.to"
            :to="link.to"
            :class="[link.class, 'p-ripple', { 'p-disabled': link.disabled }]"
            :target="link.target"
            :aria-label="link.label"
            exact
            role="menuitem"
            v-ripple
          >
            <div class="link-tab-bar">
              <div class="flex align-items-center justify-content-center">
                <i class="icon" :class="[link.class, 'p-ripple', { 'p-disabled': link.disabled }, link.icon]"></i>
              </div>
              <div class="test">
                <span style="font-size: 12px" :class="[link.class]">{{ link.label }}</span>
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
  color: #00beb0;
}

.icon {
  height: 26px;
  padding: 1px;
}
</style>
