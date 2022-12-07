<template>
  <div class="grid p-fluid">
    <div class="col-12 md:col-8">
     <span class="p-input-icon-left flex p-fluid">
      <i class="pi pi-search"/>
      <InputText
          type="text"
          class="b-gray w-75"
          v-model="search"
          :placeholder="t('searchBeneficiaryLabel')"
      />
      <Button
          class="p-button search-btn w-25"
          :label="t('search')"
          @click="onSearch"
          :loading="submitting"
      />
    </span>
    </div>
    <div class="col-4">
      <RouterLink to="/withdraw/crypto/other/add-beneficiary" class="p-button">
        {{ t('addNewBeneficiary') }}
      </RouterLink>
    </div>
  </div>


</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button'
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {useToast} from "primevue/usetoast";

const toast = useToast();
const emit = defineEmits(['listBeneficiaries'])
const {t} = useI18n({useScope: 'global'})
const search = ref('')
const submitting = ref(false);

const onSearch = () => {
  if (search.value.trim() === "") {
    toast.add({
      severity: 'warn',
      summary: 'please write an text',
      life: 4000,
    })
    return
  }
  submitting.value = true;
}

</script>

<style scoped>
.p-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
