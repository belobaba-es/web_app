<template>
  <div v-if="!twoFactorIsActive" class="container-center mt-5">
    <div class="border-2 border-green-200" style="border-radius: 10px">
      <h2 class="text-center">{{ t('downloadYourRecoveryCodes') }}</h2>
      <div class="p-5">
        {{ t('textDownloadRecoveryCodes') }}

        <Message class="mt-5 mb-5" :closable="false">
          <b class="font-semi-bold">{{ t('alertRecoveryCodes') }}</b> <br />
          {{ t('alertDetailRecoveryCodes') }}
        </Message>

        <div class="codes bg-gray-100 mt-5 mb-5">
          <div class="grid text-center">
            <div class="col-6 font-semi-bold" style="font-size: 11pt" v-for="(code, index) in code_recovery">{{ code }}</div>
          </div>
        </div>
        <Button
            class="float-right mb-5"
            :label="t('download')"
            icon="pi pi-download" icon-pos="right"
            :loading="submitting"
            @click="downloadCodeRecoveryTxtFile(code_recovery)"
        />
        <Divider />

        <Button
            :label="t('cancel')"
            outlined class="mb-5"
            icon="pi pi-angle-left"
            :loading="submitting"
            @click="cancel()"
        />

        <ConfirmPopup group="demo">
          <template #message="slotProps">
            <div class="flex p-4">
              <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
              <p class="pl-2">{{ slotProps.message.message }}</p>
            </div>
          </template>
        </ConfirmPopup>

        <Button
            class="float-right mb-5"
            @click="showTemplate($event)"
            icon="pi pi-check" :label="t('activeTwoFactor')"
            :loading="submitting" />
      </div>
    </div>
  </div>

  <TwoFactorActiveSuccess v-if="twoFactorIsActive" />
</template>
<script setup lang="ts">
import Message from 'primevue/message'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import ConfirmPopup from 'primevue/confirmpopup'
import { useI18n } from 'vue-i18n'
import { useTwoFactorAuth } from '../../../../composables/useTwoFactorAuth'
import {onUnmounted, ref} from "vue";
import {Asset, PaymentAddress} from "../../../deposit/types/asset.interface";
import {useRouter} from "vue-router";
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";
import TwoFactorActiveSuccess from "./TwoFactorActiveSuccess.vue";

const props = defineProps<{
  code_recovery: string[]
}>()

const router = useRouter();

const { submitting, activeTwoFactor, downloadCodeRecoveryTxtFile } = useTwoFactorAuth()

const twoFactorIsActive  = ref(false)

const { t } = useI18n({
  useScope: 'global',
})

const confirm = useConfirm();
const toast = useToast();

const cancel = () => {
  router.push('/profile');
}

const showTemplate = (event: any) => {
  confirm.require({
    target: event.currentTarget,
    group: 'demo',
    message: t('savedRecoveryCodes'),
    icon: 'pi pi-question-circle',
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    accept: async() => {
      twoFactorIsActive.value = await activeTwoFactor()
    },
    reject: () => {
      toast.add({severity:'warn', detail: t('recommendationSaveCodeRecovery'), life: 6000});
    }
  });
}

</script>

<style scoped></style>
