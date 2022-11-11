<template>
    <div class="pt-5">
        <h1 class="text-2xl">Documentos</h1>
    </div>
    <div class="border-2 border-200 border-solid p-3">
        <div class="grid">
            <div class="col-2">
                <div class="p-5 flex-column border-2 border-200 border-solid surface-100 cursor-pointer">
                    <div class="flex justify-content-center mb-3">
                        <img src="../../assets/icons/icon-document.svg" alt="" srcset="">
                    </div>
                    <div class="flex justify-content-center">
                        <span>Archivo_1.jpg</span>
                    </div>
                    <div class="flex justify-content-center">

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-5">
        <Button label="Actualizar Documentos" />
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
</script>

<style scoped>

</style>