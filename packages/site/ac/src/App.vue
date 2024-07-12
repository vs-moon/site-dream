<template>
  <ElConfigProvider size="large">
    <RouterView />
  </ElConfigProvider>
</template>

<script setup>
defineOptions({
  name: 'App'
})
</script>

<style lang="scss" scoped />
