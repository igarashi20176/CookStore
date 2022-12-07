<template>

<div v-for="text in get_texts(props.text.content, props.text.line_length)"> 
    <p class="text-lg font-bold text-left">{{ text }}</p>
    <div class="border-t border-[#555] mb-3" :style="{ 'width': props.text.width }"></div>
</div>

</template>


<script lang="ts" setup>

import { computed } from "vue";

const props = defineProps({
    text: { type: Object, default: { content: "", line_length: 0, width: '0px' } }
});


/**
 * 罫線一行の文字数を指定し，配列で返す
 */
 const get_texts = computed( () => {
    return ( text: string, line_length: number ):string[] => {
        const textAry: string[] = [];
        
        if ( text ) {
            for (let i = 0; i < text.length; i+=line_length) {
                textAry.push(text.substring(i, i+line_length));
            }    
            return textAry;
        } else {
            return [""];
        }
    }
});

</script>