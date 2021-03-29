// eslint-disable-next-line
/* eslint-disable*/

import bezierEasing from 'bezier-easing'

//   滚动监听组件

let nodeList = []
let scrollDom = document.querySelector('html')
let container = ''
const cubicBezierArray = [0.5, 0, 0.35, 1]
const duration = 600
let scrollAnimationFrame = null
const handleScroll = function() {
  const scrollTop = getScrollTop(scrollDom)
  let result = null

  nodeList.forEach(item => {
    if (getOppositeOffsetToContainer(item.el) - item.offset <= scrollTop) {
      result = item
    }
  })
  dealResult(result)
}
const getScrollTop = function(el) {
  if (container) return el.scrollTop
  const scrollTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop
  return scrollTop
}
const getOppositeOffsetToContainer = function(el) {
  return getOffsetTopByEl(el) - getOffsetTopByEl(scrollDom)
}
const getOffsetTopByEl = function(element) {
  let yPosition = 0
  let nextElement = element

  while (nextElement) {
    yPosition += nextElement.offsetTop
    nextElement = nextElement.offsetParent
  }
  return yPosition
}
const dealResult = function(result) {
  if (result && result.callback) result.callback(result)
}
const scrollTo = function(name) {
  // target node
  const node = nodeList.find(v => v.name == name)
  const startingY = getScrollTop(scrollDom)
  const difference = getOppositeOffsetToContainer(node.el) - startingY
  const easing = bezierEasing(...cubicBezierArray)
  let start = null
  const step = timestamp => {
    if (!start) start = timestamp
    const progress = timestamp - start >= duration ? duration : timestamp - start
    const progressPercentage = progress / duration
    const perTick = startingY + easing(progressPercentage) * (difference - node.offset)

    moveTo(perTick)
    if (progress < duration) {
      scrollAnimationFrame = window.requestAnimationFrame(step)
    } else {
      // 点击最后的点触发
      dealResult(node)
    }
  }
  window.requestAnimationFrame(step)
}
const moveTo = function(scrollTop) {
  if (container) {
    if (scrollDom.scrollTo) {
      scrollDom.scrollTo(0, scrollTop)
    } else {
      scrollDom.scrollTop = scrollTop
    }
    // return;
  }
  document.documentElement.scrollTop = scrollTop
  document.body.scrollTop = scrollTop
}
const setContainer = function(dom) {
  container = dom
}

const vueScrollwatch = {}
vueScrollwatch.install = function(Vue) {
  Vue.directive('scrollWatch', {
    inserted: function(el, binding, vnode) {
      if (container) scrollDom = document.querySelector(container)
      const containerDom = container ? scrollDom : window
      if (!containerDom) {
        console.error(`[vue-scrollwatch] Element '${container}' was not found. `)
        return
      }

      if (nodeList.length == 0) {
        containerDom.addEventListener('scroll', handleScroll)
      } else {
      }
      const { name, offset = 0, callback } = binding.value
      nodeList.push({ name, offset, top: el.offsetTop - offset, el, callback })
      nodeList.sort((a, b) => a.top - b.top)
    },

    unbind: function(el, binding, vnode) {
      const containerDom = container ? scrollDom : window

      nodeList = nodeList.filter(node => node.name != binding.value.name)
      if (nodeList.length == 0 && scrollDom) {
        containerDom.removeEventListener('scroll', handleScroll)
        container = ''
      }

      // 如果正在动画，则停止
      cancelAnimationFrame(scrollAnimationFrame)
    }
  })
}

vueScrollwatch.scrollTo = scrollTo
vueScrollwatch.setContainer = setContainer
export default vueScrollwatch
