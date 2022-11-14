<template>

<div class="text-center">
  <img class="inline w-16" src="../assets/images/chef-hat.png" alt="" />
  <h2 class="text-2xl font-bold">あなたの自慢の料理を投稿しよう</h2>
</div>

<div class="m-10 border-2 p-8 w-[900px] rounded-md">
  <label class="font-bold mr-5" for="title">タイトル</label>
  <input id="title" type="text" placeholder="例) あったかトマトスープ" class="input input-bordered input-primary w-full max-w-xs mb-5" />

  <div class="flex gap-x-20 text-center">
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

    <figcaption>
      <label class="block font-bold mb-3" for="title">キャッチコピー<span class="text-sm"> (最大60文字)</span></label>
      <textarea class="textarea textarea-bordered mb-10" placeholder="Bio" maxlength="60" cols="30"></textarea>

      <div class="bg-orange-100 p-5 rounded-xl" v-if="ingredients.length === 0">
        <p class="block font-bold mb-8">材料・分量</p>
        <label for="my-modal-3" class="btn btn-primary">材料を入力する</label>

        <!-- Put this part before </body> tag -->
        <input type="checkbox" id="my-modal-3" class="modal-toggle" />
        <div class="modal">
          <div class="modal-box w-11/12 max-w-5xl">
            <label for="my-modal-3" class="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 class="text-lg font-bold">材料と分量を入力してください</h3>
            
            <div class="mt-10">
              <input id="meat" class="hidden peer/meat" type="radio" name="status" checked />
              <label for="meat" class="peer-checked/meat:text-rose-700 mr-3 p-1 rounded-md bg-rose-200 border-2 hover:bg-rose-300">肉・魚類</label>

              <input id="vegetable" class="hidden peer/vegetable" type="radio" name="status" />
              <label for="vegetable" class="peer-checked/vegetable:text-green-700 mr-3 p-1 rounded-md bg-green-200 border-2 hover:bg-green-300">野菜類</label>

              <input id="milk" class="hidden peer/milk" type="radio" name="status" />
              <label for="milk" class="peer-checked/milk:text-sky-700 mr-3 p-1 rounded-md bg-sky-200 border-2 hover:bg-sky-300">乳製品</label>

              <input id="process" class="hidden peer/process" type="radio" name="status" />
              <label for="process" class="peer-checked/process:text-orange-700 p-1 rounded-md bg-orange-200 border-2 hover:bg-orange-300">加工食品・缶詰</label>

              <select v-model="select_values.category" required class="hidden peer-checked/meat:block mt-5 select select-accent w-full max-w-xs">
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

              <select v-model="select_values.category" class="hidden peer-checked/vegetable:block mt-5 select select-accent w-full max-w-xs">
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

              <select v-model="select_values.category" required class="hidden peer-checked/milk:block mt-5 select select-accent w-full max-w-xs">
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

              <select v-model="select_values.category" class="hidden peer-checked/process:block mt-5 select select-accent w-full max-w-xs">
                <option hidden>加工食品・缶詰</option>
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

              <label for="volume" class="font-bold">分量: </label>
              <input id="volume" v-model="select_values.amount" type="text" placeholder="例)100g, 小さじ1, 少々" class="mt-6 mr-5 input input-bordered input-accent max-w-xs" />

              <label for="volume" class="font-bold">
                <div class="tooltip tooltip-info" data-tip="栄養情報を記録したい場合，正確に入力してください">
                  <img class="inline w-6" src="../assets/images/question.png" alt="" />
                </div>
                グラム: 
              </label>
              <input id="volume" v-model="select_values.grams" type="text" placeholder="※数字のみ入力してください" class="disabled mt-2 input input-bordered input-accent max-w-xs" :disabled="!isActive" />
            </div>

            <div class="modal-action justify-center">
              <label @click="add_ingredients" for="my-modal-4" class="mt-7 btn btn-primary">決定する</label>
            </div>

          </div>
        </div>
      </div>

      <div v-if="!(ingredients.length === 0)" v-for="ingredient in ingredients">
        <p>{{ ingredient }}</p>
      </div>

      <div class="form-control mt-6">
        <label class="cursor-pointer label">
          <span class="">下書きとして保存する</span>
          <input type="checkbox" class="checkbox checkbox-success" />
        </label>
      </div>

      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="">栄養情報を記録する</span>
          <input type="checkbox" v-model="isActive" class="checkbox checkbox-success" />
        </label>
      </div>
    </figcaption>
  </div>

</div>


</template>

<script lang="ts" setup>

import { ref } from "vue";

type select = {
  category: string,
  amount: string,
  grams: number
}

let select_values = ref<select>({
  category: "",
  amount: "",
  grams: 0
});
const ingredients = ref<string[]>([]);
const isActive = ref(false);
const on_img = ref(false);

const add_ingredients = () => {
  ingredients.value.push(`${select_values.value.category}: ${select_values.value.amount}`)
  select_values = ref({
    category: "",
    amount: "",
    grams: 0
  });
};

</script>