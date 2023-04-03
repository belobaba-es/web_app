<template>
  <Dialog
    :visible="display"
    @update:visible="emit('update:display', $event)"
    :modal="true"
    closeIcon="pi pi-times-circle"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '35vw' }"
  >
    <template #header>
    </template>
    <div class="formgrid grid mt-3">
      <div class="col-12">
        <span class="text-xl txt-border-bottom mb-2">Some span</span>
      </div>
      <div class="field col-12 mt-4">
      </div>
      <div class="field col-12" style="display: grid">
        <label for="name">Some info</label>

      </div>
    </div>

    <template #footer>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>

</script>

<style lang="css"></style>