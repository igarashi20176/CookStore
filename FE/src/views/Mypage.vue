<template>

<Toast :condition="notice" :suc-str="'削除しました'" :err-str="'削除に失敗しました'" />

<div v-if="!is_show">
    <h2 class="text-2xl text-center">マイページ</h2>
    
    <p class="ml-10 mt-5 text-left text-lg underline">投稿数:{{ post_info.posts }} 総いいね数: {{ post_info.likes }} 総コメント数: {{ post_info.comments }}</p>
    
    <!-- recipe card -->
	<ul class="mt-10 mb-10 flex-row lg:flex lg:flex-wrap lg:gap-10 justify-center items-stretch">
		<li class="mt-5 lg:m-0" v-for="recipe in recipe_store.recipes">
			<recipe-card :recipe="recipe" :uid="user_store.get_uid"
				@change-show="is_show_change" >
			</recipe-card>
        </li>
    </ul>

    <div class="text-center text-2xl" v-if="!recipe_store.get_length_recipes">
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
import Toast from "../parts/TheToast.vue";

/**
 * Pinia init
 */
import { useRecipeStore } from "../store/recipeStore";
import { useUserStore } from "../store/userStore";

const recipe_store = useRecipeStore();
const user_store = useUserStore();


// ユーザの投稿に関する情報
const post_info = ref<Mypage>({
    posts: 0,
    likes: 0,
    comments: 0
})


/**
 * レシピ一覧とレシピ詳細の切り替え
 * @param postId // 切り替えしたいレシピのID
 */
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

// 投稿の可否をToastで表示
const notice = ref<Boolean | null>(null);

const delete_recipe = async ( post_id: number, img: string ) => {
	await recipe_store.delete_my_recipe(user_store.get_user_token, post_id, img)
    .then( success => {
        is_show.value = !is_show.value;
        post_info.value.posts-=1;

        notice.value = success;
    })
	.catch( err => notice.value = err )
	.then( () => {
		setTimeout( () => {
            notice.value = null;
		}, 3000);
	});
}


/**
 * レシピの初期化
 */
onMounted( async () => {
    await recipe_store.get_my_recipes(user_store.get_uid)
    .then( (res: Mypage) => {
        post_info.value = res;
    })
    .catch( err => {
        post_info.value = err;
    } )
})
</script>