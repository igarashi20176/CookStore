<template>
    
<div class="z-10 top-24 toast toast-top toast-end">
    <div v-if="props.condition && !(props.condition === null)" class="alert alert-success">
        <div>
            <span class="font-bold">{{ props.sucStr }}</span>
        </div>
    </div>
    <div v-if="!props.condition && !(props.condition === null)" class="alert alert-error">
        <div>
            <span class="font-bold">{{ props.errStr }}</span>
        </div>
    </div>
</div>

</template>

<script lang="ts" setup> 

const props = defineProps({
    condition: { type: null, default: null },
    sucStr: { type: String, default: "成功しました" },
    errStr: { type: String, default: "失敗しました" },
});

</script>