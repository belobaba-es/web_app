<template>
    <Dialog
      :visible="props.showModal"
      :modal="true"
      closeIcon="pi pi-times-circle"
      :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}"
      class="modal-asset-selector"
  >
    <template #header>
      <h3 class="font-medium">{{ t('selectCrypto') }}</h3>
    </template>
    <div class="grid gap-0">
      <div class="col-10">
        <InputText type="text" v-model="search" placeholder="Search" class="w-full" />
      </div>
      <div class="col-2">
        <Button :label="'search'" class="w-full border-noround-left" @click="onSearch"/>
      </div>
    </div>
    <ScrollPanel style="width: 100%; height: 400px" class="custom">
        <div class="grid py-3">
            <div
                v-for="(item) in listAsset"
                class="col-12 grid selectCypto"
                @click="selectedAsset(item)"
            >
                <div class="col-2">
                <img width="26" :src="item.icon"/>
                </div>
                <div class="col-10 text-uppercase">
                <strong class="font-medium">{{ item.code }}</strong> {{ item.name }}
                </div>
            </div>
        </div>
    </ScrollPanel>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { defineProps, ref, onMounted } from 'vue';
import { AssetsService } from '../views/deposit/services/assets';
import { Asset } from '../views/deposit/types/asset.interface';
import { useI18n } from "vue-i18n";
import ScrollPanel from 'primevue/scrollpanel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

interface Props {
    showModal: boolean
}
const {t} = useI18n({useScope: 'global'})
const props = defineProps<Props>();
const emit = defineEmits(['selectedAsset']);

const listAsset = ref<Asset[]>([]);
const search = ref('');
const assetService = AssetsService.instance()

onMounted(async () => {
    await assetService.list().then(data => {
        listAsset.value = data;
    });
});

const selectedAsset = (asset: Asset) => {
  emit('selectedAsset', asset);
}

const onSearch = () => {
  const newArray = listAsset.value.find(asset => asset.name.toLowerCase === search.value.toLowerCase);
  listAsset.value = [];
  if (!newArray) return;
  listAsset.value.push(newArray);
}

</script>

<style scoped>
.selectCypto {
  cursor: pointer;
  border: 1px solid #ccc;
  margin-left: 0.1rem;
  padding: 6px;
  background: #F9F9F9 0% 0% no-repeat padding-box;
  border: 1px solid #ECECEC;
}
.p-dialog.p-component.p-ripple-disabled.modal-asset-selector .p-dialog-content {
    overflow-y: visible !important;
}
</style>