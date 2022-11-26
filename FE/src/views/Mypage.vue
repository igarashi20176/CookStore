<template>

<div>
    <h2 class="text-2xl text-center">マイページ</h2>
    
    <p>投稿数:{{ info.posts }} 総いいね数: {{ info.likes }} 総コメント数: {{ info.comments }}</p>
    
    <!-- recipe card -->
	<ul class="mt-10 mb-10 flex-row lg:flex lg:flex-wrap lg:gap-10 justify-center items-stretch">
		<li class="mt-5 lg:m-0" v-for="recipe in recipe_store.recipes">
			<!-- loginの可否でいいね&ブックマークボタンを非活性 -->
			<recipe-card v-if="user_store.is_user_login" :recipe="recipe" />
        </li>
    </ul>

    <div v-if="!recipe_store.get_length_recipes">
        値を取得できませんでした
    </div>
</div>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Mypage } from "../models/Types";

import RecipeCard from "../templates/RecipeCard.vue";

import { useRecipeStore } from "../store/recipeStore";
import { useUserStore } from "../store/userStore";

const recipe_store = useRecipeStore();
const user_store = useUserStore();


const info = ref<Mypage>({
    posts: 0,
    likes: 0,
    comments: 0
})

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