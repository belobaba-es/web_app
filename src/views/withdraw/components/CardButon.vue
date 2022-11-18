<template>
    <div class="card"  @click="toRoute">
        <p class="text-lg font-medium">{{label}}</p>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, computed } from 'vue';
import RouteLocationRaw from 'vue-router'
import { useRouter } from "vue-router";
const props = defineProps({
    icon: String,
    label: String,
    to:  String
})
const router = useRouter();
const toRoute = () => {
    if(props.to){
        router.push({path: props.to})
    }
} 

</script>

<style scoped>
    .card{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0.5rem;
        border: 1px solid #00BEB0;
        background: #F7FDFD 0% 0% no-repeat padding-box;
        min-width: 280px;
        min-height: 60px;
    }
    .card > div{
        height: 80px;
        margin-bottom: 1rem;
    }

    .card > div >img {
        margin: auto;
    }

    
</style>