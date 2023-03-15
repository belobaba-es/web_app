<template>
  <div class="grid p-fluid">
    <div class="col-12 md:col-8">
     <span class="p-input-icon-left flex p-fluid">
      <i class="pi pi-search"/>
      <InputText
          type="text"
          class="b-gray"
          v-model="search"
          :placeholder="t('nobaBeneficiaryEmail')"
      />
      <Button
          class="p-button search-btn"
          :label="t('search')"
          @click="onSearch"
          :loading="submitting"
      />
    </span>
    </div>
  </div>


</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button'
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import {useToast} from "primevue/usetoast";
import {AccountService} from "../../services/account";

const toast = useToast();
const emit = defineEmits(['listBeneficiaries'])
let accountService:AccountService
const {t} = useI18n({useScope: 'global'})
const search = ref('')
const submitting = ref(false);

onMounted(() => {
  accountService = AccountService.instance()
})

const onSearch = () => {
  if (search.value.trim() === "") {
    toast.add({
      severity: 'warn',
      summary: 'please write an email',
      life: 4000,
    })
    return
  }
  submitting.value = true
  accountService.getAccountByEmail(search.value.toLowerCase()).then(resp => {
    emit('listBeneficiaries', [resp])
    submitting.value = false
  }).catch(error => {
    submitting.value = false
    toast.add({
      severity: 'error',
      summary: t('somethingWentWrong'),
      detail: error.response.data.message,
      life: 4000,
    })
  })
}

</script>

<style scoped>
.p-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
