<template>

<div class="w-full text-left mt-7 lg:text-center">
	<h2 class="inline text-2xl font-bold text-center w-1/3 lg:w-1/4 ml-3 p-2 py-1 rounded-xl">食事記録</h2>
</div>

<div v-if="is_recipe_null" class="mt-10 text-center text-2xl">
		<p>データの取得に失敗しました</p>
		<p>もう一度お試しください</p>
</div>

<div class="w-[85%] m-auto my-8">
    <div class="mt-5 flex flex-col w-full border-opacity-50" v-for="recipe, i in recipe_store.recipes.reverse()">
        <div class="divider">{{i+1}}日前</div>
        <div class="flex-row h-auto p-2 card bg-gray-100 rounded-box place-items-center">
            <recipe-card :uid="user_store.get_uid" :recipe="recipe" :is-fav="user_store.is_fav_recipe(recipe.get_postId())"
				@change-show="is_show_change" @toggle-fav="toggle_fav">
			</recipe-card>
            <div class="m-auto bg-base-200 p-2 rounded-lg shadow-lg" v-if="recipe.get_nut()">
                <h3 class="mb-3 text-lg font-black">栄養摂取情報</h3>
                <div class="flex gap-x-5">
                    <div>
                        <p class="my-1" v-for="label in (Object.keys(recipe.get_nut() as Nutriton).slice(0, 5) as (keyof Nutriton)[])">{{ label }}: {{ nut_calc(label, recipe.get_nut()) }}</p>
                    </div>
                    <div>
                        <p v-for="label in (Object.keys(recipe.get_nut() as Nutriton).slice(5, 13) as (keyof Nutriton)[])">{{ label }}: {{ nut_calc(label, recipe.get_nut()) }}</p>
                    </div>
                    <div>
                        <p v-for="label in (Object.keys(recipe.get_nut() as Nutriton).slice(13) as (keyof Nutriton)[])">{{ label }}: {{ nut_calc(label, recipe.get_nut()) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script lang="ts" setup>

import { onMounted, ref, computed } from "vue";
import { useRecipeStore } from "../store/recipeStore";
import { useUserStore } from "../store/userStore";
import { Nutriton } from "../models/Types";
import data from "../models/nut_requirement.json";

/**
 * components
 */
 import RecipeCard from "../templates/RecipeCard.vue";

/**
 * Pinia store init
 */
const user_store = useUserStore();
const recipe_store = useRecipeStore();


const is_show = ref<boolean>(false);
const current_recipe = ref<object>({});


    
const nut_calc = computed(() => {
    return ( label: keyof Nutriton, nut: any ) => {
        return `${Math.floor( nut[label] - data[label] * Math.pow( 10, 2 ) ) / Math.pow( 10, 2 )}`
    }
})
    
const is_show_change = (post_id: number) => {
	is_show.value = !is_show.value;
	
	if ( post_id ) {
		current_recipe.value = recipe_store.find_one_recipe(post_id);
	}
};


const toggle_fav = async (postId: number, is_fav: boolean) => {
	await recipe_store.toggle_fav(user_store.get_uid, postId, is_fav)
	.then( res => {
		user_store.user_toggle_favs(postId, is_fav);
	})
	.catch( e => console.log("いいね失敗"));
}


const is_recipe_null = ref<boolean>(false)


/**
 * レシピの初期化
 */
 onMounted( async () => {
	await recipe_store.get_all_recipes()
	.then((res) => {
		is_recipe_null.value = res;	
        console.log("失敗");
	}).catch((err) => {
		is_recipe_null.value = err;	
        console.log("成功");
	});
})
</script>