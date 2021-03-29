<template>
  <el-tabs v-model="tabValueRef" id="Detail">
    <el-tab-pane v-for="item in tabRef" :key="item.value" :label="item.name" :name="item.value">
      <div slot="label">
        {{ item.name }}
      </div>
      <slot name="content" :option="item" />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
type ITabs = {
  name: string
  value: string
}
import { defineComponent, ref, PropType } from '@vue/composition-api'
/**
 * 页签类组件容器类
 * Tab 对应 每个表格
 *
 **/
export default defineComponent({
  name: 'TabsContainer',
  props: {
    value: String,
    // 页签头对象
    tabs: {
      type: Array as PropType<ITabs[]>,
      default: () => {
        return []
      }
    }
  },
  setup(props) {
    const tabValueRef = ref(props.value)
    const tabRef = ref(props.tabs)
    return {
      tabRef,
      tabValueRef
    }
  }
})
</script>
<style module="tabsContainer">
.container {
  width: 100%;
  height: 100%;
  min-width: 900px;
}
</style>
