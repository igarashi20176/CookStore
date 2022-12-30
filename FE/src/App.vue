<template>

<the-header v-model:compo="current_component" v-model:register="is_register"
    :user-name="user_store.get_user_name" @logout="user_store.logout_user()">
</the-header>

<sign-in-modal :is-login="user_store.is_user_login" :is-register="is_register" :modal-id="1" />

<div class="mr-10 text-right" v-if="user_store.is_user_login">
    <button class="mr-2 btn btn-primary bg-base-200">
        <img class="w-6 inline" :src="app_images.writing" alt="">献立投稿
    </button>
    <button class="btn btn-primary bg-base-200" @click="current_component = 'add'">
        <img class="w-6 inline" :src="app_images.chef_hat" alt="">レシピ投稿  
    </button>
</div>

<div v-else class="mr-5 text-right hover:opacity-80">
    <label class="btn btn-primary" @click="is_register = false" for="my-modal-1">レシピを登録するにはログインしてください</label>
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
import Record from "./views/dietRecord.vue";

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
    mypage: Mypage,
    record: Record
});


// ログインとサインインを切り替え
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

provide( "app_images", readonly(app_images.value) );


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
    });
})

</script>