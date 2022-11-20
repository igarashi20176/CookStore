<template>

<div class="text-center">
  	<img class="inline w-16" src="../assets/images/chef-hat.png" alt="" />
  	<h2 class="text-2xl font-bold">あなたの自慢の料理を投稿しよう</h2>
</div>

<div class="m-10 border-2 p-8 w-[930px] rounded-md">
  	<label class="font-bold mr-5" for="title">★タイトル</label>
  	<input v-model="add_recipe_info.title" id="title" type="text" placeholder="例) あったかトマトスープ" class="input input-bordered input-primary w-full max-w-xs mb-5" />

	<div class="flex gap-x-16">	
		<div class="flex-col gap-y-16 text-center">
			<figure>
				<input id="file" type="file" class="hidden" /> 
				<label for="file" class="block bg-base-200 w-[500px] h-[400px] p-8 cursor-pointer rounded-xl hover:bg-base-300">
					<p class="font-bold mb-10 text-xl">料理の画像を挿入してください</p>
					<img class="block w-20 m-auto " src="../assets/images/photo-camera.png" alt="">
					<div class="alert alert-info shadow-lg mt-20 p-2 opacity-60">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
						<span class="m-auto font-bold">鮮明でプライバシーの含まれない画像にするようお願いします</span>     
					</div>
					</div>
				</label>
				<img v-if="on_img" src="https://dummyimage.com/500x400/000000/fd7e00" alt="">
			</figure>

			<div class="w-[400px]">
				<label class="block font-bold mt-10" for="remarks">★作ろうと思った背景・こだわり<span class="text-sm">等</span></label>
				<textarea v-model="add_recipe_info.remarks" class="textarea textarea-bordered mt-5" id="remarks" placeholder="例) おばあちゃんから教えてもらった秘伝の料理です．   例) 砂糖の代わりにはちみつを使うことでより健康的になってます！" rows="5" cols="45"></textarea>
			</div>
		</div>

		<div>
			<label class="block font-bold mb-3" for="title">★キャッチコピー<span class="text-sm"> (最大60文字)</span></label>
			<textarea v-model="add_recipe_info.description" class="textarea textarea-bordered mb-10" placeholder="例) 美味しいのに超時短!忙しい日にぜひ作ってほしいレシピです" maxlength="60" cols="30"></textarea>

			<div v-if="(add_recipe_info.ingredients.length === 0)" class="bg-orange-200 w-full h-36 p-2 mb-10 text-center rounded-xl ">
				<label class="block font-bold mb-3" for="title">食材・分量を入力</label>
				<add-recipe-item  v-model:value="add_recipe_info.ingredients" :is-active="add_recipe_info.nut_option" />
			</div>

			<div class="mb-10 py-5 bg-orange-200 w-[300px] h-auto text-center rounded-xl" 
				v-else>
				<div v-for="ingredient in add_recipe_info.ingredients"> 
					<div class="flex justify-between">
						<p class="ml-5 text-base font-bold">{{ ingredient.name }}</p>
						<p class="mr-5 text-sm font-bold">{{ ingredient.amount }} ( グラム: {{ ingredient.grams ? ingredient.grams : "未選択" }} g )</p>
					</div>
					<div class="border-t border-dashed border-[#555] mx-3 mb-3"></div>
				</div>
				<button @click="add_recipe_info.ingredients = []" class="bg-base-100 rounded-md m-auto p-1 px-2 hover:bg-base-200 transition">選択をリセット</button>
			</div>

			<div class="form-control bg-base-200 rounded-md p-1 px-2">
				<label class="cursor-pointer label">
				<span class="">栄養情報を記録する</span>
				<input type="checkbox" v-model="add_recipe_info.nut_option" class="checkbox checkbox-success" />
				</label>
			</div>
			
			<div class="text-center mt-10 border-t-4 border-orange-300">
				<button @click="post_recipe" class="mt-5 btn btn-primary">投稿する!</button>
			</div>
		</div>
	</div>

</div>

</template>

<script lang="ts" setup>

import { ref } from "vue";
import AddRecipeItem from "../templates/AddRecipeItem.vue";
import { AddInfo } from "../models/Types";
import { useRecipeStore } from "../store";

const recipe_store = useRecipeStore();

const add_recipe_info = ref<AddInfo>({
	title: "",
	description: "",
	ingredients: [],
	remarks: "",
	nut_option: false
});

const on_img = ref<boolean>(false);


const post_recipe = (): void => {
	recipe_store.post_database_recipe(add_recipe_info.value);
}

</script>