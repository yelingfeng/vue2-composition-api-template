import { useTimeoutFn } from '@/hooks/core/useTimeout'
import { unref, Ref, nextTick, onUnmounted } from '@vue/composition-api'
import { EChartsOption } from 'echarts'
import { useDebounce } from '@/hooks/core/useDebounce'
import { useEventListener } from '@/hooks/event/useEventListener'
import { useBreakpoint } from '@/hooks/event/useBreakpoint'

import echarts from '@/plugins/echarts'

export function useECharts(elRef: Ref<HTMLDivElement>, theme: 'light' | 'dark' | 'default' = 'light') {
  let chartInstance: echarts.ECharts | null = null
  let resizeFn: Fn = resize
  let removeResizeFn: Fn = () => {}

  const [debounceResize] = useDebounce(resize, 200)
  resizeFn = debounceResize

  function initCharts() {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }

    chartInstance = echarts.init(el, theme)
    console.log(chartInstance)
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn
    })
    removeResizeFn = removeEvent
    const { widthRef, screenEnum } = useBreakpoint()
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn()
      }, 30)
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(options)
      }, 30)
      return
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts()

          if (!chartInstance) return
        }
        clear && chartInstance?.clear()

        chartInstance?.setOption(options)
      }, 30)
    })
  }

  function resize() {
    chartInstance?.resize()
  }

  onUnmounted(() => {
    if (!chartInstance) return
    removeResizeFn()
    chartInstance.dispose()
    chartInstance = null
  })

  function getPosByGeo(geo: any) {
    return chartInstance?.convertToPixel('geo', geo)
  }

  return {
    setOptions,
    resize,
    getPosByGeo,
    chartInstance,
    echarts
  }
}
