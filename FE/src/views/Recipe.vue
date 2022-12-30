<template>

<div class="relative" v-show="!is_show">

	<div class="w-full text-left mt-7 lg:text-center">
		<h2 class="inline text-2xl font-bold text-center w-1/3 lg:w-1/4 ml-3 p-2 py-1 rounded-xl">みんなのレシピ</h2>
	</div>
	
	<!-- レシピカテゴリー -->
	<div v-if="!is_recipe_null" class="absolute top-[-10px] right-5 lg:left-0 z-10 w-1/3 lg:w-1/6 lg:h-auto text-center ml-5 collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
		<input type="checkbox" class="peer" /> 
		<div class=" peer-checked:bg-orange-200 collapse-title text-lg font-medium">
			<p>レシピカテゴリ</p>
		</div>
		<div class="collapse-content"> 
			<ul class="text-left mt-3 text-lg">
				<li @click="get_recipes_by_category(0)" class="border-b border-[#333] cursor-pointer hover:text-orange-500">すべて</li>
				<li @click="get_recipes_by_category(1)" class="border-b border-[#333] cursor-pointer hover:text-orange-500">ごはんもの</li>
				<li @click="get_recipes_by_category(2)" class="border-b border-[#333] cursor-pointer hover:text-orange-500">肉のおかず</li>
				<li @click="get_recipes_by_category(3)" class="border-b border-[#333] cursor-pointer hover:text-orange-500">野菜のおかず</li>
				<li @click="get_recipes_by_category(4)" class="border-b border-[#333] cursor-pointer hover:text-orange-500">スープ・汁物</li>
			</ul>
		</div>
	</div>

	<div v-if="!recipe_store.get_length_recipes" class="mt-10 text-center text-2xl">
		<p>データの取得に失敗しました</p>
		<p>もう一度お試しください</p>
	</div>

	<!-- recipe card -->
	<ul class="mt-10 mb-10 flex-row lg:flex lg:flex-wrap lg:gap-10 justify-center items-stretch">
		<li class="mt-5 lg:m-0" v-for="recipe in recipe_store.recipes">
			<!-- :uid ユーザがログインしているか / ログイン済なら"いいね"&"ブックマーク"を許可 -->
			<recipe-card :uid="user_store.get_uid" :recipe="recipe" :is-fav="user_store.is_fav_recipe(recipe.get_postId())"
				@change-show="is_show_change" @toggle-fav="toggle_fav">
			</recipe-card>
		</li>
	</ul>
	
</div>

<!-- recipe detail -->
<div v-if="is_show">
  	<recipe-detail :comments="current_comments" :recipe="current_recipe" :uid="user_store.get_uid"  
		@post-comment="post_comment" @change-show="is_show_change">
	</recipe-detail>
</div>

</template>

<script lang="ts" setup>

import { ref, onMounted } from "vue";
import { useRecipeStore } from "../store/recipeStore";
import { useUserStore } from "../store/userStore";
import { Comment } from "../models/Types";

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


const is_show = ref<boolean>(false);
const current_recipe = ref<object>({});
const current_comments = ref<Array<Comment>>([]);

/**
 * レシピカード / レシピ詳細の切り替え
 * @param post_id
 */
const is_show_change = (post_id: number) => {
	is_show.value = !is_show.value;
	
	if ( post_id ) {
		current_recipe.value = recipe_store.find_one_recipe(post_id);
		current_comments.value = recipe_store.find_recipe_comments(post_id);
	}
};


const toggle_fav = async (postId: number, is_fav: boolean) => {
	await recipe_store.toggle_fav(user_store.get_uid, postId, is_fav)
	.then( res => {
		user_store.user_toggle_favs(postId, is_fav);
	})
	.catch( e => console.log("いいね失敗"));
}


const post_comment = ( post_id: number, comment: string ) => {
	recipe_store.post_comment(user_store.get_uid, user_store.get_user_name, post_id, comment);
}


const is_recipe_null = ref<boolean>(true);

const get_recipes_by_category = async ( category_id: number ) => {
	if( category_id !== 0 ) {
		await recipe_store.get_recipes_by_category(category_id)
		.then( (res :boolean) => is_recipe_null.value = res )
		.catch( (err: boolean) => is_recipe_null.value = err );
	} else {
		await recipe_store.get_all_recipes()
		.then( (res :boolean) => is_recipe_null.value = res )
		.catch( (err: boolean) => is_recipe_null.value = err );
	}
}


/**
 * レシピの初期化
 * @return res false
 * @return err true
 */
onMounted( async () => {
	await recipe_store.get_all_recipes()
	.then((res) => {
		is_recipe_null.value = res;	
	}).catch((err) => {
		is_recipe_null.value = err;	
	});
})

</script>