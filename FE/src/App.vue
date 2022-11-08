<template>

<!-- ナビバー -->
<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>TOP</a></li>
        <li><a>MOVIES</a></li>
        <li><a>RANKING</a></li>
      </ul>
    </div>
  </div>
  <div class="navbar-center">
    <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
  </div>
  <div class="navbar-end">
    <input type="text" placeholder="Search Films" class="input input-bordered w-full max-w-xs" />
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
        <li> 
          <a href="#my-modal-1" class="">Sigh In</a>
        </li>
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

<!-- カード -->
<div class="flex flex-row flex-wrap gap-7 m-5">
  <ul v-for="i in ary">
    <li class="">
      <div class="card w-80 bg-base-100 shadow-xl">
        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</div>
</template>

<script lang="ts" setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import { ref } from "vue";


const axiosURL = "https://express-dot-moviewer-e9b49.an.r.appspot.com"

const ary = [1,2,3,4,5]
const msg = ref("")

// res.data.resultsの中に格納
const getDB = () => {
  axios.get(axiosURL + '/db')
    .then(res => msg.value = res.data)
}
// const getDB = () => {
//   axios.get(axios + '/db')
//     .then(res => msg.value = res.data)
// }
</script>