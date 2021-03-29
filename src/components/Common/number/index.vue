<!--
 * @Description: 
 * @Autor: niumiaomiao
 * @Date: 2020-05-28 10:09:39
 * @LastEditors: niumiaomiao
 * @LastEditTime: 2020-06-17 15:40:53
-->
<template>
  <div :class="numberCom.number" :style="colorStyle">
    <number :renderData="total"></number>
    <slot>
      <span :class="numberCom.unit">{{ unit }}</span>
    </slot>
  </div>
</template>
<script>
import number from './canvans.vue'
export default {
  data() {
    return {
      total: ''
    }
  },
  mounted() {
    this.total = this.number
  },
  props: ['number', 'color', 'size', 'unit'],
  components: {
    number
  },
  computed: {
    colorStyle() {
      return {
        color: this.color,
        fontSize: this.size + 'px'
      }
    }
  },
  watch: {
    number(val) {
      this.total = val
    }
  }
}
</script>
<style module="numberCom">
.number {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
.unit {
  font-size: 12px !important;
  margin-left: 5px;
}
</style>
