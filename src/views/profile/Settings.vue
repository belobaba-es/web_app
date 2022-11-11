<template>
    <div class="pt-5">
        <h1 class="text-2xl">Cambiar contraseña</h1>
    </div>
    <div class="grid">
        <div class="col-6">
            <div class="border-1 border-gray-300 p-4 border-round">
                <div class="field">
                    <label>Escribe te contraseña actual</label>
                    <div class="p-inputgroup">
                        <InputText :type="inputPasswordType" v-model="currentPassword" />
                        <span class="p-inputgroup-addon cursor-pointer" @click="toggleShowPassword">
                            <i :class="eyeIconState"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <label>Nueva contraseña</label>
                    <div class="p-inputgroup">
                        <InputText :type="inputPasswordType" v-model="newPassword" />
                        <span class="p-inputgroup-addon cursor-pointer" @click="toggleShowPassword">
                            <i :class="eyeIconState"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <label>Confirmar nueva contraseña</label>
                    <div class="p-inputgroup">
                        <InputText :type="inputPasswordType" v-model="confirmNewPassword" />
                        <span class="p-inputgroup-addon cursor-pointer" @click="toggleShowPassword">
                            <i :class="eyeIconState"></i>
                        </span>
                    </div>
                </div>
                <div class="field flex justify-content-end">
                    <Button label="Guardar" class="px-5"/>
                </div>
            </div>
        </div>
    </div>
    
    <div class="grid">
        <div class="col-6">
            <div class="border-1 border-gray-300 p-4 border-round">
                <p>{{t('languageSelector')}}</p>
                <SelectButton  v-model="languageSelected" :options="languages" aria-labelledby="single" optionLabel="name" @change="changeLang"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n'

interface LangSelect {
    name: string;
    code: string
}

interface ChangeEvent<T> {
    value: T
}
const { t, locale } = useI18n({
      useScope: 'global'
})

const changeLang = (event: ChangeEvent<LangSelect>) => {
    locale.value = event.value.code;
}

const currentPassword = ref<string>('');
const newPassword = ref<string>('');
const confirmNewPassword = ref<string>('');
const showPassword = ref<boolean>(false);
const languages = ref<LangSelect[]>([{name: 'ESP', code:'es'}, {name: 'EN', code:'en'}]);
const languageSelected = ref<LangSelect>({name: 'EN', code:'en'});

const toggleShowPassword = () => {
    showPassword.value = !showPassword.value
}

const eyeIconState = computed(() => showPassword.value ? 'pi pi-eye-slash' : 'pi pi-eye');
const inputPasswordType = computed(() => showPassword.value ? 'text' : 'password');

</script>

<style lang="css" scoped>
.p-button, .p-button:hover {
    background: var(--primary-color);
    border: 1px solid var(--primary-color);
}
.p-selectbutton .p-button.p-highlight {
    background: #E7E6E7;
    border-color: #E7E6E7;
    color: #1B1B19;
    font-weight: 600;
}
.p-selectbutton .p-button.p-highlight:hover {
    background: #E7E6E7;
    border-color: #E7E6E7;
    color: #1B1B19;
    font-weight: 600;
}
</style>