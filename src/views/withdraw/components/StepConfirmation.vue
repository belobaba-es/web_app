<template>
    <div class="formgrid grid ">
        <div class="col-12">
            <span class="mt-4">{{t('Confirm wire information')}}</span>
            
            <Divider></Divider>
            
        </div>
        <div>
            <p class="">{{'name'}}</p>
            <p class="font-ligth text-base" >{{'email'}}</p>
            <p class="font-ligth text-base">{{'account'}}</p>
        </div>
        <Divider></Divider>
        
        <div class="col-12 field p-fluid">
            <div class="flex col-6 justify-content-end">

                <span class="text-left">Current balance: 524.95 USD</span>
            </div>
            <div class="field col-12">
                <label for="name1">{{t('Amount')}}</label>
                <p>{{'25'}}</p>
            </div>
            <div class="field col-12">
                <label for="name1">{{t('fee')}}</label>
                <p>{{'25'}}</p>
            </div>
        </div>
        
        
        <div class="col-12 field p-fluid">
            <div class="col-6">
                <p class="text-base">Your are sending to Alberto Rodriguez</p>
                
            </div>
        </div>
        <div class="col-12">
            <span>{{t('The wire will take 24 hours.')}}</span>
            <p>
                {{'250'}}
            </p>
        </div>

        <Button class="p-button search-btn" :label="t('continue')" @click=""/>
    </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from "vue-router";
import Timeline from 'primevue/timeline';
import Button from 'primevue/button';

const { t } = useI18n({ useScope: 'global' })
const route = useRoute();
const amount = ref('')
const events = ref([
            {amount: '3,5', label: 'Fee'},
            {amount: '2,5', label: 'You send to Alberto Rodriguez',},
        ]);
        const events2 = ref([
            "2020", "2021", "2022", "2023"
        ]);
onMounted(async () => {

    const data = route.params.data;
    console.log("data is", data);
});

</script>

<style scoped>
</style>