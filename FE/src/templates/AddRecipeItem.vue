<template>

<!-- modal trigger button -->
<label for="my-modal-4" class="btn btn-primary">食材を入力</label>

<!-- modal -->
<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer">
  	<!-- modal body contents -->
  	<label class="modal-box relative w-11/12 max-w-5xl" for="">
    <label for="my-modal-4" class="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="text-lg font-bold">材料と分量を入力してください</h3>
    
    <div class="mt-10">
      	<input id="meat" class="hidden peer/meat" type="radio" name="status" checked />
      	<label for="meat" class="peer-checked/meat:text-rose-700 mr-3 p-1 rounded-md bg-rose-200 border-2 hover:bg-rose-300 cursor-pointer">肉・魚類</label>

      	<input id="vegetable" class="hidden peer/vegetable" type="radio" name="status" />
		<label for="vegetable" class="peer-checked/vegetable:text-green-700 mr-3 p-1 rounded-md bg-green-200 border-2 hover:bg-green-300 cursor-pointer">野菜類</label>

		<input id="milk" class="hidden peer/milk" type="radio" name="status" />
		<label for="milk" class="peer-checked/milk:text-sky-700 mr-3 p-1 rounded-md bg-sky-200 border-2 hover:bg-sky-300 cursor-pointer">乳製品</label>

		<input id="process" class="hidden peer/process" type="radio" name="status" />
		<label for="process" class="peer-checked/process:text-orange-700 p-1 rounded-md bg-orange-200 border-2 hover:bg-orange-300 cursor-pointer">加工食品・缶詰</label>

		<select v-model="food_id" required class="hidden peer-checked/meat:block mt-5 m-auto select select-accent border-red-400 w-full max-w-xs">
			<option hidden>肉・魚類</option>
			<optgroup label="さ行">
				<option class="text-lg" value="1">サバ</option>
			</optgroup>
			<optgroup label="た">
				<option class="text-lg" value="2">鶏モモ</option>
			</optgroup>
			<optgroup label="は">
				<option class="text-lg" value="3">豚バラ</option>
			</optgroup>
		</select>

		<select v-model="food_id" class="hidden peer-checked/vegetable:block mt-5 m-auto select select-accent border-green-400 w-full max-w-xs">
			<option hidden>野菜類</option>
			<optgroup label="た行">
				<option class="text-lg" value="4">トマト</option>
			</optgroup>
			<optgroup label="は">
				<option class="text-lg" value="5">白菜</option>
			</optgroup>
			<optgroup label="な">
				<option class="text-lg" value="6">ニラ</option>
			</optgroup>
		</select>

		<select v-model="food_id" required class="hidden peer-checked/milk:block mt-5 m-auto select select-accent border-blue-400 w-full max-w-xs">
			<option hidden>乳製品・卵</option>
			<optgroup label="か行">
				<option class="text-lg" value="7">牛乳</option>
			</optgroup>
			<optgroup label="た">
				<option class="text-lg" value="8">卵</option>
			</optgroup>
			<optgroup label="は">
				<option class="text-lg" value="9">バター</option>
			</optgroup>
		</select>

		<select v-model="food_id" class="hidden peer-checked/process:block mt-5 m-auto select select-accent border-orange-400 w-full max-w-xs">
			<option hidden>加工食品・缶詰</option>
			<optgroup label="さ行">
				<option class="text-lg" value="10">サバ缶</option>
			</optgroup>
			<optgroup label="は">
				<option class="text-lg" value="11">ハム</option>
				<option class="text-lg" value="12">ベーコン</option>
			</optgroup>
		</select>

		<label for="volume" class="font-bold">分量: </label>
		<input id="volume" required v-model="food_amount" type="text" placeholder="例)100g, 小さじ1, 少々" class="mt-6 mr-5 input input-bordered input-accent max-w-xs" />

		<label for="grams" class="font-bold">
			<div class="tooltip tooltip-info" data-tip="栄養情報を記録したい場合，正確に入力してください">
			<img class="inline w-6" src="../assets/images/question.png" alt="" />
			</div>
			グラム: 
		</label>
		<input id="grams" v-model="food_grams" type="text" placeholder="※数字のみ入力してください" class="disabled mt-2 input input-bordered input-accent max-w-xs" :disabled="!props.isActive" />

		<button  @click.prevent.stop="add_ingredients" class="ml-4 mb-5 btn btn-success">追加</button>
		
		<div>
			<p class="font-bold mb-1">★ 選択した食材/分量</p>
			<ul v-for="ingredient in ingredients">
				<li>{{ ingredient }}</li>
			</ul>
		</div>  
	</div>

	</label>
</label>

</template>

<script lang="ts" setup>

import { ref } from "vue";

const props = defineProps({
  isActive: Boolean
})

let food_id = ref<string>("")
let food_amount = ref<string>("")
let food_grams = ref<number | null>(0)

const ingredients = ref<any>({});

const add_ingredients = () => {
  ingredients.value[food_id.value] = {
    amount: food_amount.value,
    grams: food_grams.value ? food_grams.value : null
  }
  console.log(ingredients.value);
};

</script>