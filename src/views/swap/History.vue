<template>
    <PageLayout :title="t('swap')">
    
    </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '../../components/PageLayout.vue';
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';

const { t } = useI18n({ useScope: 'global' });
const router = useRouter();

</script>

<style scoped>

</style>