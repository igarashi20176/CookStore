<template>

<div class="w-[80%] m-auto mt-10">
    <h2 class="text-2xl font-bold text-center bg-base-300 w-1/3 lg:w-1/4 m-auto rounded-xl mb-2">人気のメニュー</h2>

    <div class="relative mt-5 carousel w-full h-auto rounded-xl">
        <li class="carousel-item mx-2" v-for="recipe, i in recipe_store.recipes">
            <img class="absolute z-10 top-5 left-0 w-[50px]" src="../assets/images/ranking.png" alt="">
			<!-- loginの可否でいいね&ブックマークボタンを非活性 -->
			<recipe-card :id="`item${i+1}`" v-if="user_store.is_user_login" :is-login="true" :recipe="recipe" :is-fav="user_store.is_fav_recipe(recipe.get_postId())"
				@toggle-fav="toggle_fav">
			</recipe-card>
			<recipe-card :id="`item${i+1}`" v-else :recipe="recipe" :is-fav="false" :is-login="false"
				@toggle-fav="toggle_fav">
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

</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import RecipeCard from "../templates/RecipeCard.vue";

import { useUserStore } from "../store/userStore";
import { useRecipeStore } from "../store/recipeStore";


const user_store = useUserStore();
const recipe_store = useRecipeStore()

const is_show = ref<boolean>(false);

const toggle_fav = (postId: number, is_fav: boolean) => {
	recipe_store.toggle_fav(user_store.get_uid, postId, is_fav)
}

onMounted( () => {
    recipe_store.get_from_database_popular_recipes()
})

</script>