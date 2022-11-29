<template>

<div class="lg:flex">

	<div class="relative m-4 p-5 border-2 border-base-300 rounded-lg lg:w-[920px] w-[95%] lg:h-[800px] lg:overflow-y-auto">

		<button v-if="props.uid === props.recipe.get_authorId()" @click="delete_recipe" class="absolute right-8 btn btn-error">削除する</button>

		<!-- author & title -->
		<div class="mb-3">
			<button @click="emits('change-show')" class="btn btn-primary">◀ 戻る</button>
			<p class="inline text-2xl ml-7 pb-2 pl-2 border-l-8 border-orange-400"><span class="text-base">投稿者:</span> {{ props.recipe.get_authorName() }} <span class="text-base">作成日: {{ props.recipe.get_created_at() }}</span></p>
		</div>

		<label class="inline-block font-bold mr-5 mb-5" for="title">★タイトル</label>
		<h3 class="inline text-4xl font-bold border-b border-[#333]">{{ props.recipe.get_title() }}</h3>

		<!-- 料理の写真と補足説明 -->
		<div class="lg:flex gap-x-10">
			<div class="m-auto flex flex-col w-[450px]">
				<figure class="mt-5">
					<img class="border-2 border-[#999] rounded-xl" :src="props.recipe.get_image()" :alt="props.recipe.get_title()">
				</figure>

				<div class="mt-8 text-center">	
					<label class="block font-bold mb-5" for="remarks">★作ろうと思った背景・こだわり<span class="text-sm">等</span></label>
					<div class="ml-6" v-for="text in get_texts(props.recipe.get_remarks(), 21)"> 
						<p class="text-lg font-bold text-left">{{ text }}</p>
						<div class="border-t border-[#555] w-[390px] mb-3"></div>
					</div>
				</div>	
			</div>

			<!-- キャッチコピーと食材・分量 -->
			<div class="m-auto flex flex-col w-[400px]">
				<div class="my-5">
					<label class="block text-center font-bold mb-3" for="title">★キャッチコピー</label>
					<div class="ml-12" v-for="text in get_texts(props.recipe.get_description(), 15)"> 
						<p class="text-xl font-bold text-left">{{ text }}</p>
						<div class="border-t border-[#555] w-[300px] mb-3"></div>
					</div>
				</div>

				<div class="bg-orange-200 w-full h-auto p-2 rounded-xl ">
					<label class="block text-center text-lg font-bold mb-3" for="title">食材・分量</label>
					<div v-for="ingredient in props.recipe.get_ingredients()"> 
						<div class="flex justify-between">
							<p class="ml-5 text-xl font-bold">{{ ingredient.name }}</p>
							<p class="mr-5 text-xl font-bold">{{ ingredient.amount }}</p>
						</div>
						<div class="border-t border-dashed border-[#555] w-[350px] mb-3"></div>
					</div>
				</div>
			</div>
		</div>

	</div>
	
	<!-- コメント欄 -->
	<div class="relative m-5 lg:m-2 lg:mt-4 lg:mr-3 p-5 lg:w-[calc(100%_-_900px)] flex-row border-2 border-base-300 rounded-md h-[800px] overflow-y-auto">
		<post-comment v-if="props.uid" @post-comment="( comment: string ) => emits('post-comment', props.recipe.get_postId(), comment)">コメントする</post-comment>
		<h3 class="text-center text-2xl mb-5">みんなのコメント</h3>
		<ul v-if="props.comments.length !== 0">
			<li v-for="comment in props.comments">
				<div class="flex flex-col w-full border-opacity-50">
					<div class="grid h-auto card bg-base-200 rounded-box place-items-center p-3">
						<p>by {{ comment.name }} / {{ comment.createdAt.substring(0, 10) }}</p>
						<p>{{ comment.body }}</p>
					</div>
					<div class="divider"></div>
				</div>
			</li>
		</ul>
		<div v-else class="text-center">コメントはまだありません</div>
	</div>

</div>

