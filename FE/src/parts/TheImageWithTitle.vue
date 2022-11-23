<template>

<div class="relative">
    <div class="tooltip tooltip-primary" :data-tip="props.recipeInfo.title">
        <h3 class="text-center text-xl"><span class="text-base">★レシピ名: </span>{{ props.recipeInfo.title.length >= 14 ? `${props.recipeInfo.title.substring(0, 13)}...` : props.recipeInfo.title }}</h3>
    </div>
    <div class="absolute top-8 left-1 bg-base-300 rounded-xl px-2">
        <p class="inline">投稿者: {{ props.recipeInfo.post.authorId }} 投稿日: {{ props.recipeInfo.created_at.substring(0, 10) }}</p>
    </div>
    <img class="rounded-xl w-[400px] h-[300px]" :src="props.recipeInfo.image" :alt="props.recipeInfo.title">
</div>

</template>

<script lang="ts" setup>

const props = defineProps({
    recipeInfo: { type: Object, required: true }
});

</script>