import { ref, unref, onMounted, nextTick } from '@vue/composition-api'
import { IPandoraFormItems, PandoraFormOption } from 'vue-pandora/types/VForm'
import { IPandoraTableColumn, ISortOption } from 'vue-pandora/types/VTable'
import { usePandoraForm as useForm, usePandoraTable as useTable } from 'vue-pandora'
import { http } from '@/common/request'
import { Loading } from 'element-ui'
import { keys } from 'lodash-es'
type IRequestParam = {
  url: string
  name?: string
}
/**
 * usePandora通用 hooks
 * @param searchParamRef 查询项
 * @param formItems 表单item数据
 * @param tableColumns table列数据
 * @param sortOption 排序配置
 * @param requestParam  请求接口相关配置
 * @param formOption 表单参数修改
 * @param tableOption 表格参数修改
 */
export const usePandora = (
  searchParamRef: Record<string, any>,
  formItems: IPandoraFormItems[] = [],
  tableColumns: IPandoraTableColumn[] = [],
  sortOption: ISortOption,
  requestParam: IRequestParam,
  formOption?: Record<string, any>,
  tableOption?: Record<string, any>
) => {
  // 表单表格Ref 映射template ref
  const formInstanceRef: VP.VForm = ref(null)
  const tableInstanceRef: VP.VTable = ref(null)

  // 处理初始化赋值排序参数方法
  const getDefaultSort = () => {
    const defaultSort = sortOption.defaultSort
    const sortObj = Array.isArray(defaultSort) ? defaultSort[0] : defaultSort
    const prop = sortObj?.prop
    const order = sortObj?.order
    return {
      value: order.substring(0, order.length - 6),
      order: prop
    }
  }
  const { value, order } = getDefaultSort()

  const pageInfo = ref({
    pageNumber: 1, //0
    pageSize: 20, //	页长
    orderValue: value, //	排序方式
    orderKey: order //	排序字段
  })

  // 查询按钮
  function searchFormAction(): void {
    const value = unref(formInstanceRef).getValue()
    searchParamRef = value
    if (searchParamRef.time) {
      searchParamRef.time = `${searchParamRef.time} 00:00:00`
    }
    // 个人信息安全监测预警系统 >黑产手机号监测
    if (searchParamRef.firstTime) {
      searchParamRef.firstTime = `${searchParamRef.firstTime} 00:00:00`
    }
    if (searchParamRef.endTime) {
      searchParamRef.endTime = `${searchParamRef.endTime} 23:59:59`
    }
    // 数据安全备案发现系统 >数据运营者信息
    if (searchParamRef.findTime) {
      searchParamRef.findTime = `${searchParamRef.findTime} 00:00:00`
    }
    if (searchParamRef.cancelTime) {
      searchParamRef.cancelTime = `${searchParamRef.cancelTime} 23:59:59`
    }
    // 点击查询页码初始化为1
    handleCurrentPageChange('1')
    // loadAPI()
  }

  // clear重置
  function cleanFormAction(): void {
    unref(formInstanceRef).clearValue()
  }

  // 排序
  sortOption.sortChange = function(sortProp: any) {
    const field = keys(sortProp)[0]
    const orderType = sortProp[field]
    unref(pageInfo).orderKey = field
    unref(pageInfo).orderValue = orderType.substring(0, orderType.length - 6)
    loadAPI()
  }

  // table配置项
  const tableOptRef = useTable(tableColumns, sortOption, tableOption)
  // form 配置项
  const formOptRef = useForm(
    formItems,
    [
      {
        comOpt: {
          id: 'query',
          value: '查询',
          type: 'default',
          width: 90,
          disabled: false,
          // icon: 'el-icon-search',
          click: () => {
            searchFormAction()
          }
        }
      },
      {
        comOpt: {
          id: 'reset',
          value: '重置',
          type: 'reset',
          width: 90,
          disabled: false,
          // icon: 'el-icon-refresh',
          click: () => {
            cleanFormAction()
          }
        }
      }
    ],
    formOption
  )

  function loadAPI() {
    const loadingInstance = Loading.service({
      target: `#${requestParam.name}`,
      spinner: 'el-loading-custormspinner',
      text: '数据加载中...'
    })
    const param = Object.assign(unref(searchParamRef), unref(pageInfo))
    http
      .post(requestParam.url, param)
      .then(resp => {
        const { data, total } = resp
        tableOptRef.data = data
        tableOptRef.pageOpt.total = total
        loadingInstance.close()
      })
      .catch(() => {
        tableOptRef.data = []
        tableOptRef.pageOpt.total = 0
        loadingInstance.close()
      })
  }

  onMounted(() => {
    nextTick(() => {
      loadAPI()
    })
  })

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
    formOptRef,
    formInstanceRef,
    tableInstanceRef,
    searchFormAction,
    cleanFormAction,
    handleCurrentPageChange,
    handleSizePageChange
  }
}
