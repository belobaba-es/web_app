<template>
    <div>
       
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from "vue-router";


const route = useRoute();


onMounted(async () => {

    const data = route.params.data;
    console.log("data is", data);
});

</script>

<style scoped>
</style>