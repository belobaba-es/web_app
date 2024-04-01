<template>
  <ListShareholders v-show="!isShowAddNewShareholder" />
  <AddNewShareHolder v-show="isShowAddNewShareholder" />
</template>

<script lang="ts" setup>
import AddNewShareHolder from './AddOrEditShareholder.vue'
import ListShareholders from './ListShareholders.vue'

import { useShareholder } from '../../../composables/useShareholder'

const { partner, isShowAddNewShareholder } = useShareholder()
</script>
<style lang="scss"></style>
