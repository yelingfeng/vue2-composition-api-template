<!--
 * @Description: 
 * @Autor: niumiaomiao
 * @Date: 2020-05-28 10:25:44
 * @LastEditors: niumiaomiao
 * @LastEditTime: 2020-05-28 10:37:06
-->
<script>
export default {
  data() {
    return {
      numAte: {
        scale: 0, // 动画进度
        name: {}, // 动画实例对象
        oldNum: 0,
        diff: this.renderData
      },
      changeNum: 0
    }
  },
  props: {
    time: {
      type: Number,
      default: 2
    },
    renderData: null
  },
  mounted() {
    this.numberAnimates()
  },
  watch: {
    renderData(newVal, oldVal) {
      this.numAte.oldNum = Number(oldVal)
      this.numAte.diff = newVal - oldVal
      this.numberAnimates()
    }
  },
  methods: {
    numberAnimates() {
      if (this.numAte.name.kill) {
        this.numAte.name.kill(null, this.numAte)
      }
      this.numAte.scale = 0
      this.numAte.name = window.TweenMax.to(this.numAte, this.time, {
        scale: 1,
        onUpdate: this.onUpdates
      })
    },
    onUpdates() {
      this.changeNum = Math.round(this.numAte.oldNum + this.numAte.diff * this.numAte.scale).toLocaleString()
    }
  },
  render(h) {
    return <span>{this.changeNum}</span>
  }
}
</script>
