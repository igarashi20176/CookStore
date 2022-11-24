<template>

<div class="card card-side bg-base-200 shadow-xl">
    <figure>
        <img class="rounded-2xl w-[330px] h-[280px] border-2 border-[#999]" :src="props.recipe.get_image()" :alt="props.recipe.get_title()"/>
    </figure>

    <!-- card body -->
    <div class="relative card-body w-[270px] p-3">
        <!-- title -->
        <h2 class="abosolute card-title">{{ props.recipe.get_title() }}</h2>

        <!-- author & created_date -->
        <div class="flex items-center gap-x-2">
            <p>by {{ props.recipe.get_author() }}</p>
            <p>投稿日: 2022-02-10</p>
        </div>
        <div class="flex py-2">
            <p>{{ props.recipe.get_description() }}</p>
        </div>


        <div class="flex items-center gap-x-5 ml-5">
            <label class="swap swap-flip" v-if="props.isLogin">                
                <input type="checkbox" v-model="is_fav" />
                <!-- いいねボタン -->
                <div class="swap-off" @click="emits('toggle-fav', props.recipe.get_postId())">
                    <div class="flex tooltip tooltip-primary" data-tip="いいね">
                        <img class="w-8" src="../assets/images/heart.png" alt="fav_on">
                        <p class="m-1">{{ props.recipe.get_favs() }}</p>
                    </div>
                </div>
                <div class="swap-on">
                    <div class="flex tooltip tooltip-primary" data-tip="いいね">
                        <img class="w-8" src="../assets/images/heart_color.png" alt="fav_off">
                        <p class="m-1">{{ props.recipe.get_favs() }}</p>
                    </div>
                </div>
            </label>

            <div v-else class="flex tooltip tooltip-primary" data-tip="いいね">
                <img class="w-8" src="../assets/images/heart.png" alt="fav_on">
                <p class="m-1">{{ props.recipe.get_favs() }}</p>
            </div>

            <!-- ブックマーク -->
            <label class="swap swap-flip" v-if="props.isLogin" >                
                <input type="checkbox" />
                <div class="swap-off">
                    <div class="flex tooltip tooltip-primary" data-tip="ブックマーク">
                        <img class="w-8" src="../assets/images/bookmark.png" alt="bookmark_off">
                        <p class="inline m-1">{{ props.recipe.get_favs() }}</p>
                    </div>
                </div>
                <div class="swap-on">
                    <div class="flex tooltip tooltip-primary" data-tip="いいね">
                        <img class="w-8" src="../assets/images/bookmark_color.png" alt="bookmark_on">
                        <p class="inline m-1">{{ props.recipe.get_favs() }}</p>
                    </div>
                </div>
            </label>

            <div v-else class="flex tooltip tooltip-primary" data-tip="ブックマーク">
                <img class="w-8" src="../assets/images/bookmark.png" alt="bookmark_off">
                <p class="inline m-1">{{ props.recipe.get_favs() }}</p>
            </div>

            <!-- 詳細ボタン -->
            <div class="card-actions justify-end">
                <button @click="emits('change-show', props.recipe.get_postId())" class="btn btn-primary">詳しく</button>
            </div>
        </div>

    </div>
</div> 

</template>

<script lang="ts" setup>

import { ref } from "vue";

const props = defineProps({
    recipe: { type: Object, required: true },
    isFav: { type: Boolean, required: true },
    isLogin: { type: Boolean, required: true }
});
const emits = defineEmits([ 'change-show', 'toggle-fav' ]);

const is_fav = ref<boolean>(props.isFav);

</script>