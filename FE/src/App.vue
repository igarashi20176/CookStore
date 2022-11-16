<template>

<!-- ナビバー -->
<!-- <the-header /> -->
<div class="navbar bg-base-200 mb-10">
    <div class="navbar-start">
        <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
                <li><a @click="currentComponent = 'top'">TOP</a></li>
                <li><a @click="currentComponent = 'recipe'">RECIPE</a></li>
                <li><a @click="currentComponent = 'detail'">DETAIL</a></li>
            </ul>
        </div>
    </div>

    <div class="navbar-center">
        <a @click="currentComponent = 'top'" class="btn btn-ghost normal-case text-2xl"><img class="w-9" src="./assets/images/recipe-book.png" />CookStore</a>
    </div>
    <div class="navbar-end">
        <input type="text" placeholder="レシピを探そう!" class="input input-bordered w-full max-w-xs" />
        <button class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
  
    <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
            </div>
        </label>
        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li>
                <a class="justify-between">
                Profile
                <span class="badge">New</span>
                </a>
            </li>
            <li><a href="#my-modal-1" class="">Sigh In</a></li>
            <li><a href="#my-modal-2" class="">Register</a></li>
            </ul>
        </div>
    </div>
</div>
  
<div class="modal" id="my-modal-1">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Sign In</h3>
        <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
        <div class="modal-action">
            <a href="#" class="btn">Yay!</a>
        </div>
    </div>
</div>
  
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

<!-- カード -->
<!-- <review /> -->
<component :is="componentList[currentComponent]" />

</template>

<script lang="ts" setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import axios from 'axios'
import { ref, shallowReactive } from "vue";


/**
 * Components
 */
import TheHeader from "./templates/TheHeader.vue";
import Top from "./views/Top.vue";
import Recipe from "./views/Recipe.vue";
import AddRecipe from "./views/AddRecipe.vue";
import Detail from "./templates/RecipeCardDetail.vue";

const currentComponent = ref("detail")
const componentList = shallowReactive<any>({
    top: Top,
    recipe: Recipe,
    add: AddRecipe,
    detail: Detail
})

const axiosURL = "https://express-dot-moviewer-e9b49.an.r.appspot.com"


const msg = ref("")
// res.data.resultsの中に格納
const getDB = () => {
  axios.get(axiosURL + '/db')
    .then(res => msg.value = res.data)
}
</script>