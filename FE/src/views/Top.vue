<template>

<div class="w-[80%] m-auto mt-10">
    <h2 class="text-2xl font-bold text-center bg-base-200 w-1/2 :w-1/3 lg:w-1/4 m-auto rounded-xl mb-2"><img class="inline w-[50px]" src="../assets/images/ranking.png" alt="">人気のメニュー</h2>

    <div class="mt-5 carousel w-full h-auto rounded-xl">
        <li class="carousel-item m-0 lg:mx-2" v-for="recipe, i in recipe_store.recipes">
			<!-- loginの可否でいいね&ブックマークボタンを非活性 -->
			<recipe-card :id="`item${i+1}`" :uid="user_store.get_uid" :recipe="recipe" :is-fav="user_store.is_fav_recipe(recipe.get_postId())"
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


const toggle_fav = async (postId: number, is_fav: boolean) => {
    await recipe_store.toggle_fav(user_store.get_uid, postId, is_fav)
    .then( res => {
        user_store.user_toggle_favs(postId, is_fav);
    })
    .catch( e => console.log("いいね失敗"));
}


onMounted( () => {
    recipe_store.get_popular_recipes()
})

</script>