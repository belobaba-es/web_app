<template>
	<div class="layout-menu-container">
		<AppSubmenu 
			:items="model" 
			class="layout-menu" 
			:root="true" 
			@menuitem-click="onMenuItemClick" @keydown="onKeyDown" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSubmenu from './AppSubmenu.vue';

export default defineComponent({
  props: {
    model: Array,
  },
  components: {
	'AppSubmenu': AppSubmenu
  },
	emits: {
		'menuitem-click': (payload: any) => {
			return payload
		}
	},
  setup (props,{emit}) {
	console.log('propierties',props)
	const onMenuItemClick = (payload: any) => {
		emit('menuitem-click', payload);
	}

	const onKeyDown = (event: Event) =>{
		const nodeElement = event.target;
		if (event.code === 'Enter' || event.code === 'Space') {
			nodeElement.click();
			event.preventDefault();
		}
	}

		return {
			onMenuItemClick,
			onKeyDown
		}
	},
//   methods:{
// 	onMenuItemClick(event) {
// 		this.$emit('menuitem-click', event);
// 	},
// 	onKeyDown(event) {
// 		const nodeElement = event.target;
// 		if (event.code === 'Enter' || event.code === 'Space') {
// 			nodeElement.click();
// 			event.preventDefault();
// 		}
// 	},
// 	bannerImage() {
// 		return this.$appState.darkTheme ? '/images/banner-primeblocks-dark.png' : '/images/banner-primeblocks.png';
// 	}
//   },
//   computed: {
// 		// darkTheme() {
// 		// 	return this.$appState.darkTheme;
// 		// }
// 	},
})


</script>