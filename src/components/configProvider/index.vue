<script setup lang="ts">
import { useEmitt } from '@/hooks/useEmitt'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
const locale = ref((localStorage.getItem('lang') === 'zh_CN' || !localStorage.getItem('lang')) ? zhCn : en)

useEmitt({
  name: 'lang', callback: (e: string): void => {
    locale.value = e === 'zh_CN' ? zhCn : en
  }
})

</script>

<template>
  <el-config-provider :locale="locale">
    <slot></slot>
  </el-config-provider>
</template>