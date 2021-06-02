<template>
  <div id='app'>
    hello-world
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    console.log('app start')
  },
  mounted() {
    console.log('app mounted')
  },
  destroyed() {
    console.log('app destroy')
  }
}
</script>

<style lang="less">
</style>
