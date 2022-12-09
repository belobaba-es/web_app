<template>
    <h2 class="font-medium">{{t('wallet')}}</h2>
    <CardWallet />
</template>


<script setup lang="ts">
import {useI18n} from "vue-i18n"
import CardWallet from "../../components/CardWallet.vue";

const { t } = useI18n({ useScope: 'global' })

</script>