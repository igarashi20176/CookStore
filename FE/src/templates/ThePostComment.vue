<template>

<label for="my-modal" class="btn btn-primary"><slot></slot></label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal" class="modal-toggle" />
<div class="modal">
    <div class="modal-box">
        <label for="my-modal" class="btn btn-primary btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h3 class="text-lg font-bold mb-5 text-center">コメントする</h3>
        <div class="text-center">
            <div class="ml-20 flex items-end gap-x-6">
                <textarea v-model="comment" class="textarea textarea-primary" row="40" col="40" placeholder="Bio"></textarea>
                <label for="my-modal" @click="emits('post-comment', comment)" class="btn btn-primary modal-action">投稿する！</label>
            </div>
        </div>
    </div>
</div>

</template>

<script lang="ts" setup>

import { ref } from "vue";


const emits = defineEmits([ 'post-comment' ]);

const comment = ref<string>("")

</script>