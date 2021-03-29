<template>
  <div id="app">
    <TestDemo />
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
// import Demo from '@/views/demo'
import TestDemo from '@/views/Test.vue'
export default defineComponent({
  components: {
    // Demo
    TestDemo
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f6f8f9;
  height: 100%;
  text-align: center;
}
</style>
