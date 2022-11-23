<template>

<!-- モーダルトリガーボタン -->
<label for="my-modal-4" class="btn btn-primary">食材を入力</label>

<!-- モーダル本体 -->
<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer">
  	
	<!-- モーダルコンテンツ -->
  	<label class="modal-box relative w-11/12 max-w-5xl">
    <label for="my-modal-4" class="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="text-lg font-bold">材料と分量を入力してください</h3>
    
    <div class="mt-10">
      	<input id="meat" class="hidden peer/meat" type="radio" name="status" checked />
      	<label for="meat" class="peer-checked/meat:text-rose-700 mr-3 p-1 rounded-md bg-rose-200 border-2 hover:bg-rose-300 cursor-pointer">肉・魚類</label>

      	<input id="vegetable" class="hidden peer/vegetable" type="radio" name="status" />
		<label for="vegetable" class="peer-checked/vegetable:text-green-700 mr-3 p-1 rounded-md bg-green-200 border-2 hover:bg-green-300 cursor-pointer">野菜・果物</label>

		<input id="kinoko" class="hidden peer/kinoko" type="radio" name="status" />
		<label for="kinoko" class="peer-checked/kinoko:text-white mr-3 p-1 rounded-md bg-amber-600 border-2 hover:bg-amber-700 cursor-pointer">キノコ類</label>

		<input id="milk" class="hidden peer/milk" type="radio" name="status" />
		<label for="milk" class="peer-checked/milk:text-sky-700 mr-3 p-1 rounded-md bg-sky-200 border-2 hover:bg-sky-300 cursor-pointer">乳製品</label>

		<input id="process" class="hidden peer/process" type="radio" name="status" />
		<label for="process" class="peer-checked/process:text-orange-700 mr-3 p-1 rounded-md bg-orange-200 border-2 hover:bg-orange-300 cursor-pointer">加工食品・缶詰</label>

		<input id="seaweed" class="hidden peer/seaweed" type="radio" name="status" />
		<label for="seaweed" class="peer-checked/seaweed:text-white mr-3 p-1 rounded-md bg-green-500 border-2 hover:bg-green-600 cursor-pointer">海藻</label>

		<input id="spices" class="hidden peer/spices" type="radio" name="status" />
		<label for="spices" class="peer-checked/spices:text-white p-1 rounded-md bg-slate-400 border-2 hover:bg-slate-500 cursor-pointer">調味料</label>

		<select v-model="select_ingredent.name" required class="hidden peer-checked/meat:block mt-5 m-auto select select-accent border-red-400 w-full max-w-xs">
			<option hidden>肉・魚類</option>
			<optgroup label="さ行">
				<option class="text-lg" value="鮭">鮭</option>
				<option class="text-lg" value="サバ">サバ</option>
			</optgroup>
			<optgroup label="た">
				<option class="text-lg" value="鶏ムネ(皮なし)">鶏胸(皮無)</option>
				<option class="text-lg" value="鶏ムネ(皮あり)">鶏胸(皮有)</option>
				<option class="text-lg" value="鶏モモ(皮なし)">鶏モモ(皮無)</option>
				<option class="text-lg" value="鶏モモ(皮あり)">鶏モモ(皮有)</option>
			</optgroup>
			<optgroup label="は">
				<option class="text-lg" value="豚バラ">豚バラ</option>
				<option class="text-lg" value="豚ロース">豚ロース</option>
			</optgroup>
		</select>

		<select v-model="select_ingredent.name" class="hidden peer-checked/vegetable:block mt-5 m-auto select select-accent border-green-400 w-full max-w-xs">
			<option hidden>野菜・果物</option>
			<optgroup label="か行">
				<option class="text-lg" value="キャベツ">キャベツ</option>
			</optgroup>
			<optgroup label="さ行">
				<option class="text-lg" value="じゃがいも">じゃがいも</option>
			</optgroup>
			<optgroup label="た行">
				<option class="text-lg" value="トマト">トマト</option>
			</optgroup>
			<optgroup label="は">
				<option class="text-lg" value="白菜">白菜</option>
				<option class="text-lg" value="ほうれん草">ほうれん草</option>
			</optgroup>
			<optgroup label="ま">
				<option class="text-lg" value="ミカン">ミカン</option>
			</optgroup>
			<optgroup label="な">
				<option class="text-lg" value="ニラ">ニラ</option>
			</optgroup>
			<optgroup label="ら">
				<option class="text-lg" value="リンゴ">リンゴ</option>
			</optgroup>
		</select>

		<select v-model="select_ingredent.name" class="hidden peer-checked/kinoko:block mt-5 m-auto select select-accent border-amber-600 w-full max-w-xs">
			<option hidden>きのこ類</option>
			<optgroup label="は">
				<option class="text-lg" value="ぶなしめじ">ぶなしめじ</option>
			</optgroup>
		</select>

		<select v-model="select_ingredent.name" required class="hidden peer-checked/milk:block mt-5 m-auto select select-accent border-blue-400 w-full max-w-xs">
			<option hidden>乳製品・卵</option>
			<optgroup label="か行">
				<option class="text-lg" value="牛乳">牛乳</option>
			</optgroup>
			<optgroup label="た">
				<option class="text-lg" value="卵">鶏卵</option>
			</optgroup>
			<optgroup label="は">
				<option class="text-lg" value="バター">バター</option>
			</optgroup>
		</select>

		<select v-model="select_ingredent.name" class="hidden peer-checked/process:block mt-5 m-auto select select-accent border-orange-400 w-full max-w-xs">
			<option hidden>加工食品・缶詰</option>
			<optgroup label="さ行">
				<option class="text-lg" value="サバ缶">サバ缶</option>
			</optgroup>
			<optgroup label="は">
				<option class="text-lg" value="ハム">ハム</option>
				<option class="text-lg" value="ベーコン">ベーコン</option>
			</optgroup>
		</select>

		<select v-model="select_ingredent.name" class="hidden peer-checked/seaweed:block mt-5 m-auto select select-accent border-green-600 w-full max-w-xs">
			<option hidden>海藻</option>
			<optgroup label="か行">
				<option class="text-lg" value="乾燥わかめ">乾燥わかめ</option>
			</optgroup>
		</select>

		<select v-model="select_ingredent.name" class="hidden peer-checked/spices:block mt-5 m-auto select select-accent border-slate-500 w-full max-w-xs">
			<option hidden>調味料</option>
			<optgroup label="さ行">
				<option class="text-lg" value="砂糖">砂糖</option>
				<option class="text-lg" value="醤油">醤油</option>
			</optgroup>
		</select>

		<label for="volume" class="font-bold">分量: </label>
		<input id="volume" required v-model="select_ingredent.amount" type="text" placeholder="例)100g, 小さじ1, 少々" class="mt-6 mr-5 input input-bordered input-accent max-w-xs" />

		<label for="grams" class="font-bold">
			<div class="tooltip tooltip-info" data-tip="栄養情報も記録したい場合，「栄養情報を記録する」にチェックしてください">
			<img class="inline w-6" src="../assets/images/question.png" alt="" />
			</div>
			グラム: 
		</label>
		<input id="grams" v-model="select_ingredent.grams" type="number" min="0" placeholder="※数字のみ入力してください" class="disabled mt-2 input input-bordered input-accent max-w-xs" :disabled="!props.isActive" />

		<button  @click="add_ingredients" class="ml-4 mb-5 btn btn-success">追加</button>

		<div class="mb-5">
			<label for="my-modal-4" class="text-center btn btn-primary" @click="emits('update:value', ingredients)">選択完了</label>
		</div>
		
		<div>
			<p class="font-bold mb-1 border-t-4 border-[#777] w-2/5 m-auto pt-2">★ 選択した食材/分量</p>
			<ul v-for="ingredient, i in ingredients">
				<li class="mb-2" :key="i">
					{{ ingredient.name }} : {{ ingredient.amount }} (グラム {{ ingredient.grams ? ingredient.grams : "未選択" }}g)
					<a href="#" class="ml-3 px-2 py-1 text-[#fafafa] bg-[#555] rounded-sm hover:bg-[#666]" @click.prevent="ingredients.splice(i, 1)">X</a>
				</li>
			</ul>
		</div>	 
	</div>

	</label>
</label>

</template>

<script lang="ts" setup>

import { ref } from "vue";
import { Ingredient } from "../models/Types";

const props = defineProps({
  	isActive: Boolean
});

const emits = defineEmits([ 'update:value' ])


const select_ingredent = ref<Ingredient>({
	name: "",
	amount: "",
	grams: null
});

const ingredients = ref<Ingredient[]>([]);

const add_ingredients = (): void => {
  	ingredients.value.push({
		name: select_ingredent.value.name,
		amount: select_ingredent.value.amount,
		grams: select_ingredent.value.grams ? Number(select_ingredent.value.grams) : null
  	});

	select_ingredent.value = {
		name: "",
		amount: "",
		grams: null
	}
};

</script>