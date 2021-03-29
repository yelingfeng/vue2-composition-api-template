#! /bin/bash

NAME=$1

FILE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../src/views" && pwd)

re="[[:space:]]+"

if [ "$#" -ne 1 ] || [[ $NAME =~ $re ]] || [ "$NAME" == "" ]; then
  echo "Usage: yarn gc \${name} with no space"
  exit 1
fi

DIRNAME="$FILE_PATH/$NAME"
INPUT_NAME=$NAME

if [ -d "$DIRNAME" ]; then
  echo "$NAME component already exists, please change it"
  exit 1
fi
NORMALIZED_NAME=""
for i in $(echo $NAME | sed 's/[_|-]\([a-z]\)/\ \1/;s/^\([a-z]\)/\ \1/'); do
  C=$(echo "${i:0:1}" | tr "[:lower:]" "[:upper:]")
  NORMALIZED_NAME="$NORMALIZED_NAME${C}${i:1}"
done
NAME=$NORMALIZED_NAME


mkdir -p "$DIRNAME"
mkdir -p "$DIRNAME/api"
mkdir -p "$DIRNAME/detail"
mkdir -p "$DIRNAME/pandora"

cat > $DIRNAME/api/getDetail.ts <<EOF
import { http } from '@/common/request'
export const getDetailAPI = config => {
  return http.post('/${INPUT_NAME}/${INPUT_NAME}Details', config)
}
EOF

cat > $DIRNAME/detail/baseInfo.vue <<EOF
<template>
  <div id="${INPUT_NAME}-DetailComponent"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
export default defineComponent({
  props: {
    baseData: Object
  },
  setup(props) {
    onMounted(() => {
      console.log(props.baseData)
    })
  }
})
</script>
<style></style>
EOF


cat > $DIRNAME/pandora/formConfig.ts <<EOF
import { IPandoraFormItems } from 'vue-pandora/types/VForm'
import { getLocalStorage } from '@/utils/cookiesUtil'
import { selectDataModule } from '@/store/modules/selectData'

const storeSelectDatas = selectDataModule.appStoreData.length ? selectDataModule.appStoreData : getLocalStorage('appStoreData')
const provincesSelectDatas = selectDataModule.provincesData.length ? selectDataModule.provincesData : getLocalStorage('provincesData')

const searchProp = {
  appName: '',
  provinceCode: '',
  appStoreCode: '',
  firstOnlineStartTime: '',
  firstOnlineEndTime: ''
}

const props = [
  {
    label: 'APP名称：',
    type: 'text',
    comOpt: {
      id: 'appName',
      width: 210,
      disabled: false,
      value: ''
    }
  },
  {
    label: '应用商店：',
    type: 'select',
    comOpt: {
      id: 'appStoreCode',
      width: 210,
      disabled: false,
      placeholder: '请选择应用商店',
      value: '',
      data: storeSelectDatas
    }
  },
  {
    label: '首次上架时间：',
    type: 'date',
    wrap: true,
    comOpt: {
      id: 'firstOnlineTime',
      type: 'daterange',
      width: 210,
      disabled: false,
      value: '',
      dateOption: {
        clearable: true,
        rangeSeparator: '至',
      }
    }
  },
  {
    label: '属地：',
    type: 'select',
    comOpt: {
      id: 'provinceCode',
      width: 210,
      disabled: false,
      value: '',
      placeholder: '请选择属地',
      data: provincesSelectDatas
    }
  }
]

export const getFormItems = () => {
  return props as IPandoraFormItems[]
}
export const getFormSearchParams = () => {
  return searchProp
}
EOF

