<script setup lang="ts">
import 'normalize.css'
import { useRouter } from 'vue-router';
const router = useRouter()
onBeforeMount(() => {
    console.log('onBeforeMount')
})
onMounted(() => {
    console.log('onMounted')
})
</script>
<template>
    <el-text @click="router.push('/')" class="mx-1">home</el-text>
</template>
<style lang="scss" scoped></style>