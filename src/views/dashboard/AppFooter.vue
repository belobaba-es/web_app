<template>
	<div class="layout-footer">
		<img alt="Logo" :src="footerImage()" height="20" class="mr-2" />
		by
		<span class="font-medium ml-2">PrimeVue</span>
	</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
	name: "AppFooter",
	methods: {
		footerImage() {
			return this.$appState.darkTheme ? '/images/logo-horizontal.png' : '/images/logo-dark.svg';
		}
	},
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	}
  
})

</script>