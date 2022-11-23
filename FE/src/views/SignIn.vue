<template>

<div class="mt-20 ml-10">
    Email<input type="text" v-model="email" placeholder="Type here" class="mb-3 input input-bordered w-full max-w-xs" /><br>
    PassWord<input type="text" v-model="password" placeholder="Type here" class="mb-3 input input-bordered w-full max-w-xs" /><br>
    <p class="bg-orange-400 inline m-6 p-2 rounded-xl">認証</p>
    <button @click="signIn" class="btn btn-success">サインイン</button>
    <div>{{ token_d }}</div>
    <div v-if="token_d"><button @click="axios_get" class="btn">axios</button></div>
</div>

</template>

<script lang="ts" setup>

import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/index";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
  

let email = ref<string>("");
let password = ref<string>("");
let token_d = ref<any>()
let errMsg = ref<string>("");


/**
 * ログインしたユーザ情報を送vuexに送信
 */
const signIn = () => {

    signInWithEmailAndPassword(auth, email.value, password.value)
    .then( res => {
        res.user.getIdTokenResult()
        .then( credential => {
            token_d.value = credential.token;
        } )
    })
    .catch (error => {
            console.log(error.code);
            switch (error.code) {
            case "auth/invalid-email":
            errMsg.value = "Emailが無効です"
            break
            case "auth/wrong-password":
            errMsg.value = "パスワードが間違っています"
            break
            case "auth/user-not-found":
            errMsg.value = "Emailに紐づくユーザが見つかりませんでした"
            break
            default:
            errMsg.value = "Emailかパスワードが間違っています"
            break
            }
        })
    }

const axios_get = () => {
    axios.get('https://authcloudrun-x3e22bo5za-an.a.run.app/api/v1/users', {
        headers: {
          Authorization: `Bearer ${token_d.value}`,
        }
    })
    .then( res => {
        const { data, status } = res;
        data.forEach( (d: any) => {
            console.log(d);
        });
    } )
}
</script>