<template>
  <div class="col-8">
    <p class="text-3xl font-medium mb-4">{{ t('withdraw') }} / <span class="text-primary">{{ t('fiat') }} </span></p>
    <div class="flex align-items-center">

      <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text"/>
      <span class="text-xl"> Between NOBA Accounts </span>
    </div>
    <Steps :model="items" :readonly="false"/>
    <router-view v-slot="{Component}" :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)"
                 @complete="complete">
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </router-view>

  </div>
</template>

<script setup lang="ts">

import {useI18n} from 'vue-i18n'
import {ref} from 'vue';
import Button from 'primevue/button';
import Steps from 'primevue/steps';
import {useRouter} from "vue-router";
import {useToast} from 'primevue/usetoast';
import {WithdrawForm} from "../types/withdraw";

const router = useRouter();
const toast = useToast();
const {t} = useI18n({useScope: 'global'})


const items = ref([
  {
    label: 'Accounts',
    to: '/withdraw/fiat/noba'
  },
  {
    label: 'Amount',
    to: '/withdraw/fiat/noba/amount'
  },
  {
    label: 'Confirmation',
    to: '/withdraw/fiat/noba/confirmation'
  }
])


const formObject = ref<WithdrawForm | any>({});
//
const nextPage = (event: any) => {
  for (let field in event.formData) {
    formObject.value[field] = event.formData[field];
  }

  router.push(items.value[event.pageIndex + 1].to);
};
const prevPage = (event: any) => {
  router.push(items.value[event.pageIndex - 1].to);
};
//
const complete = () => {
  toast.add({
    severity: 'success',
    summary: 'Order submitted',
    detail: 'Dear, ' + formObject.value.firstname + ' ' + formObject.value.lastname + ' your order completed.'
  });
};

</script>

<style scoped>
.search-btn {
  width: 30% !important;
}
</style>