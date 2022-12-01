<template>

<!-- ナビバー -->
<!-- <the-header /> -->
<div class="navbar bg-base-200 mb-3">
    <div class="navbar-start">
        <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
                <li><a class="text-base" @click="current_component = 'top'">HOME ホーム</a></li>
                <li><a class="text-base" @click="current_component = 'recipe'">RECIPE レシピ</a></li>
                <li><a class="text-base" @click="current_component = 'menu'">MENU メニュー</a></li>
            </ul>
        </div>
    </div>

    <div class="navbar-center">
        <a @click="current_component = 'top'" class="btn btn-ghost normal-case text-2xl"><img class="w-9 mr-1" :src="app_images.title_log" />クックストア</a>
    </div>
    <div class="navbar-end">
        <input type="text" placeholder="レシピを探そう!" class="input input-bordered w-full max-w-xs" />
        <button class="btn btn-ghost btn-circle mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
  
        <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                    <img v-if="user_store.is_user_login" src="https://placeimg.com/80/80/people" />
                    <img v-if="!user_store.is_user_login" class="w-[80px]" :src="app_images.user" />
                </div>
            </label>
            <ul v-if="!user_store.is_user_login" tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li><label class="text-lg" @click="is_register = false" for="my-modal-1">ログイン</label></li>
                <li><label class="text-lg" @click="is_register = true" for="my-modal-1">新規登録</label></li>
            </ul>
            <ul v-else tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li><a class="justify-between" @click="current_component = 'mypage'">マイページ</a></li>
                <li><label @click="user_store.logout_user()" class="">ログアウト</label></li>
            </ul>
        </div>
    </div>
</div>

  
<sign-in-modal :is-login="user_store.is_user_login" :is-register="is_register" :modal-id="1" />
  

<div class="text-right mr-10" v-if="user_store.is_user_login">
    <button class="btn btn-primary bg-base-200 mr-2">
        <img class="w-6 inline" :src="app_images.writing" alt="">献立投稿
    </button>
    <button class="btn btn-primary bg-base-200" @click="current_component = 'add'">
        <img class="w-6 inline" :src="app_images.chef_hat" alt="">レシピ投稿  
    </button>
</div>

<div v-else class="text-right mr-5 hover:opacity-80">
    <label class="btn btn-secondary" @click="is_register = false" for="my-modal-1">レシピを登録するにはログインしてください</label>
</div>


<component :is="componentList[current_component]" @change-view="( compo: string ) => current_component = compo" />

</template>

<script lang="ts" setup>

import { provide, ref, shallowReactive, readonly, onBeforeMount } from "vue";
import { useUserStore } from "./store/userStore";
import { AppImages } from "./models/Types";

import { getDownloadURL , ref as fsRef } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Components
 */
import TheHeader from "./templates/TheHeader.vue";
import Top from "./views/Top.vue";
import Recipe from "./views/Recipe.vue";
import Menu from "./views/Menu.vue";
import AddRecipe from "./views/AddRecipe.vue";
import SignInModal from "./views/SignInModal.vue";
import Mypage from "./views/Mypage.vue";

/**
 *  Pinia init 
 */
const user_store = useUserStore()

// 動的コンポーネントの切り替え
const current_component = ref<string>("recipe")
const componentList = shallowReactive<any>({
    top: Top,
    recipe: Recipe,
    add: AddRecipe,
    menu: Menu,
    mypage: Mypage
});

// ログインかサインインを判断
const is_register = ref<boolean>(false);

// アプリ内のアイコン画像を取得
const app_images = ref<AppImages>({
    title_log: "app_images/recipe_book.png",
    bookmark: "app_images/bookmark.png",
    bookmark_color: "app_images/bookmark_color.png",
    heart: "app_images/heart.png",
    heart_color: "app_images/heart_color.png",
    chef_hat: "app_images/chef_hat.png",
    user: "app_images/user.png",
    writing: "app_images/writing.png",
    ranking: "app_images/ranking.png",
    question: "app_images/question.png",
    photo_camera: "app_images/photo_camera.png"
});

provide( "app_images", readonly(app_images) );


onBeforeMount( () => {
    (Object.keys(app_images.value) as (keyof AppImages)[]).forEach( i => {
        getDownloadURL(fsRef(storage, app_images.value[i]))
        .then((url: string) => {const xhr = new XMLHttpRequest()
            xhr.responseType = 'blob'
            xhr.onload = (event) => {
            // const blob = xhr.response
            }
            xhr.open('GET', url)
            xhr.send();

            app_images.value[i] = url;
        }).catch((error: any) => {
            console.log('画像の取得に失敗しました')
        })
        .then(( )=> provide('app_images', app_images.value) );
    });
})

</script>