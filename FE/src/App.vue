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
        <a @click="current_component = 'top'" class="btn btn-ghost normal-case text-2xl"><img class="w-9" src="./assets/images/recipe-book.png" />クックストア</a>
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
                    <img v-if="!user_store.is_user_login" class="w-[80px]" src="./assets/images/user.png" />
                </div>
            </label>
            <ul v-if="!user_store.is_user_login" tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li><label class="text-lg" @click="is_register = false" for="my-modal-1">ログイン</label></li>
                <li><label class="text-lg" @click="is_register = true" for="my-modal-1">新規登録</label></li>
            </ul>
            <ul v-else tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li><a class="justify-between">マイページ</a></li>
                <li><label @click="user_store.logout_user_info()" class="">ログアウト</label></li>
            </ul>
        </div>
    </div>
</div>

  
<sign-in-modal :is-register="is_register" :id="1" />
  

<div class="text-right mr-10" v-if="user_store.is_user_login">
    <button class="btn btn-primary bg-base-200 mr-2">
        <img class="w-6 inline" src="./assets/images/writing.png" alt="">献立投稿
    </button>
    <button class="btn btn-primary bg-base-200" @click="current_component = 'add'">
        <img class="w-6 inline" src="./assets/images/chef-hat.png" alt="">レシピ投稿  
    </button>
</div>

<div v-else class="text-right mr-5 hover:opacity-80">
    <label class="btn btn-secondary" @click="is_register = false" for="my-modal-1">レシピを登録するにはログインしてください</label>
</div>


<component :is="componentList[current_component]" />

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
import SignInModal from "./views/TheSignInModal.vue";


const user_store = useUserStore()

const current_component = ref<string>("recipe")
const componentList = shallowReactive<any>({
    top: Top,
    recipe: Recipe,
    add: AddRecipe,
    menu: Menu
})

const is_register = ref<boolean>(false);
</script>