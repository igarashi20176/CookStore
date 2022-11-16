<template>

<div class="card card-side bg-base-200 shadow-xl">
    <figure>
        <img class="pl-2 rounded-2xl" src="https://dummyimage.com/350x300/000/fd7e00" alt="Movie"/>
    </figure>

    <div class="card-body w-[290px]">
        <div class="tooltip tooltip-primary font-bold" :data-tip="title">
            <h2 class="card-title">{{ title_short }}</h2>
        </div>
        <div class="flex items-center gap-x-2">
            <p>by {{ name }}</p>
            <p>投稿日: {{ release }}</p>
        </div>
        <div class="flex py-2">
            <p>{{ content_short }}</p>
        </div>


        <div class="flex items-center gap-x-4">
            <div class="tooltip tooltip-primary" data-tip="いいね">
                <button><img class="w-8" src="../assets/images/heart.png" alt=""></button>
                <p class="inline m-1">53</p>
            </div>
            <div class="tooltip tooltip-primary" data-tip="ブックマーク">
                <button><img class="w-8" src="../assets/images/notebook.png" alt=""></button>
                <p class="inline m-1 ">22</p>
            </div>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">詳しく</button>
            </div>
        </div>

    </div>
</div>

</template>

<script lang="ts" setup>

import { computed } from "vue";

const title = "とろーり濃厚 ほくほくかぼちゃスープ"
const name = "Alex"
const release = "2021/03/21"
const content = "ホーティングオブヒルハウスが傑作ホラーであり家族ドラマだったのでこちらも鑑賞してみましたが、今作もまあまあ面白い作品でした。根本的にフラナガンはホラー作家というよりは、心の成長を描くことに長けている人なので、今作のようなハンデを背負ったキャラクターを登場させたのは、映画としてどこかのクワイエットプレイス以上に成功していたと思います。音響や撮影も良かったし、ミューズであるケイトシーゲルも安定したパフォーマンスを披露していました。真夜中のミサやホーティングオブヒルハウスの時に引っかかったカラグレも今作だとそこまで目立っていなかったのが良かったです。ただそこまでリアルな脚本じゃないし、別に心に残るような作品でもありません。尺が短いから普通に楽しめるけど、今作を見るくらいだったら傑作ホーティングオブヒルハウスを見た方が良いです。"


const title_short = computed(() => title.length >= 14 ? `${title.substring(0, 14)}...` : title)
const content_short = computed(() => content.length >= 66 ? `${content.substring(0, 66)}...` : content)



</script>