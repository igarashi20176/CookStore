<template>

<div class="lg:flex">

	<div class="relative m-4 p-5 lg:w-[920px] w-[95%] lg:h-[800px] border-2 border-base-300 rounded-lg lg:overflow-y-auto">

		<button v-if="props.uid === props.recipe.get_authorId()" @click="delete_recipe" class="absolute right-8 btn btn-error">削除する</button>

		<!-- author & title -->
		<div class="mb-3">
			<button @click="emits('change-show')" class="btn btn-primary">◀ 戻る</button>
			<p class="ml-7 pb-2 pl-2 inline text-2xl border-l-8 border-orange-400"><span class="text-base">投稿者:</span> {{ props.recipe.get_authorName() }} <span class="text-base">作成日: 2022-02-10</span></p>
		</div>

		<label class="mr-5 mb-5 inline-block font-bold" for="title">★タイトル</label>
		<h3 class="inline text-4xl font-bold border-b border-[#333]">{{ props.recipe.get_title() }}</h3>


		<!-- 料理の写真と補足説明 -->
		<div class="lg:flex gap-x-10">
			<div class="m-auto flex flex-col w-[450px]">
				<figure class="mt-5">
					<img class="border-2 border-[#999] rounded-xl" :src="props.recipe.get_image()" :alt="props.recipe.get_title()">
				</figure>

				<div class="mt-8 text-center">	
					<label class="mb-5 block font-bold" for="remarks">★作ろうと思った背景・こだわり<span class="text-sm">等</span></label>
					<the-ruled-line :text="{ content: props.recipe.get_remarks(), width: '380px', line_length: 21 }" />
				</div>	
			</div>

			<!-- キャッチコピーと食材・分量 -->
			<div class="m-auto flex flex-col w-[400px]">
				<div class="my-5">
					<label class="mb-3 block text-center font-bold" for="title">★キャッチコピー</label>
					<the-ruled-line :text="{ content: props.recipe.get_description(), width: '300px', line_length: 16 }" />
				</div>

				<div class="w-full h-auto p-2 bg-orange-200 rounded-xl ">
					<label class="block text-center text-lg font-bold mb-3" for="title">食材・分量</label>
					<div v-for="ingredient in props.recipe.get_ingredients()"> 
						<div class="flex justify-between">
							<p class="ml-5 text-xl font-bold">{{ ingredient.name }}</p>
							<p class="mr-5 text-xl font-bold">{{ ingredient.amount }}</p>
						</div>
						<div class="w-[350px] mb-3 border-t border-dashed border-[#555]"></div>
					</div>
				</div>
			</div>
		</div>

	</div>
	
	<!-- コメント欄 -->
	<div class="m-5 lg:m-2 lg:mt-4 lg:mr-3 p-5 lg:w-[calc(100%_-_900px)] h-[800px] flex-row border-2 border-base-300 rounded-md overflow-y-auto">
		<h3 class="text-center text-2xl mb-5">みんなのコメント</h3>
		<ul v-if="props.comments.length !== 0">
			<li v-for="comment in props.comments">
				<div class="flex flex-col w-full border-opacity-50">
					<div class="h-auto p-3 card grid bg-base-200 rounded-box place-items-center">
						<p>by {{ comment.name }} / {{ comment.createdAt.substring(0, 10) }}</p>
						<p>{{ comment.body }}</p>
					</div>
					<div class="divider"></div>
				</div>
			</li>
		</ul>
		<div v-else class="text-center underline">コメントはまだありません</div>

		<div class="mt-3 text-center">
			<post-comment v-if="props.uid" @post-comment="( comment: string ) => emits('post-comment', props.recipe.get_postId(), comment)">コメントする</post-comment>
			<label v-else class="inline-block btn-secondary mt-3 p-2 rounded-md">コメントするにはログインしてください</label>
		</div>
	</div>

</div>

<!-- 栄養バランスチャート -->
<div v-if="nut_data" class="m-5 border-2 border-base-300 rounded-md">
	<h2 class="mt-3 text-2xl text-[#333] text-center">栄養バランスグラフ</h2>

	<div class="lg:m-0 flex-row lg:flex items-end gap-x-16">
		<div class="mb-7">
			<div class="mt-5 ml-5 lg:ml-10 py-1 text-center w-[400px] bg-base-200 rounded-md">
				<label class="text-xl">総摂取カロリーに対するPCFバランス</label>
				<label class="mt-3 flex justify-center gap-x-3">
					<p class="text-[#808080]">炭水化物: {{ Math.round(nut_data.carbo*4 / nut_data.kcal * 100) }}%</p>
					<p class="text-[#ff6347]">タンパク質: {{ Math.round(nut_data.protein*4 / nut_data.kcal * 100) }}%</p>
					<p class="text-yellow-500">脂質: {{ Math.round(nut_data.fat*9 / nut_data.kcal * 100) }}%</p>
				</label>
			</div>
			<div class="ml-14 lg:ml-24 w-[310px] text-left">
				<PieChart :width="300" :height="300" :base="'kcal'" :data="{ '炭水化物': nut_data.carbo*4, 'タンパク質': nut_data.protein*4, '脂質': nut_data.fat*4 }" />
			</div>
		</div>
		
		<div class="ml-14 lg:ml-0 mb-5 w-[300px] text-center">
			<label class="bg-base-200 rounded-md px-2">食物繊維・ビタミン群</label>
			<BarChart :height="300" :color="'#ff7f50'" :data="{ 'fiber': nut_data.fiber, 'VA': nut_data.VA, 'VB1': nut_data.VB1, 'VB2': nut_data.VB2, 'VB6': nut_data.VB6, 'VC': nut_data.VC, 'VD': nut_data.VD, 'VE': nut_data.VE, 'folic': nut_data.folic }" />
		</div>

		<div class="mb-5 ml-14 lg:ml-0 w-[300px] text-center">
			<label class="bg-base-200 rounded-md px-2">ミネラル群</label>
			<BarChart :height="300" :color="'#00bfff'" :data="{ 'natrium': nut_data.natrium, 'kalium': nut_data.kalium, 'calcium': nut_data.calcium, 'iron': nut_data.iron, 'magnesium': nut_data.magnesium, 'zinc': nut_data.zinc }" />
		</div>	
	</div>

</div>

<div v-else class="mb-5 text-center mt-7">
	<h2 class="inline px-2 text-2xl btn-secondary rounded-md">栄養情報は記録されていません</h2>
	<p class="mt-3">栄養情報を表示するには，レシピ投稿時に"栄養情報を記録する"にチェックを入れてください</p>
</div>

</template>

<script lang="ts" setup>

import { Comment, Nutriton } from "../models/Types";

import TheRuledLine from "../parts/TheRuledLine.vue";
import PieChart from "../graphComponents/NutPieChart";
import BarChart from "../graphComponents/NutBarChart";
import PostComment from "../templates/ThePostComment.vue";


const props = defineProps({
	recipe: { type: Object,  required: true },
	comments: { type: Array<Comment>, default: [] },
	uid: { type: String, default: "" }
})
const emits = defineEmits([ 'change-show', 'post-comment', 'delete-recipe' ])


// 栄養情報を取得
const nut_data: Nutriton = props.recipe.get_nut();


const delete_recipe = () => {
	if ( confirm("本当に削除しますか？") ) {
		emits('delete-recipe', props.recipe.get_postId(), props.recipe.get_image());
	}
}

</script>