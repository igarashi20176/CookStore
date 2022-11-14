<template>

<!-- カード -->
<div class="relative border-base-200 border-4 m-10 m-auto p-5 rounded-2xl">
  <h2 class="absolute top-[-25px] left-1/2 z-10 text-2xl bg-[#f0f0f0] p-1 rounded-md">Reviews</h2>
  <ul class="flex flex-wrap gap-5 justify-center">
    <li class="w-[calc(33.3%-1.25rem)]" v-for="i in ary" :key="i">
      <review-card :rating-number="3.5" />
    </li>
  </ul>
</div>

</template>

<script lang="ts" setup>

import ReviewCard from "../templates/ReviewCard.vue";

const ary = [1,2,3,4,5,6,7,8,9]

</script>