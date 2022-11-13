<template>

<div class="card bg-base-100 h-96 rounded-2xl shadow-xl">
    <div class="card-body p-3">
        <h2 class="card-title">{{ title }}</h2>
        <div class="flex items-center gap-x-2">
            <img class="w-10 rounded-full" src="https://placeimg.com/80/80/people" />
            <p>{{ name }}</p>
            <p>カテゴリー: {{ category }}</p>
        </div>
        <star-rating
             v-model:rating="props.ratingNumber"
             v-bind:increment="0.5"
             v-bind:star-size="20"
             :show-rating="true"
             :read-only="true"
        />
        <p class="p-1">{{ content_short }}</p>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Detail</button>
        </div>
    </div>
</div>

</template>

<script lang="ts" setup>

import { computed, ref } from "vue";
import StarRating from 'vue-star-rating'

const title = "2020年最高傑作間違いなし"
const content = "ホーティングオブヒルハウスが傑作ホラーであり家族ドラマだったのでこちらも鑑賞してみましたが、今作もまあまあ面白い作品でした。根本的にフラナガンはホラー作家というよりは、心の成長を描くことに長けている人なので、今作のようなハンデを背負ったキャラクターを登場させたのは、映画としてどこかのクワイエットプレイス以上に成功していたと思います。音響や撮影も良かったし、ミューズであるケイトシーゲルも安定したパフォーマンスを披露していました。真夜中のミサやホーティングオブヒルハウスの時に引っかかったカラグレも今作だとそこまで目立っていなかったのが良かったです。ただそこまでリアルな脚本じゃないし、別に心に残るような作品でもありません。尺が短いから普通に楽しめるけど、今作を見るくらいだったら傑作ホーティングオブヒルハウスを見た方が良いです。"
const name = "たけし"
const category = "考察"

const star = ref(3.5)

const content_short = computed(() => content.length >= 150 ? `${content.substring(0, 150)}...` : content)

const props = defineProps({
    ratingNumber: Number
})
</script>

