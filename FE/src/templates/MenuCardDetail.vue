<template>

<div class="lg:flex flex-row">

    <div class="m-6 p-5 border-2 border-base-300 rounded-lg w-[93%] lg:w-[950px]">

        <!-- 投稿者・タイトル -->
        <div class="mb-5">
            <button @click="emits('change-view')" class="btn btn-primary">◀ 戻る</button>
            <p class="inline text-2xl ml-7 pb-2 pl-2 border-l-8 border-orange-400"><span class="text-base">投稿者:</span> {{ props.menu.get_authorName() }} <span class="text-base">作成日: {{ props.menu.get_created_at() }}</span></p>
        </div>

        <label class="block font-bold mr-5" for="title">★献立名</label>
        <h3 class="inline text-4xl font-bold border-b border-[#333]">{{ props.menu.get_title() }}</h3>

        <!-- メニューに登録した料理の概要 -->
        <div class="w-full mt-10">
            <figure class="mt-5">
                <ul class="flex-row lg:flex lg:flex-wrap lg:gap-10">
                    <li v-for="image_info in [props.menu.get_staple(), props.menu.get_main(), props.menu.get_sub(), props.menu.get_soup()]">
                        <RecipeImage :recipe-info="image_info" />
                    </li>
                </ul>
            </figure>
        </div>

        <!-- キャッチコピー -->
        <div>      
            <div class="flex flex-col w-[400px]">
                <div class="my-5">
                    <label class="block text-center font-bold mb-3" for="title">★キャッチコピー</label>
                    <div class="ml-12" v-for="text in get_texts(props.menu.get_soup().description, 15)"> 
                        <p class="text-xl font-bold text-left">{{ text }}</p>
                        <div class="border-t border-[#555] w-[300px] mb-3"></div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- コメント欄 -->
    <div class="m-4 lg:mt-6 lg:mr-3 p-5 lg:w-[calc(100%_-_950px)] border-2 border-base-300 rounded-md">
        <h3 class="text-center text-2xl mb-5">みんなのコメント</h3>
        <ul v-for="comment in comments">
            <li>
                <div class="flex flex-col w-full border-opacity-50">
                    <div class="grid h-auto card bg-base-200 rounded-box place-items-center p-3">
                        <p>by {{ comment.name }} {{ comment.createdAt }}</p>
                        <p>{{ comment.body }}</p>
                    </div>
                    <div class="divider"></div>
                </div>
            </li>
        </ul>
    </div>

</div>

</template>

<script lang="ts" setup>

import { computed } from "vue";
import { Comment } from "../models/Types";

import RecipeImage from "./TheImageWithTitle.vue";

const props = defineProps({
    menu: { type: Object, required: true }
})
const emits = defineEmits([ 'change-view' ])


const comments: Comment[] = [
    {
        name: "Jon Doe",
        body: "昨日家族に作りましたが，美味しいと好評でした!短時間で作れてこんなに感謝されるのはお得ですね^^",
        createdAt: "2022-05-21",
    },
    {
        name: "Maxine",
        body: "少し味付けが薄かったので塩コショウを足しました",
        createdAt: "2022-08-01",
    },
    {
        name: "yayaya",
        body: "私もこれ良く作ってます!一週間たつとふと食べたくなるんですよね~",
        createdAt: "2022-01-10",
    }
];


const get_texts = computed( () => {
    return ( text: string, line_length: number ):string[] | string => {
        const textAry: string[] = [];
        
        if ( text ) {
            for (let i = 0; i < text.length; i+=line_length) {
                textAry.push(text.substring(i, i+line_length));
            }    
            return textAry;
        } else {
            return "";
        }
    }
});
    
</script>