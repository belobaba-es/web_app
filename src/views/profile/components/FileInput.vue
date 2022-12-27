<template>
  <div
      class="flex justify-content-between align-items-center p-3 border-round bg-primary cursor-pointer"
      @click="handleClick">
      <span>
          {{ t('filePlaceholder') }}
      </span>
    <span>
      <i class="pi" :class="icon"></i>
      <input
          :id="getIdInput()"
          type="file"
          hidden
          @change="handleUpload($event)"
      />
    </span>
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n';
import {defineProps, ref, computed} from 'vue';
import {ProfileService} from '../services/profile';
import {useToast} from 'primevue/usetoast';

const toast = useToast();

const {t} = useI18n({useScope: 'global'});
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  side: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    required: true
  },
  taxId: {
    type: String,
    required: true
  },
  documentCountry: {
    type: String,
    required: true
  },
  isCompany: {
    type: Boolean,
    default: () => false
  },
});

const loading = ref(false);

const setLoading = (value: boolean) => {
  loading.value = value;
}

const handleClick = () => {
  const input = document.getElementById(getIdInput());
  input?.click();
}

const getIdInput = () => {
  return `${props.label}${props.side}${props.isCompany ? 'yes': 'no'}`
}

const icon = computed(() => {
  return loading.value ? "pi-spin pi-spinner" : "pi-upload"
});

const handleUpload = async (event: any) => {
  const file = event.target.files[0];
  setLoading(true);

  let formData = new FormData();

  formData.append("file", file);
  formData.append("accountId", props.accountId);
  formData.append("isBusinessMember", props.isCompany ? "false" : "true");
  formData.append("isAccountBusiness", "true");
  formData.append("documentSide", props.side);
  formData.append("taxId", props.taxId);
  formData.append("documentCountry", props.documentCountry);
  formData.append("documentType", props.type);

  const newDocumentObject = {
    documentId: "",
    documentSide: props.side,
    label: props.label,
    taxId: props.taxId,
    documentType: props.type,
    file: "",
    isBusinessMember: "true",
    description: props.label,
    documentCountry: props.documentCountry
  }

  const profileService = ProfileService.instance();
  await profileService.updateDocuments(formData)
      .then(response => {
        setLoading(false);
        toast.add({
          severity: 'success',
          summary: t('successfulOperation'),
          detail: t('shareholderDataSuccessSend'),
          life: 3000,
        });

      })
      .catch(error => {
        setLoading(false);
        formData.forEach((value, key) => {
          if (error.response.data[key]) {
            toast.add({
              severity: 'error',
              summary: t('somethingWentWrong'),
              detail: error.response.data[key].message,
              life: 4000,
            })
          }
        })
      });
}
</script>