<!-- 栄養バランスチャート -->
<div v-if="nut_data" class="border-2 border-base-300 rounded-md m-5">
	<h2 class="text-2xl text-[#333] text-center mt-3">栄養バランスグラフ</h2>
	<div class="lg:m-0 flex-row lg:flex items-end gap-x-16">
		<div class="mb-7">
			<div class="mt-5 ml-5 lg:ml-10 text-center w-[400px] bg-base-200 py-1 rounded-md">
				<label class="text-xl">総摂取カロリーに対するPCFバランス</label>
				<label class="mt-3 flex justify-center gap-x-3">
					<p class="text-[#808080]">炭水化物: {{ Math.round(nut_data.carbo*4 / nut_data.kcal * 100) }}%</p>
					<p class="text-[#ff6347]">タンパク質: {{ Math.round(nut_data.protein*4 / nut_data.kcal * 100) }}%</p>
					<p class="text-yellow-500">脂質: {{ Math.round(nut_data.fat*9 / nut_data.kcal * 100) }}%</p>
				</label>
			</div>
			<div class="text-left ml-14 lg:ml-24 w-[310px]">
				<PieChart :width="300" :height="300" :base="'kcal'" :data="{ '炭水化物': nut_data.carbo*4, 'タンパク質': nut_data.protein*4, '脂質': nut_data.fat*4 }" />
			</div>
		</div>
		
		<div class="ml-14 lg:ml-0 mb-5 w-[300px] text-center">
			<label class="bg-base-200 rounded-md px-2">食物繊維・ビタミン群</label>
			<BarChart :height="300" :color="'#ff7f50'" :data="{ 'fiber': nut_data.fiber, 'VA': nut_data.va, 'VB1': nut_data.vb1, 'VB2': nut_data.vb2, 'VB6': nut_data.vb6, 'VC': nut_data.vc, 'VD': nut_data.vd, 'VE': nut_data.ve, 'folic': nut_data.folic }" />
		</div>

		<div class="mb-5 ml-14 lg:ml-0 w-[300px] text-center">
			<label class="bg-base-200 rounded-md px-2">ミネラル群</label>
			<BarChart :height="300" :color="'#00bfff'" :data="{ 'natrium': nut_data.nat, 'kalium': nut_data.kal, 'calcium': nut_data.calc, 'iron': nut_data.iron, 'magnesium': nut_data.mag, 'zinc': nut_data.zinc }" />
		</div>
	</div>
</div>

<div v-else class="text-center mt-7 mb-5">
	<h2 class="inline text-2xl btn-secondary px-2 rounded-md">栄養情報は記録されていません</h2>
	<p class="mt-3">栄養情報を表示するには，レシピ投稿時に"栄養情報を記録する"にチェックを入れてください</p>
</div>

</template>

<script lang="ts" setup>

import { computed } from "vue";
import { Comment, Nutriton } from "../models/Types";

import PieChart from "../graphComponents/pieChart";
import BarChart from "../graphComponents/barChart";
import PostComment from "../templates/ThePostComment.vue";


const props = defineProps({
	recipe: { type: Object,  required: true },
	comments: { type: Array<Comment>, default: [] },
	uid: { type: String, default: "" }
})
const emits = defineEmits([ 'change-show', 'post-comment', 'delete-recipe' ])


// 栄養情報を取得
const nut_data: Nutriton  = props.recipe.get_nut();


/**
 * 罫線一行の文字数を指定し，配列で返す
 */
const get_texts = computed( () => {
    return ( text: string, line_length: number ):string[] | string => {
        const textAry: string[] = [];
        
        if ( text ) {
            for (let i = 0; i < text.length; i+=line_length) {
                textAry.push(text.substring(i, i+line_length));
            }    
            return textAry;
        } else {
            return "";
        }
    }
});


const delete_recipe = () => {
	if ( confirm("本当に削除しますか？") ) {
		emits('delete-recipe', props.recipe.get_postId(), props.recipe.get_image());
	}
}

</script>