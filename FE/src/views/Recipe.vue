<template>

<div v-show="!is_show">

	<div class="w-1/5 ml-10 collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
		<input type="checkbox" /> 
		<div class="collapse-title text-lg font-medium">
			<p>レシピカテゴリー</p>
		</div>
		<div class="collapse-content"> 
			<ul>
				<li>ごはんもの</li>
				<li>肉のおかず</li>
				<li>野菜のおかず</li>
				<li>スープ・汁物</li>
			</ul>
		</div>
	</div>

	<h2 class="text-2xl font-bold text-center bg-base-300 w-1/4 m-auto rounded-xl">みんなのメニュー</h2>
	<div class="flex flex-row flex-wrap gap-7 m-6">
		<ul v-for="i in ary">
			<li :key="i"><recipe-card @change-show="is_show = !is_show" /></li>
		</ul>
	</div>
</div>

<div v-show="is_show">
  	<recipe-detail @change-show="is_show = !is_show" />
</div>

</template>

<script lang="ts" setup>

import { ref } from "vue";

import RecipeCard from "../templates/RecipeCard.vue";
import RecipeDetail from "../templates/RecipeCardDetail.vue";


const ary = [1,2,3,4]

const is_show = ref<boolean>(false)

</script>