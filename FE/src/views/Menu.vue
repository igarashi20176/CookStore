<template>

<!-- カード -->
<div class="relative m-auto p-5 rounded-2xl" v-if="!is_show">
	<!-- title -->
	<h2 class="mt-5 text-2xl font-bold text-center bg-base-300 py-1 w-1/3 lg:w-1/4 m-auto rounded-xl">みんなの献立</h2>

	<div v-if="is_null_menus" class="mt-10 text-center text-2xl">
		<p>データの取得に失敗しました</p>
		<p>もう一度お試しください</p>
	</div>

	<!-- Menu List -->
	<ul class="flex-row lg:flex flex-wrap lg:gap-5 justify-center">
		<li class="w-[calc(33.3%-1.25rem)] m-5" v-for="menu in menu_store.menus">
			<menu-card :menu="menu" @change-view="is_show_change" />
		</li>
	</ul>
</div>

<!-- Menu Detail -->
<div v-if="is_show">
	<menu-card-detail :menu="menu_store.get_one_menu(current_menu)" @change-view="is_show_change" />
</div>

</template>

<script lang="ts" setup>

import { onMounted, ref } from "vue";
import { useMenuStore } from "../store/menuStore";

/**
 * Components
 */
import MenuCard from "../templates/MenuCard.vue";
import MenuCardDetail from "../templates/MenuCardDetail.vue";

/**
 * Pinia store
 */
const menu_store = useMenuStore();


/**
 * ListとDetailの切り替え
 */
const is_show = ref<boolean>(false);
const current_menu = ref<number>(0);

const is_show_change = (post_id: number) => {
	is_show.value = !is_show.value;
	
	if ( post_id ) {
		current_menu.value = menu_store.find_one_menu_index(post_id);
	}
};


/**
 * 取得したメニューが空かどうかを判定
 */
const is_null_menus = ref<boolean>(false);

onMounted( async () => {
	await menu_store.get_from_database_menus()
	.then((result) => {
		is_null_menus.value = result;
	}).catch((err) => {
		is_null_menus.value = err;
	});
});

</script>