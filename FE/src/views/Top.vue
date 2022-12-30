<template>

<div class="w-[80%] m-auto mt-10" v-if="!is_show">
    <h2 class="text-2xl font-bold text-center w-1/2 :w-1/3 lg:w-1/4 m-auto rounded-xl mb-2"><img class="inline w-[45px]" :src="app_images?.ranking" alt="">人気のメニュー</h2>

    <!-- ランキングカルーセル -->
    <div class="mt-5 carousel w-full h-auto rounded-xl">
        <li class="carousel-item m-0 lg:mx-2" v-for="recipe, i in recipe_store.recipes">
			<!-- :uid ユーザがログインしているか / ログイン済なら"いいね"&"ブックマーク"を許可 -->
			<recipe-card :id="`item${i+1}`" :uid="user_store.get_uid" :recipe="recipe" :is-fav="user_store.is_fav_recipe(recipe.get_postId())"
				@toggle-fav="toggle_fav" @change-show="is_show_change">
			</recipe-card>
		</li>
    </div>

    <div class="flex justify-center w-full py-2 gap-2">
        <a href="#item1" class="btn btn-primary btn-md">1</a> 
        <a href="#item2" class="btn btn-primary btn-md">2</a> 
        <a href="#item3" class="btn btn-primary btn-md">3</a> 
        <a href="#item4" class="btn btn-primary btn-md">4</a>
        <a href="#item5" class="btn btn-primary btn-md">5</a>
    </div>
</div>

<!-- recipe detail -->
<div v-if="is_show">
  	<recipe-detail :comments="current_comments" :recipe="current_recipe" @post-comment="post_comment" @change-show="is_show_change" />
</div>

</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from "vue";
import { Comment, AppImages } from "../models/Types";

import RecipeCard from "../templates/RecipeCard.vue";
import RecipeDetail from "../templates/RecipeCardDetail.vue";

/**
 * Pinia init
 */
import { useUserStore } from "../store/userStore";
import { useRecipeStore } from "../store/recipeStore";

const user_store = useUserStore();
const recipe_store = useRecipeStore()


const app_images: AppImages | undefined = inject("app_images");


const toggle_fav = async (postId: number, is_fav: boolean) => {
    await recipe_store.toggle_fav(user_store.get_uid, postId, is_fav)
    .then( res => {
        user_store.user_toggle_favs(postId, is_fav);
    })
    .catch( e => console.log("いいね失敗"));
}


const is_show = ref<boolean>(false);
const current_recipe = ref<object>({});
const current_comments = ref<Array<Comment>>([]);
	

const is_show_change = (post_id: number) => {
	is_show.value = !is_show.value;
	
	if ( post_id ) {
		current_recipe.value = recipe_store.find_one_recipe(post_id);
		current_comments.value = recipe_store.find_recipe_comments(post_id);
	}
};

const post_comment = ( post_id: number, comment: string ) => {
	recipe_store.post_comment(user_store.get_uid, user_store.get_user_name, post_id, comment);
}


onMounted( () => {
    recipe_store.get_popular_recipes()
})

</script>