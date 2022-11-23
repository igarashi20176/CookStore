<template>

<!-- カード -->
<div class="relative m-auto p-5 rounded-2xl" v-if="!is_show">
	<h2 class="text-center text-2xl p-1 rounded-md">みんなの献立</h2>
	<ul class="flex-row lg:flex flex-wrap lg:gap-5 justify-center">
		<li class="w-[calc(33.3%-1.25rem)] m-5" v-for="menu in menu_store.menus">
			<menu-card :menu="menu" @change-view="is_show_change" />
		</li>
	</ul>
</div>

<div v-if="is_show">
	<menu-card-detail :menu="menu_store.get_one_menu(current_menu)" @change-view="is_show_change" />
</div>

</template>

<script lang="ts" setup>

import { ref } from "vue";
import { useMenuStore } from "../store/menuStore";

/**
 * Components
 */
import MenuCard from "../templates/MenuCard.vue";
import MenuCardDetail from "../templates/MenuCardDetail.vue";


const menu_store = useMenuStore();
// メニューの取得
menu_store.get_database_menus();


const is_show = ref<boolean>(false);
const current_menu = ref<number>(0);

const is_show_change = (post_id: number) => {
	is_show.value = !is_show.value;
	
	if ( post_id ) {
		current_menu.value = menu_store.find_one_menu_index(post_id);
	}
};

</script>