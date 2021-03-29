<template>
  <VTable
    :option="tableOptRef"
    :height="height"
    @handleSizePageChange="handleSizePageChange"
    @handleCurrentPageChange="handleCurrentPageChange"
  ></VTable>
</template>
<script lang="ts">
import { defineComponent, ref, unref, PropType, nextTick, watch, onMounted } from '@vue/composition-api'
import { usePandoraTable } from 'vue-pandora'
import { Loading } from 'element-ui'
import { keys } from 'lodash-es'
import { ITabTables } from './types'
export default defineComponent({
  name: 'Tabs_BaseTable',
  props: {
    tableOption: {
      type: Object as PropType<ITabTables>,
      default() {
        return {}
      }
    },
    height: String
  },
  setup(props, { emit }) {
    const { getTableColumns, getTableSortOption, getTableHttp } = props.tableOption

    const pageInfo = ref({
      compName: '',
      pageNumber: 1, //0
      pageSize: 20, //	页长
      orderValue: '', //	排序方式
      orderKey: '' //	排序字段
    })

    onMounted(() => {
      // console.log(props.tableOption)
    })

    watch(
      () => props.compName,
      (newVal, oldVal) => {
        pageInfo.value.compName = newVal
        nextTick(() => {
          loadAPI()
        })
      }
    )

    function loadAPI() {
      const loadingInstance = Loading.service({
        spinner: 'el-loading-custormspinner',
        text: '数据加载中...'
      })
      pageInfo.value.compName = props.compName
      getTableHttp(unref(pageInfo))
        .then(resp => {
          const { data, total } = resp
          tableOptRef.data = data
          tableOptRef.pageOpt.total = total
          //向上汇总total
          emit('updateTotal', { name: props.name, value: total })
          loadingInstance.close()
        })
        .catch(() => {
          loadingInstance.close()
        })
    }
    // 排序
    getTableSortOption.sortChange = function(sortProp: any) {
      const field = keys(sortProp)[0]
      const orderType = sortProp[field]
      unref(pageInfo).orderKey = field
      unref(pageInfo).orderValue = orderType.substring(0, orderType.length - 6)
      loadAPI()
    }
    const tableOptRef = usePandoraTable(getTableColumns(), getTableSortOption)

    // 分页相关回调
    function handleCurrentPageChange(val: any) {
      unref(pageInfo).pageNumber = val
      loadAPI()
    }
    function handleSizePageChange(val: any) {
      unref(pageInfo).pageSize = val
      loadAPI()
    }

    return {
      tableOptRef,
      handleCurrentPageChange,
      handleSizePageChange
    }
  }
})
</script>
