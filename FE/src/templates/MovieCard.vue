<template>

<div class="card card-side bg-base-100 shadow-xl">
    <figure><img src="https://placeimg.com/200/280/arch" alt="Movie"/></figure>
    <div class="card-body">
        <h2 class="card-title">{{ title }}</h2>
        <div class="flex items-cente">
            <p>監督: {{ director }}</p>
            <p>公開日: {{ release }}</p>
        </div>
        <div class="flex items-cente">
            <p>主演: {{ actor1 }}, {{ actor2 }}</p>
        </div>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Watch</button>
        </div>
    </div>
</div>

</template>

<script lang="ts" setup>

const title = "猛獣大決戦2021"
const release = "2021/03/21"
const director = "宮崎ぱやお"
const sammary = "モンスターたちの戦いの後、特務機関モナークが巨大怪獣(タイタン)の故郷(ルーツ)の手掛かりを探る中、深海からゴジラが再び現れる。世界の危機を前にゴジラが暴れまわる原因を見いだせない人類は、キングコングを髑髏島(スカルアイランド)から連れ出し、ゴジラと対決させようとする。"
const actor1 = "本田椿"
const actor2 = "斎藤拓"




</script>