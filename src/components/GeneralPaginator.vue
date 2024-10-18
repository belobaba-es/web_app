<template>
  <div>
    <button class="w-6rem" :disabled="prop.pagination.currentPage === 1" @click="prevPage">{{ t('previous') }}</button>
    <span v-if="!isMobile"
      >{{ t('page') }} {{ prop.pagination.currentPage }} {{ t('of') }} {{ prop.pagination.totalPages }} {{ t('of') }}
      {{ prop.pagination.totalRecords }} {{ t('record') }}
    </span>
    <span v-else>{{ prop.pagination.currentPage }} {{ t('of') }} {{ prop.pagination.totalPages }} </span>
    <button
      class="w-6rem"
      :disabled="prop.pagination.nextPag === prop.pagination.totalPages + 1 || prop.pagination.totalPages === 1"
      @click="nextPage"
    >
      {{ t('next') }}
    </button>
    <select v-if="!isMobile" v-model="prop.pagination.itemsPage" @change="updateItemsPage">
      <option selected value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useMediaQuery } from '../composables/useMediaQuery'

const prop = defineProps(['pagination'])
const emit = defineEmits(['nextPage', 'prevPage', 'updateItemsPage'])
const { t } = useI18n({ useScope: 'global' })

const { isMobile } = useMediaQuery()

const nextPage = () => {
  emit('nextPage')
}

const prevPage = () => {
  if (prop.pagination.currentPage > 1) {
    emit('prevPage')
  }
}

const updateItemsPage = event => {
  const updatedItemsPage = event.target.value
  emit('updateItemsPage', updatedItemsPage)
}
</script>
<style lang="scss" scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  border: none;
  background-color: var(--primary-color);
  color: #ffffff;
  padding: 0.5em 1em;
  margin: 0 0.5em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: var(--primary-color);
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: var(--primary-color);
  }
}

span {
  margin: 0 1em;
}

select {
  border: none;
  background-color: var(--primary-color);
  color: #ffffff;
  padding: 0.5em 1em;
  margin: 0 0.5em;
  cursor: pointer;
}
</style>
