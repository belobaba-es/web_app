<template>
	<ul v-if="items">
		<template v-for="(item,i) of items">
			<li v-if="visible(item) && !item.separator" :key="i" :class="[{'layout-menuitem-category': root, 'active-menuitem': activeIndex === i && !item.to && !item.disabled}]" role="none">
				<template v-if="root">
					<div class="layout-menuitem-root-text" >{{item.label}}</div>
					<app-submenu :items="visible(item) && item.items" @menuitem-click="$emit('menuitem-click', $event)"></app-submenu>
				</template>
				<template v-else>
					<router-link v-if="item.to" :to="item.to" :class="[item.class, 'p-ripple', {'p-disabled': item.disabled}]" :style="item.style" @click="onMenuItemClick($event,item,i)" :target="item.target" :aria-label="item.label" exact role="menuitem" v-ripple>
						<i :class="item.icon"></i>
						<span>{{item.label}} </span>
						<i v-if="item.items" class="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>
						<!-- <Badge v-if="item.badge" :value="item.badge"></Badge> -->
					</router-link>
					<a v-if="!item.to" :href="item.url||'#'" :style="item.style" :class="[item.class, 'p-ripple', {'p-disabled': item.disabled}]" @click="onMenuItemClick($event,item,i)" :target="item.target"  role="menuitem" v-ripple>
						<i :class="item.icon"></i>
						<span>{{item.label}}</span>
						<i v-if="item.items" class="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>
						<!-- <Badge v-if="item.badge" :value="item.badge"></Badge> -->
					</a>
					<transition name="layout-submenu-wrapper">
						<app-submenu v-show="activeIndex === i" :items="visible(item) && item.items" @menuitem-click="$emit('menuitem-click', $event)"></app-submenu>
					</transition>
				</template>
			</li>
			<li class="p-menu-separator" :style="item.style" v-if="visible(item) && item.separator" :key="'separator' + i" role="separator"></li>
		</template>
	</ul>
</template>

<script lang="ts" setup>
// import Badge from 'primevue/badge';
import { ref, defineProps } from 'vue';

defineProps({
	items: Array<any>,
	root: {
		type: Boolean,
		default: false
	}
})



const emit = defineEmits(['menuitem-click']);

const activeIndex = ref<number | null>(null)

const onMenuItemClick = (event: any, item:any, index: number) => {
	if (item.disabled) {
		event.preventDefault();
		return;
	}

	if (!item.to && !item.url) {
		event.preventDefault();
	}

	//execute command
	// if (item.command) {
	// 	item.command({originalEvent: event, item: item});
	// }

	activeIndex.value = index === activeIndex.value ? null : index;

	emit('menuitem-click', {
		originalEvent: event,
		item: item
	});
}

// const onKeyDown = (event: Event) =>{
// 	const nodeElement = event.target;
// 	if (event.code === 'Enter' || event.code === 'Space') {
// 		nodeElement.click();
// 		event.preventDefault();
// 	}
// }

const visible = (item:any)=> {
	return (typeof item.visible === 'function' ? item.visible() : item.visible !== false);
}


</script>
