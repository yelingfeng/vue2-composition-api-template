<template>
  <div :id="containerId" class="page-container">
    <div class="search-form" ref="formBox">
      <BorderBox title="">
        <slot name="form" :style="formStyleComputed"></slot>
      </BorderBox>
    </div>
    <div class="search-list" :style="tableStyleComputed">
      <BorderBox title="">
        <slot name="table" :tableHeight="tableHeight"></slot>
      </BorderBox>
    </div>
    <el-dialog title="详情" width="80%" :visible.sync="dialogVisible" :id="DetailRef" top="2%">
      <slot name="detail"></slot>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button type="reset" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useContainerStyle } from '@/hooks/useContainerStyle'
export default defineComponent({
  props: {
    // 容器id
    containerId: String
  },
  setup(props) {
    const DetailRef = ref(`${props.containerId}-Detail`)
    const dialogVisible = ref(false)
    return {
      DetailRef,
      dialogVisible,
      ...useContainerStyle()
    }
  }
})
</script>
<style scoped>
.page-container {
  width: 100%;
  height: 100%;
  min-width: 900px;
}

.search-form {
  position: relative;
}
.search-list {
  margin-top: 15px;
}

.formLeft {
  width: 93%;
  display: inline-block;
  vertical-align: middle;
  max-width: calc(100% - 170px);
}
.tableBox {
  height: calc(100% - 120px);
}

.form > span {
  position: absolute;
  right: 5px;
  top: 26px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
}
.btnArrow {
  font-size: 22px;
  position: absolute;
  top: 30%;
  right: 10px;
  cursor: pointer;
}
.btnGroup {
  right: 15px;
  top: 43%;
  width: auto;
}
</style>
