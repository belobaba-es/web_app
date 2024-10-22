<template>
  <div>
    <h3 v-if="title">{{ title }}</h3>
    <div class="card col p-2" style="margin: 0 auto; border: 1px solid var(--primary-color)">
      <div class="flex justify-content-between align-items-center">
        <div class="flex col-10">
          <div class="mr-2">
            <img :alt="altText" :src="imageSrc" />
          </div>

          <div>
            <h3 class="font-medium m-1">{{ subtitle }}</h3>
            <div class="flex">
              <div
                class="card pl-3 pr-3 m-0 mr-2"
                style="
                  background: var(--primary-color);
                  color: #1b1b19 !important;
                  padding: 0.25rem 1rem !important;
                  line-height: 14px;
                  height: 1.8rem;
                "
              >
                {{ firstTag }}
              </div>
              <div
                v-if="secondTag"
                class="card pl-3 pr-3 m-0"
                style="
                  background: #01579b;
                  color: white;
                  padding: 0.25rem 1rem !important;
                  line-height: 14px;
                  height: 1.8rem;
                "
              >
                {{ secondTag }}
              </div>
            </div>
          </div>
        </div>

        <div class="col-2 md:col-2">
          <i class="pi pi-angle-right text-2xl" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  subtitle: String,
  firstTag: String,
  secondTag: String,
  imageSrc: String,
  altText: String,
})
</script>
<style lang="scss" scoped>
.card {
  border: 1px solid var(--primary-color);
  margin: 0 auto;
  padding: 2rem;
}
</style>
