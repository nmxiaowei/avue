<template>
  <div :class="b()">
    <div :class="b('hide')">
      <slot></slot>
    </div>
    <el-row v-if="data.length!==0">
      <el-col v-for="(c,p) in data"
              :span="crud.tableOption.gridSpan || span"
              :md="crud.tableOption.gridSpan|| span"
              :sm="crud.tableOption.gridSpan|| span"
              :xs="crud.tableOption.gridXsSpan|| xsSpan"
              :key="p">
        <div :class="b('content')"
             :style="getGradientColor()">
          <div v-for="(item,index) in column"
               :class="[b('item'),(item.type || item.prop),getClass(item)]"
               :key="index">
            <row-item :content="item.header"
                      :row="c"
                      :index="p"
                      :class="[b('label'),item.labelClassName]"></row-item>
            <row-item :content="item.default"
                      :row="c"
                      :index="p"
                      :class="[b('value'),item.className]"></row-item>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-empty v-else
              :image-size="100"
              :description="crud.tableOption.emptyText || t('crud.emptyText')"></el-empty>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
import rowItem from './row';
export default create({
  name: 'crud__grid',
  inject: ["crud"],
  mixins: [locale],
  components: {
    rowItem
  },
  props: {
    data: Array
  },
  data () {
    return {
      span: 8,
      xsSpan: 12,
      id: 'crud-grid',
      column: []
    }
  },
  methods: {
    getGradientColor () {
      let styles = {}
      if (this.crud.tableOption.gridBackgroundImage) {
        styles.backgroundImage = `url(${this.crud.tableOption.gridBackgroundImage})`
      } else {
        styles.background = this.crud.tableOption.gridBackground || 'linear-gradient(to bottom, rgba(88, 159, 248, 0.1), white)'
      }
      return styles
    },
    getClass (item) {
      let list = []
      const columnOption = this.crud.columnOption || []
      if (item.prop == (columnOption[0] || {}).prop) list.push('title')
      if (item.row) list.push('row')
      if (item.showOverflowTooltip) list.push('overHidden')
      return list;
    }
  }
})
</script>

<style>
</style>