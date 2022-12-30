<template>

<div class="navbar bg-[#deb887] mb-5 rounded-sm">
    <div class="navbar-start">
        <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabindex="0" class="mt-3 p-2 w-52 menu menu-compact dropdown-content shadow bg-[#f5deb3] rounded-box">
                <li><a class="text-base" @click="emits('update:compo', 'top')">HOME ホーム</a></li>
                <li><a class="text-base" @click="emits('update:compo', 'record')">RECORD 食事記録</a></li>
                <li><a class="text-base" @click="emits('update:compo', 'recipe')">RECIPE レシピ</a></li>
                <li><a class="text-base" @click="emits('update:compo', 'menu')">MENU メニュー</a></li>
            </ul>
        </div>
    </div>

    <div class="navbar-center">
        <a @click="emits('update:compo', 'top')" class="btn btn-ghost normal-case text-2xl"><img class="w-9 mr-1" :src="app_images?.title_log" />クックストア</a>
    </div>
    <div class="navbar-end">
        <input type="text" placeholder="レシピを探そう!" class="input input-bordered w-full max-w-xs" />
        <button class="btn btn-ghost btn-circle mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
  
        <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                    <img v-if="props.userName" src="https://placeimg.com/80/80/people" />
                    <img v-else class="w-[80px]" :src="app_images?.user" />
                </div>
            </label>
            <ul v-if="props.userName" tabindex="0" class="mt-3 p-2 w-52 shadow menu menu-compact dropdown-content bg-base-100 rounded-box">
                <li class="text-center font-bold">{{ props.userName }}様</li>
                <li><a class="justify-between" @click="emits('update:compo', 'mypage')">マイページ</a></li>
                <li><label @click="logout" class="">ログアウト</label></li>
            </ul>
            <ul v-else tabindex="0" class="mt-3 p-2 w-52 shadow menu menu-compact dropdown-content bg-base-100 rounded-box">
                <li><label class="text-lg" @click="emits('update:register', false)" for="my-modal-1">ログイン</label></li>
                <li><label class="text-lg" @click="emits('update:register', true)" for="my-modal-1">新規登録</label></li>
            </ul>
            
        </div>
    </div>
</div>

</template>

<script lang="ts" setup>

import { inject } from "vue";
import { AppImages } from "../models/Types";

const props = defineProps({
    userName: { type: String, default: "" }
});
const emits = defineEmits([ 'update:compo', 'update:register', 'logout' ])


const app_images: AppImages | undefined = inject("app_images");


const logout = () => {
    emits('update:compo', 'top');
    emits('logout');
}


</script>