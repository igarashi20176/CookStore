<template>

<!-- ログインの可否を表示  -->
<Toast :condition="notice" :suc-str="'ログインに成功しました'" :err-str="'ログインに失敗しました'" />


<!-- signin & register modal -->
<input type="checkbox" :id="`my-modal-${props.modalId}`" class="modal-toggle" />
<div class="modal" v-if="!props.isLogin">

    <div class="modal-box relative">
        <label :for="`my-modal-${props.modalId}`" class="absolute right-2 top-2 btn btn-primary btn-sm btn-circle">✕</label>
        <div class="ml-10">
            <a href="#" class="underline text-orange-400 hover:opacity-70" @click.prevent="is_register = !is_register">{{ !is_register ? "新規登録" : "ログイン" }}</a>
            <h2 class="font-bold text-2xl text-center mb-5">{{ is_register ? "新規登録" : "ログイン" }}</h2>

            <!-- ログインに必要な入力情報 -->
            <h3 class="mb-2 font-bold text-base text-center">ログイン情報</h3>
            <div v-show="errMsg" class="my-3 text-center text-red-500 font-bold">{{ errMsg }}</div>
            <div class="text-center">
                <input type="text" v-model="input_user_info.email" placeholder="Eメール" class="mb-3 ml-2 input input-bordered w-full max-w-xs" />
                <input type="text" v-model="input_user_info.password" placeholder="パスワード" class="mb-3 ml-2 input input-bordered w-full max-w-xs" />
            </div>

            <!-- 新規登録に必要な追加情報 -->
            <div v-if="is_register" class="text-center">
                <h3 class="mt-5 mb-2 font-bold text-base text-center">ユーザ情報</h3>

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

            <div class="mt-5 text-center">
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
import { useRecipeStore } from "../store/recipeStore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth } from "../firebase/index";

import Toast from "../parts/TheToast.vue";

/**
 * Pinia Store
 */
const user_store = useUserStore();
const recipe_store = useRecipeStore();


const props = defineProps({
    modalId: { type: Number, default: 0 },
    isRegister: { type: Boolean, required: true },
    isLogin: { type: Boolean, default: false }
});
const emits = defineEmits([ 'change-view' ]);


// ログインの可否を判定し，Toastで告知
const notice = ref<boolean | undefined>(undefined);
// サインインか新規登録かの切り替え
const is_register = ref<boolean>(props.isRegister);

const input_user_info = ref<AddUserInfo>({
    email: "test@gmail.com",
    password: "test_1234",
    name: "",
    age: null,
    gender: null,
})


const register_and_signin = () => {
    if ( is_register.value ) {
        createUserWithEmailAndPassword(auth, input_user_info.value.email, input_user_info.value.password)
        .then ( res => {
            res.user.getIdTokenResult()
            .then( credential => {  
                user_store.register_user_account( res.user.uid, credential.token, input_user_info.value )
                .then( () => {
                    signIn();
                    reset_info();
                })
                .catch ( e => {
                    deleteUser(res.user);
                    alert("登録に失敗しました。もう一度お試しください");
                });
            });
        })
        .catch ( e => alert("登録に失敗しました。もう一度お試しください"));

    } else {
        signIn();
        reset_info();
    }    
}


const errMsg = ref<string>("");

const signIn = () => {
    signInWithEmailAndPassword(auth, input_user_info.value.email, input_user_info.value.password)
    .then( res => {
        res.user.getIdTokenResult()
        .then( credential => {            
            user_store.get_user_account(res.user.uid, credential.token)
            .then( success => {
                notice.value = success;
                recipe_store.get_all_recipes();
                emits('change-view', 'recipe');
            })
            .catch( error => notice.value = error )
            .then( () => {
                setTimeout( () => {
                    notice.value = undefined;
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