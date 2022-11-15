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

      <div class="bg-orange-200 w-full h-36 p-2 rounded-xl ">
        <label class="block font-bold mb-3" for="title">食材・分量を入力</label>
        <add-recipe-item :is-active="isActive" />
      </div>

      <!-- <div v-if="!(ingredients.length === 0)" v-for="ingredient in ingredients">
        <p>{{ ingredient }}</p>
      </div> -->

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
import AddRecipeItem from "../templates/AddRecipeItem.vue";

const isActive = ref<boolean>(false);
const on_img = ref<boolean>(false);


</script>