import { ref, onMounted, computed, watch, nextTick, unref } from '@vue/composition-api'
/**
 * 通用容器类 样式style 处理
 */
export const useContainerStyle = () => {
  const formBox = ref<HTMLDivElement>()
  const tableHeight = ref('calc(100% - 35px)')
  const tableBoxHeight = ref('300')
  const formBoxHeight = ref<number>(40)

  const formStyleComputed = computed(() => {
    return { height: formBoxHeight.value }
  })
  const tableStyleComputed = computed(() => {
    return { height: tableBoxHeight.value }
  })
  const formStyleChange = () => {
    nextTick(() => {
      formBoxHeight.value = (unref(formBox) as HTMLDivElement).offsetHeight + 15
      tableBoxHeight.value = `calc(100% - ${formBoxHeight.value}px)`
    })
  }
  watch(tableBoxHeight, (nl, ol) => {
    formStyleChange()
  })

  onMounted(() => {
    formStyleChange()
  })
  return {
    formBox,
    tableHeight,
    tableBoxHeight,
    formBoxHeight,
    formStyleComputed,
    tableStyleComputed,
    formStyleChange
  }
}
