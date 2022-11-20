<template>

<div v-show="!is_show">

	<div class="w-1/5 ml-10 collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
		<input type="checkbox" class="peer" /> 
		<div class="peer-checked:bg-orange-200 collapse-title text-lg font-medium">
			<p>レシピカテゴリー</p>
		</div>
		<div class="collapse-content"> 
			<ul class="mt-3 text-lg">
				<li class="border-b border-[#333] cursor-pointer hover:text-orange-500">ごはんもの</li>
				<li class="border-b border-[#333] cursor-pointer hover:text-orange-500">肉のおかず</li>
				<li class="border-b border-[#333] cursor-pointer hover:text-orange-500">野菜のおかず</li>
				<li class="border-b border-[#333] cursor-pointer hover:text-orange-500">スープ・汁物</li>
			</ul>
		</div>
	</div>

	<h2 class="text-2xl font-bold text-center bg-base-300 w-1/4 m-auto rounded-xl">みんなのメニュー</h2>
	<div v-if="is_recipe_null" class="mt-10 text-center text-2xl">
		<p>データの取得に失敗しました</p>
		<p>もう一度お試しください</p>
	</div>
	<div v-else class="flex flex-row flex-wrap gap-7 m-7">
		<ul v-for="recipe, i in recipe_store.recipes">
			<li :key="i"><recipe-card :recipe="recipe" @change-show="is_show_change" /></li>
		</ul>
	</div>
</div>

<div v-if="is_show">
  	<recipe-detail :recipe="recipe_store.get_one_recipe(current_recipe)" @change-show="is_show_change" />
</div>

</template>

<script lang="ts" setup>

import { ref, computed, onMounted } from "vue";
import { useRecipeStore } from "../store";


/**
 * components
 */
import RecipeCard from "../templates/RecipeCard.vue";
import RecipeDetail from "../templates/RecipeCardDetail.vue";


const recipe_store = useRecipeStore();
// レシピの取得
recipe_store.get_database_recipes();


const is_show = ref<boolean>(false);
const current_recipe = ref<number>(0)


/**
 * 概要一覧と詳細のview切り替え
 * @param postId // レシピのID
 */
const is_show_change = (post_id: number) => {
	is_show.value = !is_show.value;
	
	if ( post_id ) {
		current_recipe.value = recipe_store.find_one_recipe_index(post_id)
	}
};

const is_recipe_null = computed(() => {
	return recipe_store.get_length_recipes === 0 ? true : false;
});

</script>