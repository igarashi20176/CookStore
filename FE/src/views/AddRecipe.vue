<template>

<Toast :condition="notice" :suc-str="'投稿しました'" :err-str="'投稿に失敗しました'" />

<div class="text-center">
  	<img class="inline w-16" :src="app_images?.chef_hat" alt="chef_hat" />
  	<h2 class="text-2xl font-bold">あなたの自慢の料理を投稿しよう</h2>
</div>

<div class="m-10 p-8 w-[930px] border-2 rounded-md">
  	<label class="mr-5 font-bold" for="title">★タイトル</label>
  	<input v-model="add_recipe_info.title" id="title" type="text" placeholder="例) あったかトマトスープ" class="input input-bordered input-primary w-full max-w-xs mb-7" />

	<div class="flex gap-x-16">	
		<div class="flex-col gap-y-16 text-center">
			<!-- 画像の入力 -->
			<figure>
				<input @change="getImageFile" id="file" type="file" class="hidden" /> 
				<label v-if="!on_img" for="file" class="block bg-base-200 w-[500px] h-[400px] p-8 cursor-pointer rounded-xl hover:bg-base-300">
					<p class="mb-10 font-bold text-xl">料理の画像を挿入してください</p>
					<img class="block w-20 m-auto " :src="app_images?.photo_camera" alt="camera">
					<div class="mt-20 p-2 alert alert-info shadow-lg opacity-60">
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
						<span class="m-auto font-bold">鮮明でプライバシーの含まれない画像にするようお願いします</span>     
					</div>
					</div>
				</label>

				<div v-else>
					<p>画像をダブルクリックで差し替えることができます</p>
					<img @dblclick="on_img = !on_img" id="preview" :src="img_data" class="w-[500px] h-[400px] rounded-xl border-2 border-[#888] cursor-pointer hover:opacity-60" />
				</div>
			</figure>

			<!-- 補足情報 -->
			<div class="w-[400px]">
				<label class="mt-10 block font-bold" for="remarks">★作ろうと思った背景・こだわり<span class="text-sm">等</span></label>
				<textarea v-model="add_recipe_info.remarks" class="textarea textarea-bordered mt-5" id="remarks" placeholder="例) おばあちゃんから教えてもらった秘伝の料理です．   例) 砂糖の代わりにはちみつを使うことでより健康的になってます！" rows="5" cols="45"></textarea>
			</div>
		</div>

		<div>
			<!-- キャッチコピー -->
			<label class="mb-3 block font-bold" for="description">★キャッチコピー<span class="text-sm"> (最大60文字)</span></label>
			<textarea id="description" v-model="add_recipe_info.description" class="textarea textarea-bordered mb-10" placeholder="例) 美味しいのに超時短!忙しい日にぜひ作ってほしいレシピです" maxlength="60" cols="30"></textarea>

			<!-- レシピカテゴリー -->
			<label class="mb-3 block font-bold " for="category">★レシピのカテゴリ<span class="text-sm"> (最大60文字)</span></label>
			<select v-model="add_recipe_info.category_id" id="category" class="mb-7 text-xl select select-bordered w-full max-w-xs">
				<option disabled selected>どんな料理？</option>
				<option value="1">ごはんもの</option>
				<option value="2">肉のおかず</option>
				<option value="3">野菜のおかず</option>
				<option value="4">スープ・汁物</option>
			</select>

			<div class="my-10 p-1 px-2 marker:form-control bg-gray-100 rounded-md">
				<label class="cursor-pointer label">
				<span class="">栄養情報を記録する</span>
				<input type="checkbox" v-model="add_recipe_info.nut_option" class="checkbox checkbox-success" />
				</label>
			</div>

			<!-- 分量の入力 -->
			<div v-if="(add_recipe_info.ingredients.length === 0)" class="w-full h-36 p-2 mb-10 text-center bg-orange-200 rounded-xl ">
				<label class="mb-3 block font-bold" for="title">食材・分量を入力</label>
				<add-recipe-item  v-model:value="add_recipe_info.ingredients" :is-active="add_recipe_info.nut_option" />
			</div>

			<div class="mb-10 py-5 w-[300px] h-auto bg-orange-200 text-center rounded-xl" 
				v-else>
				<div v-for="ingredient in add_recipe_info.ingredients"> 
					<div class="flex justify-between">
						<p class="ml-5 text-base font-bold">{{ ingredient.name }}</p>
						<p class="mr-5 text-sm font-bold">{{ ingredient.amount }} ( グラム: {{ ingredient.grams ? ingredient.grams : "未選択" }} g )</p>
					</div>
					<div class="border-t border-dashed border-[#555] mx-3 mb-3"></div>
				</div>

				<button @click="add_recipe_info.ingredients = []" class="m-auto p-1 px-2 bg-base-100 rounded-md hover:bg-base-200 transition">選択をリセット</button>
			</div>
			
			<div class="mt-10  text-center border-t-4 border-orange-300">
				<button @click="post_recipe" class="mt-5 btn btn-primary">投稿する!</button>
			</div>
		</div>
	</div>

</div>

</template>

<script lang="ts" setup>

import {  inject, ref } from "vue";
import AddRecipeItem from "../templates/AddRecipeItem.vue";
import { AddRecipeInfo, AppImages } from "../models/Types";

import Toast from "../parts/TheToast.vue";

import { useRecipeStore } from "../store/recipeStore";
import { useUserStore } from "../store/userStore";


/**
 * Pinia init
 */
const recipe_store = useRecipeStore();
const user_store = useUserStore();

const emits = defineEmits([ 'change-view' ])
const app_images: AppImages | undefined = inject("app_images");

// 投稿の成功をトーストで表示
const notice = ref<Boolean | null>(null);

// 入力情報の保存
const add_recipe_info = ref<AddRecipeInfo>({
	title: "",
	category_id: 1,
	description: "",
	ingredients: [],
	remarks: "",
	nut_option: false,
	file: {}
});


/**
 * 画像が入力されたらプレビューを表示
 */
const on_img = ref<boolean>(false);
const img_data = ref<any>();

// inputされたFileの保存
const getImageFile = (props: any): void => {	
	add_recipe_info.value.file = props.target.files[0];
	on_img.value = !on_img.value 

	// プレビューURLの生成
	img_data.value = URL.createObjectURL(add_recipe_info.value.file)	
} 


/**
 *  追加するレシピの情報をpiniaに送信
 */
const post_recipe = async (): Promise<void> => {
	add_recipe_info.value.category_id = Number(add_recipe_info.value.category_id);

	await recipe_store.post_my_recipe(user_store.get_uid, add_recipe_info.value)
	.then( success => notice.value = success)
	.catch( err => notice.value = err )
	.then( () => {
		setTimeout( () => {
            notice.value = null;
			emits('change-view', 'recipe');
		}, 2000);
	});
}

</script>