<template>
  <div class="grid">
    <template v-for="(item, i) of items">
      <div
        class="col flex flex-row justify-content-center align-content-center align-items-center"
        v-for="(link, i) of item.items"
      >
        <router-link
          @click="onMenuItemClick($event)"
          v-if="link.to"
          :to="link.to"
          :class="[link.class, 'p-ripple', { 'p-disabled': link.disabled }]"
          :style="link.style"
          :target="link.target"
          :aria-label="link.label"
          exact
          role="menuitem"
          v-ripple
        >
          <div class="link-tab-bar">
            <div class="flex align-items-center justify-content-center">
              <i class="icon" :class="link.icon"></i>
            </div>
            <div>
              <span>{{ link.label }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
// import Badge from 'primevue/badge';
import { ref, defineProps } from 'vue'

defineProps({
  items: Array<any>,
  root: {
    type: Boolean,
    default: false,
  },
})

const onMenuItemClick = (event: any) => {
  let element = document.getElementsByClassName('active').item(0)

  if (element) {
    element!.className = 'link-tab-bar'
  }

  event.target.parentNode.parentNode.className = 'active'
}
</script>

<style lang="scss">
.link-tab-bar {
  color: black;
}

.icon{
  width: 23px;
  padding: auto;
}

.active {
  color: #00beb0;
}
</style>
