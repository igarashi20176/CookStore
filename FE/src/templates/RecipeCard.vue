<template>

<div class="card card-side bg-base-200 shadow-xl">
    <figure>
        <img class="rounded-2xl w-[330px] h-[280px] border-2 border-[#999]" :src="props.recipe.get_image()" :alt="props.recipe.get_title()"/>
    </figure>

    <div class="relative card-body w-[270px] p-3">
        <div class="tooltip tooltip-primary font-bold" :data-tip="props.recipe.get_title()">
            <h2 class="abosolute card-title">{{ title_short }}</h2>
        </div>
        <div class="flex items-center gap-x-2">
            <p>by {{ props.recipe.get_author() }}</p>
            <p>投稿日: {{ props.recipe.get_created_at() }}</p>
        </div>
        <div class="flex py-2">
            <p>{{ content_short }}</p>
        </div>


        <div class="flex items-center gap-x-4">
            <div class="tooltip tooltip-primary" data-tip="いいね">
                <button><img class="w-8" src="../assets/images/heart.png" alt=""></button>
                <p class="inline m-1">53</p>
            </div>
            <div class="tooltip tooltip-primary" data-tip="ブックマーク">
                <button><img class="w-8" src="../assets/images/notebook.png" alt=""></button>
                <p class="inline m-1 ">22</p>
            </div>
            <div class="card-actions justify-end">
                <button @click="emits('change-show', props.recipe.get_postId())" class="btn btn-primary">詳しく</button>
            </div>
        </div>

    </div>
</div> 

</template>

<script lang="ts" setup>

import { computed } from "vue";

const props = defineProps({
    recipe: { type: Object, required: true }
});
const emits = defineEmits([ 'change-show' ])


const title_short = computed(() => props.recipe.get_title().length >= 14 ? `${props.recipe.get_title().substring(0, 14)}...` : props.recipe.get_title());

const content_short = computed(() => props.recipe.get_description().length > 40? `${props.recipe.get_description().substring(0, 40)}...` : props.recipe.get_description());


</script>