<!--
 * @description border通用组件
 * @author fuping
 * @since 2020/03/19
 * @Props  {type: string} 图标：  line折线图/bar柱图/pie饼图/scatter散点图/relation关系图/heat热力图/map地图/table表格/info列表
 -->
<template>
  <div :class="border.main" :style="bgStyle()" v-if="type != 'search'">
    <div :class="title != '' && title != undefined ? border.title : ''" :style="titleStyle()">
      <div>
        <span :class="[border.icon, imgStyle()]"></span>
        {{ title }}
      </div>
    </div>
    <div :class="title != '' ? border.content : border.noTitle">
      <slot></slot>
    </div>
  </div>
  <div v-else :class="border.searchBox">
    <span :class="border.searchTitle">{{ title }}</span>
    <div :class="border.searchContent">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({})
export default class BorderCon extends Vue {
  @Prop() private title!: string
  @Prop() private type!: string
  @Prop() private bgColor!: string
  @Prop() private titleColor!: string
  private border: any
  /**
   * 计算属性定义
   */
  imgStyle() {
    const name = `i${this.type}`
    return this.border[name]
  }
  /**
   * 背景色
   */
  bgStyle() {
    return {
      background: this.bgColor
    }
  }
  titleStyle() {
    return {
      color: this.titleColor
    }
  }
  mounted() {}
}
</script>

<style module="border">
.main {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.06);
  border-radius: 2px;
  padding: 10px 18px;
  box-sizing: border-box;
}
.title {
  font-size: 18px;
  /* font-family: Trend; */
  color: #333333;
  padding-bottom: 7px;
  margin-bottom: 12px;
  text-align: left;
  border-bottom: 2px solid #ffa200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.title:after {
  content: '';
  position: absolute;
  bottom: -14px;
  left: -1px;
  width: 15px;
  height: 15px;
  background: url('~@/assets/images/online/detailTitle.png') no-repeat center;
}
.icon {
  display: inline-block;
  width: 15px;
  height: 14px;
  margin-right: 5px;
}
.ichart {
  background: url('~@/assets/images/Home/borderTitle.png') no-repeat center;
}
/* .iline {
  background: url('~@/assets/images/border/title_line.png') no-repeat center;
}
.ibar {
  background: url('~@/assets/images/border/title_bar.png') no-repeat center;
}
.iheat {
  background: url('~@/assets/images/border/title_heat.png') no-repeat center;
}
.iinfo {
  background: url('~@/assets/images/border/title_info.png') no-repeat center;
}
.iinfo2 {
  background: url('~@/assets/images/border/title_info2.png') no-repeat center;
}
.imap {
  background: url('~@/assets/images/border/title_map.png') no-repeat center;
}
.ipie {
  background: url('~@/assets/images/border/title_pie.png') no-repeat center;
}
.irelation {
  background: url('~@/assets/images/border/title_relation.png') no-repeat center;
}
.iscatter {
  background: url('~@/assets/images/border/title_scatter.png') no-repeat center;
}
.itable {
  background: url('~@/assets/images/border/title_table.png') no-repeat center;
} */
.content {
  height: calc(100% - 33px);
}
.noTitle {
  height: 100%;
}
.searchBox {
  width: 100%;
  padding-left: 18px;
  height: 36px;
  line-height: 36px;
  background: #fff;
}
.searchTitle {
  font-size: 18px;
  /* color: #2747be;
  padding-left: 30px;
  background: url('~@/assets/images/border/search.png') no-repeat; */
}
.searchContent {
  float: right;
}
.lineStyle {
  flex: auto;
  position: relative;
  margin-left: 20px;
  border-bottom: 1px dashed rgb(33 150 204 / 0.5);
}
.lineStyle::after {
  position: absolute;
  top: -2px;
  right: -8px;
  content: '';
  width: 5px;
  height: 5px;
  background: #28bbff;
  border-radius: 50%;
}
</style>
