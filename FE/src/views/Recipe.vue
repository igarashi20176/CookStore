<template>

<div v-show="!is_show">

	<!-- レシピカテゴリー -->
	<div class="w-1/3 lg:w-1/5 ml-5 collapse collapse-arrow border border-base-300 bg-base-100 rounded-box" v-if="!is_recipe_null">
		<input type="checkbox" class="peer" /> 
		<div class="peer-checked:bg-orange-200 collapse-title text-lg font-medium">
			<p>レシピカテゴリ</p>
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

	<h2 class="mt-5 text-2xl font-bold text-center bg-base-300 py-1 w-1/3 lg:w-1/4 m-auto rounded-xl">みんなのレシピ</h2>

	<div v-if="is_recipe_null" class="mt-10 text-center text-2xl">
		<p>データの取得に失敗しました</p>
		<p>もう一度お試しください</p>
	</div>

	<!-- recipe card -->
	<ul class="mt-10 mb-10 flex-row lg:flex lg:flex-wrap lg:gap-10 justify-center items-stretch">
		<li class="mt-5 lg:m-0" v-for="recipe in recipe_store.recipes">
			<!-- loginの可否でいいね&ブックマークボタンを非活性 -->
			<recipe-card v-if="user_store.is_user_login" :is-login="true" :recipe="recipe" :is-fav="user_store.is_fav_recipe(recipe.get_postId())"
				@change-show="is_show_change" @toggle-fav="(postId: string) => recipe_store.toggle_fav(user_store.get_uid, postId)">
			</recipe-card>
			<recipe-card v-else :recipe="recipe" :is-fav="false" :is-login="user_store.is_user_login"
				@change-show="is_show_change" @toggle-fav="(postId: string) => recipe_store.toggle_fav(user_store.get_uid, postId)">
			</recipe-card>
		</li>
	</ul>
</div>

<!-- recipe detail -->
<div v-if="is_show">
  	<recipe-detail :recipe="recipe_store.get_one_recipe(current_recipe)" @change-show="is_show_change" />
</div>

</template>

<script lang="ts" setup>

import { ref, onMounted } from "vue";
import { useRecipeStore } from "../store/recipeStore";
import { useUserStore } from "../store/userStore";

/**
 * components
 */
import RecipeCard from "../templates/RecipeCard.vue";
import RecipeDetail from "../templates/RecipeCardDetail.vue";

/**
 * Pinia store init
 */
const user_store = useUserStore();
const recipe_store = useRecipeStore();


const is_recipe_null = ref<boolean>(false);

/**
 * 概要一覧と詳細のview切り替え
 * @param postId // 切り替えしたいレシピのID
 */

const is_show = ref<boolean>(false);
const current_recipe = ref<number>(0)

const is_show_change = (post_id: number) => {
	is_show.value = !is_show.value;
	
	if ( post_id ) {
		current_recipe.value = recipe_store.find_one_recipe_index(post_id)
	}
};

onMounted( async () => {
	await recipe_store.get_from_database_recipes()
	.then((result) => {
		is_recipe_null.value = result;	
	}).catch((err) => {
		is_recipe_null.value = err;	
	});
})

</script>