<template>
    <div class="grid">
        <div class="col-12 md:col-4 flex align-items-center">
            <div>
                <h2 class="text-5xl mb-5 font-light">Verify Documents</h2>
                <p class="text-3xl">
                    We are going to start with the document upload process for verification
                </p>
                <div class="mt-5">
                    <Button 
                        label="UPDATE DOCUMENTS" 
                        class="p-button-raised py-3 px-6 font-bold"
                        icon="pi pi-angle-right"
                        icon-pos="right"
                    />
                </div>
            </div>
        </div>
        <div class="col-12 md:col-6">
            <img src="../../../assets/img/ilustracion@2x.png" class="w-full"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
</script>

<style scoped>

</style>