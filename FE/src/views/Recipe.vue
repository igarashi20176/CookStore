<template>

<div tabindex="0" class="collapse collapse-arrow w-1/2 border border-base-300 bg-base-100 rounded-box">
  <div class="collapse-title text-xl font-medium">
    <p>レシピカテゴリー</p>
  </div>
  <div class="collapse-content"> 
    <ul>
        <li>ごはんもの</li>
        <li>肉のおかず</li>
        <li>野菜のおかず</li>
        <li>スープ・汁物</li>
    </ul>
  </div>
</div>

<h2 class="text-2xl font-bold text-center bg-base-300 w-1/4 m-auto rounded-xl">みんなのメニュー</h2>
<div class="flex flex-row flex-wrap gap-7 m-10">
     <ul v-for="i in ary">
        <li :key="i"><movie-card /></li>
    </ul>
</div>

</template>

<script lang="ts" setup>

import MovieCard from "../templates/RecipeCard.vue";

const ary = [1,2,3,4]

</script>