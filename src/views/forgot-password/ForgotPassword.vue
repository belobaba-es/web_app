<template>
    <div class="container-center">
        <img :src="logo" alt="logo" />
    </div>
    <div class="container-main">
        <div class="lg:bg-contain container">
            <h1 class="font-extra-light text-center">{{ t('forgotPasswordTitle') }}</h1>
            <p class="font-extra-light text-center">{{ t('forgotPasswordSubtitle') }}</p>
            <div class="pt-5">
                <form @submit.prevent="handleSubmit" class="checkout-form">
                    <div class="field">
                        <label class="font-light">{{ t('emailLabel') }}</label>
                        <div class="p-inputgroup">
                            <InputText type="text" v-model="form.email" :placeholder="t('emailPlaceholder')" />
                        </div>
                    </div>
                    <div class="container-flex mt-lg-2">
                        <div class="float-left w-25">
                            <Button type="button" icon="pi pi-angle-left" :label="t('backButtonTitle')"
                                class="font-light w-100 border-300 p-button-outlined" @click="router.push('/')" />
                        </div>
                        <div class="float-right w-25">
                            <Button type="submit" icon="pi pi-angle-right" iconPos="right" :label="t('forgotPasswordButton')"
                                class="font-light w-100" :loading="submitting" />
                        </div>
                    </div>
                </form>
            </div>
            <Button type="button" :label="t('alreadyAccount')" class="font-light mt-4 p-button-outlined border-300" @click="router.push('/')" />
        </div>
        <div class="container-center">
            <div>
                <Lang />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import logo from '../../assets/img/logo.svg'
import Lang from '../../components/Lang.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { useToast } from "primevue/usetoast";
import { ForgotPasswordService } from './services/forgot-password';

const submitting = ref(false);
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })

const form = reactive({
    email: ''
})

const router = useRouter()

const userStore = useUserStore()

const forgotPasswordService = ForgotPasswordService.instance()

const handleSubmit = () => {
    submitting.value = true
    forgotPasswordService.sendEmail(form.email).then((response) => {
        submitting.value = false;
        toast.add({
            severity: 'success',
            summary: t('successfulOperation'),
            life: 4000,
            detail: response.message
        });
        router.push('/');
    });
}
</script>
  
<style lang="css" scoped>
.container-main {
    max-width: 668px;
    margin: 0 auto;
    padding: 0 3rem 3rem;
}

.container {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    background: white;
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: 0px 0px 60px rgb(0 0 0 / 5%);
}
</style>
  