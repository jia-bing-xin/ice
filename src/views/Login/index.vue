<script setup lang="ts">
import { useEmitt } from '@/hooks/useEmitt'
import { useI18n } from '@/hooks/useI18n';
import { useRouter } from 'vue-router';
const router = useRouter()
const { t, locale } = useI18n()
const emitter = useEmitt()
const handleChange = () => {
    if (localStorage.getItem('lang') === 'zh_CN') localStorage.setItem('lang', 'en')
    else localStorage.setItem('lang', 'zh_CN')
    locale.value = localStorage.getItem('lang')
    emitter.emit('lang', localStorage.getItem('lang'))
    router.push('/home')
}
</script>
<template>
    <el-button type="primary" @click="handleChange"><i-line-md:account-add />{{ t('login.login') }}</el-button>
    <br>
    <el-date-picker type="date" placeholder="Pick a day" />
</template>
<style  scoped></style>