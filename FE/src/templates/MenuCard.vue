<template>

<div class="card card-compact w-[400px] h-auto bg-base-100 shadow-xl">
    <figure class="flex flex-wrap">
        <img class="w-[200px] h-[200px]" :src="props.menu.get_staple_image()" :alt="props.menu.get_staple().titie" />
        <img class="w-[200px] h-[200px]" :src="props.menu.get_main_image()" :alt="props.menu.get_main().titie" />
        <img class="w-[200px] h-[200px]" :src="props.menu.get_sub_image()" :alt="props.menu.get_sub().titie" />
        <img class="w-[200px] h-[200px]" :src="props.menu.get_soup_image()" :alt="props.menu.get_soup().titie" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">{{ props.menu.get_title() }}</h2>
        <div class="flex mb-3">
            <p>by {{ props.menu.get_authorName() }}</p>
            <p>投稿日: {{ props.menu.get_created_at() }}</p>
        </div>
        <p>{{ props.menu.get_description() }}</p>
        <div class="card-actions justify-end">
        <button @click="emits('change-view', props.menu.get_postId())" class="btn btn-primary">詳しく</button>
        </div>
    </div>
</div>

</template>

<script lang="ts" setup>

import { ref } from "vue";


const props = defineProps({
    menu: { type: Object, required: true }
})
const emits = defineEmits([ 'change-view' ])

</script>