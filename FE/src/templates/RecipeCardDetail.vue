<template>

<div class="lg:flex flex-row">

	<div class="m-4 p-5 border-2 border-base-300 rounded-lg lg:w-[920px] w-[95%]">

		<!-- author & title -->
		<div class="mb-3">
			<button @click="emits('change-show')" class="btn btn-primary">◀ 戻る</button>
			<p class="inline text-2xl ml-7 pb-2 pl-2 border-l-8 border-orange-400"><span class="text-base">投稿者:</span> {{ props.recipe.get_author() }} <span class="text-base">作成日: {{ props.recipe.get_created_at() }}</span></p>
		</div>

		<label class="inline-block font-bold mr-5 mb-5" for="title">★タイトル</label>
		<h3 class="inline text-4xl font-bold border-b border-[#333]">{{ props.recipe.get_title() }}</h3>

		<!-- 料理の写真と補足説明 -->
		<div class="lg:flex gap-x-16">
			<div class="flex flex-col w-[450px]">
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
			<div class="flex flex-col w-[400px]">
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
	<div class="m-5 lg:mt-4 lg:mr-3 p-5 lg:w-[calc(100%_-_900px)] flex-row border-2 border-base-300 rounded-md">
		<h3 class="text-center text-2xl mb-5">みんなのコメント</h3>
		<ul v-for="comment in comments">
			<li>
				<div class="flex flex-col w-full border-opacity-50">
					<div class="grid h-auto card bg-base-200 rounded-box place-items-center p-3">
						<p>by {{ comment.name }} {{ comment.date }}</p>
						<p>{{ comment.body }}</p>
					</div>
					<div class="divider"></div>
				</div>
			</li>
		</ul>
	</div>

</div>

</template>

<script lang="ts" setup>

import { computed } from "vue";
import { Comment } from "../models/Types";

const props = defineProps({
	recipe: { type: Object,  required: true }
})

const emits = defineEmits([ 'change-show' ])


const comments: Comment[] = [
	{
		name: "Jon Doe",
		body: "昨日家族に作りましたが，美味しいと好評でした!短時間で作れてこんなに感謝されるのはお得ですね^^",
		date: "2022-05-21",
	},
	{
		name: "Maxine",
		body: "少し味付けが薄かったので塩コショウを足しました",
		date: "2022-08-01",
	},
	{
		name: "yayaya",
		body: "私もこれ良く作ってます!一週間たつとふと食べたくなるんですよね~",
		date: "2022-01-10",
	}
];

// keyof...プロパティ名をユニオンで返す
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

</script>