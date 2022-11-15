<template>
    <div class="pt-5">
        <h1 class="text-2xl">Datos accionistas</h1>
    </div>
    <div class="formgrid grid">
        <div v-if="!isNaturalAccount" class="field col-4">
            <label>Nombre</label>
            <InputText 
                type="text" 
                v-model="generalData.name" 
                class="w-full" 
            />
        </div>
        <div v-if="isNaturalAccount" class="field col-4">
            <label>First Name</label>
            <InputText 
                type="text" 
                v-model="generalData.firstName" 
                class="w-full" 
            />
        </div>
        <div v-if="isNaturalAccount" class="field col-4">
            <label>Middle Name</label>
            <InputText 
                type="text" 
                v-model="generalData.middleName" 
                class="w-full" 
            />
        </div>
        <div v-if="isNaturalAccount" class="field col-4">
            <label>Last Name</label>
            <InputText 
                type="text" 
                v-model="generalData.lastName" 
                class="w-full" 
            />
        </div>
        <div class="field col-4">
            <label>Email</label>
            <InputText 
                type="text" 
                v-model="generalData.email" 
                class="w-full" 
            />
        </div>
        <div class="field col-4">
            <label>Teléfono</label>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    {{ phone.phoneCountry }}
                </span>
                <InputText 
                    id="phoneNumber" 
                    type="text" 
                    class="w-full" 
                    v-model="phone.phoneNumber"
                />
            </div>
        </div>
        <div class="field col-4">
            <label>Pais</label>
            <Dropdown 
                v-model="address.country" 
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
                v-model="address.region" 
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
                v-model="address.city" 
                class="w-full" 
            />
        </div>
        <div class="field col-6">
            <label>Direccion 1</label>
            <InputText 
                type="text" 
                v-model="address.streetOne" 
                class="w-full" 
            />
        </div>
        <div class="field col-6">
            <label>Direccion 2</label>
            <InputText 
                type="text" 
                v-model="address.streetTwo" 
                class="w-full" 
            />
        </div>
        <div class="field col-12 flex align-items-center">
            <Button label="Guardar" class="px-5"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ProfileService } from './services/profile';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { GeneralData } from './types/general-data.interface';

const route = useRoute();
const countries = ref([]);
const states = ref([])

const generalData = ref<GeneralData>({
    email: '',
    name: undefined,
    lastName: undefined,
    middleName: undefined,
    firstName: undefined,
})

const address = ref({
    streetOne: "",
    streetTwo: "",
    city: "",
    country: "",
    postalCode: "",
    region: ""
})

const phone = ref({
    phoneNumber: "4249123703",
    phoneCountry: "+58"
})

const isNaturalAccount = computed<boolean>(() => false);

const profileService = ProfileService.instance();

onMounted(async () => {
    profileService.getAccountByID(route.params.id).then(data => console.log(data));
});

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
.p-inputtext {
    box-sizing: border-box;
}
</style>