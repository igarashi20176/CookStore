<template>

<!-- ログインの可否を表示  -->
<div class="z-10 top-24 toast toast-top toast-end">
  <div v-if="is_login && !(is_login === undefined)" class="alert alert-success">
    <div>
      <span class="font-bold">ログインに成功しました</span>
    </div>
  </div>
  <div v-if="!is_login && !(is_login === undefined)" class="alert alert-error">
    <div>
      <span class="font-bold">ログインに失敗しました</span>
    </div>
  </div>
</div>

<!-- signin & register modal -->
<input type="checkbox" :id="`my-modal-${props.id}`" class="modal-toggle" />
<div class="modal" v-if="!props.isLogin">

    <div class="modal-box relative">
        <label :for="`my-modal-${props.id}`" class="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div class="ml-10">
            <a href="#" class="underline text-orange-400 hover:opacity-70" @click.prevent="is_register = !is_register">{{ !is_register ? "新規登録" : "ログイン" }}</a>
            <h2 class="font-bold text-2xl text-center mb-5">{{ is_register ? "新規登録" : "ログイン" }}</h2>

            <h3 class="font-bold text-base text-center mb-2">ログイン情報</h3>
            <div v-show="errMsg" class="my-3 text-center text-red-500 font-bold">{{ errMsg }}</div>
            <div class="text-center">
                <input type="text" v-model="input_user_info.email" placeholder="Eメール" class="mb-3 ml-2 input input-bordered w-full max-w-xs" />
                <input type="text" v-model="input_user_info.password" placeholder="パスワード" class="mb-3 ml-2 input input-bordered w-full max-w-xs" />
            </div>

            <div v-if="is_register" class="text-center">
                <h3 class="font-bold text-base text-center mt-5 mb-2">ユーザ情報</h3>

                <input v-model="input_user_info.name" type="text" placeholder="ユーザネーム" class="mb-3 input input-bordered w-full max-w-xs" />
                <input v-model="input_user_info.age" type="number" min="0" placeholder="年齢" class="mb-3 input input-bordered w-full max-w-xs" />
                <label class="block" for="gener">性別を選択してください</label>
                <select v-model="input_user_info.gender" id="gender" class="select select-bordered text-xl font-normal w-full max-w-xs">
                    <option value="0">女性</option>
                    <option value="1">男性</option>
                    <option value="2">その他</option>
                    <option value="3">回答しない</option>
                </select>
            </div>

            <div class="text-center mt-5">
                <label @click="register_and_signin" class="btn btn-success">{{ is_register ? "新規登録" : "ログイン" }}</label>
            </div>
        </div>
    </div>

</div>

</template>

<script lang="ts" setup>

import { ref } from "vue";
import { AddUserInfo } from "../models/Types";
import { useUserStore } from "../store/userStore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth } from "../firebase/index";

/**
 * Pinia Store
 */
const user_store = useUserStore();

const props = defineProps({
    id: { type: Number, default: 0 },
    isRegister: { type: Boolean, required: true },
    isLogin: { type: Boolean, required: true }
});


const is_login = ref<boolean | undefined>(undefined);
const is_register = ref<boolean>(props.isRegister);

const input_user_info = ref<AddUserInfo>({
    email: "",
    password: "",
    name: "",
    age: null,
    gender: null,
})
const errMsg = ref<string>("");


const register_and_signin = () => {
    if ( is_register.value ) {
        createUserWithEmailAndPassword(auth, input_user_info.value.email, input_user_info.value.password)
        .then ( res => {
            user_store.register_database_user( res.user.uid, input_user_info.value )
        })
        .catch ( e => alert("登録に失敗しました。もう一度お試しください"))
        .then( () => {
            signIn();
            reset_info();
        });
    } else {
        signIn();
        reset_info();
    }    
}

const signIn = () => {
    signInWithEmailAndPassword(auth, input_user_info.value.email, input_user_info.value.password)
    .then( res => {
        res.user.getIdTokenResult()
        .then( credential => {            
            user_store.get_from_database_user(res.user.uid, credential.token)
            .then( success => {
                is_login.value = success;
            })
            .catch( error => is_login.value = error )
            .then( () => {
                setTimeout( () => {
                    is_login.value = undefined;
                }, 3000);
            });
        });
    })
    .catch ( error => {
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
    });
}

const reset_info = () => {
    input_user_info.value = ({
        email: "",
        password: "",
        name: "",
        age: null,
        gender: null,
    })
}

</script>