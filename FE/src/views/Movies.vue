<template>

<div class="flex flex-row flex-wrap gap-7 m-5">
     <ul v-for="i in ary">
        <li :key="i"><movie-card /></li>
    </ul>
</div>

</template>

<script lang="ts" setup>

import MovieCard from "../templates/MovieCard.vue";

const ary = [1,2,3,4,5]

</script>