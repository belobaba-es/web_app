<template>
    <div class="pt-5">
        <h1 class="text-2xl">Datos accionistas</h1>
    </div>
    <div class="formgrid grid">
        <div class="field col-8">
            <label>Email</label>
            <InputText 
                type="text" 
                v-model="form.email" 
                class="w-full" 
            />
        </div>
        <div class="field col-4">
            <label>Teléfono</label>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    +58
                </span>
                <InputText 
                    id="phoneNumber" 
                    type="text" 
                    class="w-full" 
                />
            </div>
        </div>
        <div class="field col-4">
            <label>Pais</label>
            <Dropdown 
                v-model="form.country" 
                :options="countries" 
                optionLabel="name" 
                option-value="code"
                placeholder="Seleccione pais"
                class="w-full"
            />
        </div>
        <div class="field col-4">
            <label>Estado</label>
            <Dropdown 
                v-model="form.state" 
                :options="states" 
                optionLabel="name" 
                option-value="code"
                placeholder="Seleccione estado"
                class="w-full"
            />
        </div>
        <div class="field col-4">
            <label>Ciudad</label>
            <InputText 
                type="text" 
                v-model="form.city" 
                class="w-full" 
            />
        </div>
        <div class="field col-6">
            <label>Direccion 1</label>
            <InputText 
                type="text" 
                v-model="form.address1" 
                class="w-full" 
            />
        </div>
        <div class="field col-6">
            <label>Direccion 2</label>
            <InputText 
                type="text" 
                v-model="form.address2" 
                class="w-full" 
            />
        </div>
        <div class="field col-12 flex align-items-center">
            <Checkbox 
                v-model="form.terms" 
                :binary="true" 
                required
                input-id="terms"
            />
            <label for="terms" class="mt-1 ml-3">
                Acepto las <RouterLink to="/" class=" font-medium text-900">condiciones generales</RouterLink> y la <RouterLink to="/" class=" font-medium text-900">política de confidencialidad</RouterLink>
            </label>
        </div>
        <div class="field col-12 flex align-items-center">
            <Button label="Guardar" class="px-5"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const countries = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
])

const states = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
])

const form = ref({
    email: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    address1: '',
    address2: '',
    terms: false
})

</script>

<style scoped>
.p-button, .p-button:hover {
    background: var(--primary-color);
    border: 1px solid var(--primary-color);
}
.p-checkbox .p-checkbox-box.p-highlight {
    border-color: var(--primary-color);
    background: var(--primary-color);
}
</style>