cat > $DIRNAME/pandora/tableConfig.ts <<EOF
import { IPandoraTableColumn } from 'vue-pandora/types/VTable'
import { cloneDeep } from 'lodash-es'
const columns = [
  { name: '序号', value: 'orderNum', width: 60, align: 'center' },
  { name: 'APP图标', value: 'appIcon', width: 80, align: 'center' },
  { name: 'APP名称', value: 'appName', minWidth: 120, align: 'center' },
  { name: '版本', value: 'versionName', minWidth: 80, align: 'center' },
  { name: '属地', value: 'provinceName', minWidth: 80, align: 'center' },
  { name: '上报商店', value: 'appStoreName', minWidth: 200, align: 'center' },
  { name: '主办单位', value: 'appDevInfo', minWidth: 100, align: 'center' },
  { name: '首次上架时间', value: 'fisrtOnlineTime', minWidth: 120, align: 'center' },
  { name: '最近更新时间', value: 'updateTime', minWidth: 100, align: 'center' },
  { name: '类别', value: 'appCategory', minWidth: 100, align: 'center' },
  {
    name: '下载量',
    value: 'download',
    minWidth: 100,
    align: 'center',
    sortable: true,
    formatter: row => {
      return String(row.download)
    }
  },
  { name: '在架状态', value: 'onlineStatus', minWidth: 100, align: 'center' }
]
const operationsColumn = {
  name: '操作',
  value: '',
  align: 'center',
  fixed: 'right',
  width: 110,
  operations: [
    {
      label: '详情',
      disCallBack() {
        return false
      },
      type: 'button',
      iconName: 'detIcon iconWiringCommon',
      handlerClick: (e: any) => {}
    }
  ]
}
// 排序
export const getTableSortOption = () => {
  return {
    defaultSort: [{ prop: 'download', order: 'ascending' }]
  }
}
// 正常列
export const getTableColumns = () => {
  return cloneDeep(columns) as IPandoraTableColumn[]
}

// 操作列
export const getTableOperationsColumns = (click: Function) => {
  operationsColumn.operations[0].handlerClick = (e: any) => {
    click(e)
  }
  return operationsColumn as IPandoraTableColumn
}
EOF


cat > $DIRNAME/index.vue <<EOF
<template>
  <!-- Page容器  接受一个id  内部计算样式、高度等 支持slot-->
  <PageContainer containerId="${INPUT_NAME}" ref="pageRef">
    <!--form卡槽 嵌入pandoraForm 支持传参 -->
    <template v-slot:form="op">
      <VForm :option="formOptRef" ref="formInstanceRef" :style="op.style"></VForm>
    </template>
    <!--form卡槽 嵌入pandoraTable 支持传参 -->
    <template v-slot:table="op">
      <VTable
        ref="tableInstanceRef"
        :option="tableOptRef"
        :height="op.tableHeight"
        @handleSizePageChange="handleSizePageChange"
        @handleCurrentPageChange="handleCurrentPageChange"
      ></VTable>
    </template>
    <template v-slot:detail>
      <BorderBox title="基本信息">
        <BaseInfo :baseData="detailForm"></BaseInfo>
      </BorderBox>
    </template>
  </PageContainer>
</template>
<script>
import { defineComponent, ref, unref } from '@vue/composition-api'
import { usePandora } from '@/hooks/usePandora'
import { getTableColumns, getTableOperationsColumns, getTableSortOption } from './pandora/tableConfig'
import { getFormItems, getFormSearchParams } from './pandora/formConfig'
import { getDetailAPI } from './api/getDetail'
import BaseInfo from './detail/baseInfo'
import PageContainer from '@/components/Common/PageContainer'
export default defineComponent({
  components: {
    BaseInfo,
    PageContainer
  },
  setup() {
    const pageRef = ref(null)
    // 详情ref
    const detailForm = ref({})
    // 行事件回调
    const rowClick = row => {
      unref(pageRef).dialogVisible = true
      getDetailAPI({ appId: row.appId }).then(resp => {
        detailForm.value = resp.data[0]
      })
    }
    // 取Pandora 表格列配置 []
    const colomns = getTableColumns()
    // 取Pandora 操作列配置 []
    const operationsCols = getTableOperationsColumns(rowClick)
    // 取排序的配置对象
    const tableSort = getTableSortOption()
    colomns.push(operationsCols)
    // 取Pandora Form 查询对象{}
    const formSearchParam = getFormSearchParams()
    // 取Pandora Form 表单项 []
    const formItems = getFormItems()
    /***
     * 请求相关配置参数
     * name: 用于唯一标识 后续为模板提供通用id
     * url: 请求API地址
     */
    const requestConfg = {
      name: '${INPUT_NAME}',
      url: '/${INPUT_NAME}/appList'
    }
    return {
      pageRef,
      detailForm,
      ...usePandora(formSearchParam, formItems, colomns, tableSort, requestConfg)
    }
  }
})
</script>
EOF

