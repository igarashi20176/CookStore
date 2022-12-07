<template>

<div class="carousel w-full h-auto">
	<div v-for="i in ary">
		<div :id="`item${i}`" class="carousel-item mx-2">
			<div class="card w-96 bg-base-100 shadow-xl">
				<div class="card-body p-4">
				<h2 class="card-title">{{ title }}</h2>
				
				<p>by {{ name }}</p>
				<p>{{ content_short }}</p>
				</div>
				<figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
			</div>
		</div> 
  </div>
</div>

<div class="flex justify-center w-full py-2 gap-2">
  <a href="#item1" class="btn btn-md">1</a> 
  <a href="#item2" class="btn btn-md">2</a> 
  <a href="#item3" class="btn btn-md">3</a> 
  <a href="#item4" class="btn btn-md">4</a>
</div>

</template>

<script lang="ts" setup>

import { computed } from "vue";

const title = "2020年最高傑作間違いなし"
const content = "ホーティングオブヒルハウスが傑作ホラーであり家族ドラマだったのでこちらも鑑賞してみましたが、今作もまあまあ面白い作品でした。根本的にフラナガンはホラー作家というよりは、心の成長を描くことに長けている人なので、今作のようなハンデを背負ったキャラクターを登場させたのは、映画としてどこかのクワイエットプレイス以上に成功していたと思います。音響や撮影も良かったし、ミューズであるケイトシーゲルも安定したパフォーマンスを披露していました。真夜中のミサやホーティングオブヒルハウスの時に引っかかったカラグレも今作だとそこまで目立っていなかったのが良かったです。ただそこまでリアルな脚本じゃないし、別に心に残るような作品でもありません。尺が短いから普通に楽しめるけど、今作を見るくらいだったら傑作ホーティングオブヒルハウスを見た方が良いです。"
const name = "Jane Doe"

const ary = [1,2,3,4]

const content_short = computed(() => content.length >= 48 ? `${content.substring(0, 48)}...` : content)


</script>