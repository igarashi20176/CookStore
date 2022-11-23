<template>

<!-- Put this part before </body> tag -->
<input type="checkbox" :id="`my-modal-${props.id}`" class="modal-toggle" />
<div class="modal">
    <div class="modal-box relative">
        <label :for="`my-modal-${props.id}`" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div class="ml-10">
            <h3 class="font-bold text-2xl text-center mb-5">ログイン</h3>
            <div v-show="errMsg" class="my-3 text-center text-red-500 font-bold">{{ errMsg }}</div>
            <div class="text-center">
                <input type="text" v-model="email" placeholder="Eメール" class="mb-3 ml-2 input input-bordered w-full max-w-xs" />
                <input type="text" v-model="password" placeholder="パスワード" class="mb-3 ml-2 input input-bordered w-full max-w-xs" />
            </div>
            <div class="modal-action justify-center m-3">
                <label :for="`my-modal-${props.id}`" @click="signIn" class="btn btn-success">ログイン</label>
            </div>
        </div>
    </div>
</div>

</template>

<script lang="ts" setup>

import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/index";
import { emit } from "process";


const props = defineProps({
    id: { type: Number, default: 0 }
})
const emits = defineEmits([ 'save-login-info' ])

let email = ref<string>("");
let password = ref<string>("");
let errMsg = ref<string>("");


/**
 * ログインしたユーザ情報を送vuexに送信
 */
const signIn = () => {

    signInWithEmailAndPassword(auth, email.value, password.value)
    .then( res => {
        res.user.getIdTokenResult()
        .then( credential => {
            emits('save-login-info', res.user.uid, credential.token) 
        })
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

</script>