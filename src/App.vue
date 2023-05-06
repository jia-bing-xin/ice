<script setup lang="ts">
import configProvider from '@/components/configProvider/index.vue'
</script>

<template>
  <config-provider>
    <RouterView #="{ Component }">
      <template v-if="Component">
        <!-- <Transition name="el-fade-in"> -->
        <component :is="Component" />
        <!-- </Transition> -->
      </template>
    </RouterView>
  </config-provider>
</template>