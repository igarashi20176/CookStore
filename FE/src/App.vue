<template>

<div class="z-10 top-20 toast toast-top toast-end">
  <div v-if="is_login === 1" class="alert alert-success">
    <div>
      <span class="font-bold">ログインに成功しました</span>
    </div>
  </div>
  <div v-if="is_login === 2" class="alert alert-error">
    <div>
      <span class="font-bold">ログインに失敗しました</span>
    </div>
  </div>
</div>

<!-- ナビバー -->
<!-- <the-header /> -->
<div class="navbar bg-base-200 mb-3">
    <div class="navbar-start">
        <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
                <li><a @click="currentComponent = 'top'">-HOME- ホーム</a></li>
                <li><a @click="currentComponent = 'recipe'">-RECIPE- レシピ</a></li>
                <li><a @click="currentComponent = 'menu'">-MENU- メニュー</a></li>
            </ul>
        </div>
    </div>

    <div class="navbar-center">
        <a @click="currentComponent = 'top'" class="btn btn-ghost normal-case text-2xl"><img class="w-9" src="./assets/images/recipe-book.png" />クックストア</a>
    </div>
    <div class="navbar-end">
        <input type="text" placeholder="レシピを探そう!" class="input input-bordered w-full max-w-xs" />
        <button class="btn btn-ghost btn-circle mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
  
        <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                    <img src="https://placeimg.com/80/80/people" />
                </div>
            </label>
            <ul v-if="!user_store.is_user_login" tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li><label for="my-modal-1" class="">ログイン</label></li>
                <li><a href="#my-modal-2" class="">新規登録</a></li>
            </ul>
            <ul v-if="user_store.is_user_login" tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li>
                    <a class="justify-between">
                    マイページ
                    </a>
                </li>
                <li><label @click="user_store.logout_user_info()" class="">ログアウト</label></li>
            </ul>
        </div>
    </div>
</div>

  
<sign-in-modal @save-login-info="save_login" :id="1" />
  
<div class="modal" id="my-modal-2">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Register</h3>
        <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
        <div class="modal-action">
            <a href="#" class="btn">Yay!</a>
        </div>
    </div>
</div>

<div class="text-right mr-10" v-if="!(currentComponent == 'add')">
    <button class="btn btn-primary bg-base-200 mr-2">
        <img class="w-6 inline" src="./assets/images/writing.png" alt="">献立投稿
    </button>
    <button class="btn btn-primary bg-base-200" @click="currentComponent = 'add'">
        <img class="w-6 inline" src="./assets/images/chef-hat.png" alt="">レシピ投稿  
    </button>
</div>


<component :is="componentList[currentComponent]" />

</template>

<script lang="ts" setup>

import { ref, shallowReactive } from "vue";
import { useUserStore } from "./store/userStore";

/**
 * Components
 */
import TheHeader from "./templates/TheHeader.vue";
import Top from "./views/Top.vue";
import Recipe from "./views/Recipe.vue";
import Menu from "./views/Menu.vue";
import AddRecipe from "./views/AddRecipe.vue";
import SignInModal from "./templates/TheSignInModal.vue";


const user_store = useUserStore()

const currentComponent = ref("top")
const componentList = shallowReactive<any>({
    top: Top,
    recipe: Recipe,
    add: AddRecipe,
    menu: Menu
})

const is_login = ref<number>(0)

const save_login = ( uid: string, token: string ) => {
    user_store.get_database_user( uid, token )

    setTimeout( () => {
        if (user_store.is_user_login) {
            is_login.value = 1
        } else {
            is_login.value = 2
        }
    }, 2500)
    setTimeout( () => {
        is_login.value = 0
    }, 7000)
}

</script>