<template>
    <div>
        <h1 class="text-2xl">{{ t('documents') }}</h1>
    </div>
    <template v-if="isInitFileLoader">
        <div id="websdk"></div>
    </template>
    <template v-else>
        <div class="grid">
            <div class="col-12 md:col-5 flex align-items-center">
                <div>
                    <h2 class="text-5xl mb-5 font-light">{{ t('documentsPersonTitle') }}</h2>
                    <p class="text-3xl">
                        {{ t('documentsPersonText') }}
                    </p>
                    <div class="mt-5">
                        <Button 
                            :label="t('updateDocuments')"
                            class="p-button-raised py-3 px-6 font-bold"
                            icon="pi pi-angle-right"
                            icon-pos="right"
                            @click="initFileLoader"
                            :loading="loadingBtn"
                        />
                    </div>
                </div>
            </div>
            <div class="col-12 md:col-7">
                <img src="../../assets/img/ilustracion@2x.png" class="w-full"/>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { onMounted, ref } from 'vue';
import { useAccount } from '../../composables/useAccount';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });
const isInitFileLoader = ref(false);
const loadingBtn = ref(false);

const initFileLoader = () => {
    loadingBtn.value = true;
    isInitFileLoader.value = true;
    
    setTimeout(() => {
        loadingBtn.value = false;
    }, 5000);

    (globalThis as any).start();
}

const { setDocumentResponseId } = useAccount();

onMounted(() => {
    (window as any).SDK_ID = import.meta.env.VITE_PUBLIC_SDK_ID;
    const tag1 = document.createElement("script");
    const tag2 = document.createElement("script");

    tag1.setAttribute("src", 'https://websdk.socure.com/bundle.js');
    tag1.setAttribute("type", "text/javascript");
    document.head.appendChild(tag1);

    tag2.setAttribute("src", '/documents.js');
    tag2.setAttribute("type", "text/javascript");
    document.head.appendChild(tag2);

    if (typeof window !== undefined) {
      setInterval(() => {
        const documentID = sessionStorage.getItem("noba@documentUuid");
        console.log("noba@documentUuid", documentID);
        setDocumentResponseId(documentID);
      }, 10000);
    }
});
</script>

<style scoped>

</style>