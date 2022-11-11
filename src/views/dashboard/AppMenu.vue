<template>
	<div class="layout-menu-container">
		<AppSubmenu 
			:items="model" 
			class="layout-menu" 
			:root="true" 
			@menuitem-click="onMenuItemClick" />
	</div>
</template>

<script lang="ts" setup>
import AppSubmenu from './AppSubmenu.vue';
import { MenuItem, MenuItemCommandEvent } from 'primevue/menuitem';
import { defineProps } from 'vue';

defineProps<{
	model: Array<MenuItem>,
}>()

const emit = defineEmits(['menuitem-click']);


const onMenuItemClick = (payload: any) => {
	emit('menuitem-click', payload);
}

// const onKeyDown = (event: Event) =>{
// 	const nodeElement = event.target;
// 	if (event.code === 'Enter' || event.code === 'Space') {
// 		nodeElement.click();
// 		event.preventDefault();
// 	}
// }


</script>
