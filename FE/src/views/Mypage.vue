<template>

<div v-if="!is_show">
    <h2 class="text-2xl text-center">マイページ</h2>
    
    <p class="ml-10 mt-5 text-left text-lg underline">投稿数:{{ info.posts }} 総いいね数: {{ info.likes }} 総コメント数: {{ info.comments }}</p>
    
    <!-- recipe card -->
	<ul class="mt-10 mb-10 flex-row lg:flex lg:flex-wrap lg:gap-10 justify-center items-stretch">
		<li class="mt-5 lg:m-0" v-for="recipe in recipe_store.recipes">
			<recipe-card :recipe="recipe" :uid="user_store.get_uid"
				@change-show="is_show_change" >
			</recipe-card>
        </li>
    </ul>

    <div class="text-center text-2xl" v-if="!recipe_store.recipes">
        表示できるレシピはありませんでした
    </div>
</div>

<!-- recipe detail -->
<div v-if="is_show">
  	<recipe-detail :comments="current_comments" :recipe="current_recipe" :uid="user_store.get_uid" @delete-recipe="delete_recipe" @post-comment="post_comment" @change-show="is_show_change" />
</div>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Mypage, Comment } from "../models/Types";

/**
 * Component
 */
import RecipeCard from "../templates/RecipeCard.vue";
import RecipeDetail from "../templates/RecipeCardDetail.vue";

/**
 * Pinia init
 */
import { useRecipeStore } from "../store/recipeStore";
import { useUserStore } from "../store/userStore";

const recipe_store = useRecipeStore();
const user_store = useUserStore();


// レシピカードとレシピの詳細のビュー切り替え
const is_show = ref<boolean>(false);

// ユーザの投稿に関する情報
const info = ref<Mypage>({
    posts: 0,
    likes: 0,
    comments: 0
})


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
	recipe_store.post_comment(user_store.get_uid, post_id, comment);
}


const delete_recipe = async ( post_id: number, img: string ) => {
	await recipe_store.delete_my_recipe(user_store.get_user_token, post_id, img)
    .then( res => {
        is_show.value = !is_show.value
        info.value.posts-=1;
    })
    .catch( e => alert("削除に失敗しました"));
}


onMounted( async () => {
    await recipe_store.get_my_recipes(user_store.get_uid)
    .then( (res: Mypage) => {
        info.value = res;
    })
    .catch( err => {
        info.value = err;
    } )
})
</script>