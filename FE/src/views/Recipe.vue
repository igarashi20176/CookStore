<template>

<div v-show="!is_show && !isRecipeNull">

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
	<div class="flex flex-row flex-wrap gap-7 m-7">
		<ul v-for="recipe, i in recipeStore.recipes">
			<li :key="i"><recipe-card :recipe="recipe" @change-show="is_show_change" /></li>
		</ul>
	</div>
</div>

<div v-if="is_show">
  	<recipe-detail :recipe="recipeStore.get_one_recipe(current_recipe)" @change-show="is_show_change" />
</div>

<div v-if="isRecipeNull">
	<h3 class="text-2xl font-bold text-center">レシピの取得に失敗しました</h3>
</div>

</template>

<script lang="ts" setup>

import { ref, onMounted } from "vue";
import { useRecipeStore } from "../store";


/**
 * components
 */
import RecipeCard from "../templates/RecipeCard.vue";
import RecipeDetail from "../templates/RecipeCardDetail.vue";


const recipeStore = useRecipeStore();
const isRecipeNull = ref<boolean>(false)


const is_show = ref<boolean>(false);
const current_recipe = ref<number>(0)

const is_show_change = (postId: number) => {
	is_show.value = !is_show.value;
	
	if ( postId ) {
		current_recipe.value = recipeStore.find_one_recipe_index(postId)
	}
};

onMounted( async () => {
	await recipeStore.get_Database_recipes();
	isRecipeNull.value = recipeStore.get_length_recipes > 0 ? false : true;
})

</script>