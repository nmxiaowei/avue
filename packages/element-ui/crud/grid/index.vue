<template>
  <div :class="b()"
       :style="styleName">
    <div :class="b('hide')">
      <slot></slot>
    </div>
    <el-checkbox-group v-if="data.length!==0"
                       v-model="checkList"
                       @change="checkListChange">
      <el-row>
        <el-col v-for="(c,p) in data"
                @click.stop="handleRowClick(c,column)"
                @dblclick.stop="handleRowDblClick(c,column)"
                :span="crud.tableOption.gridSpan || span"
                :md="crud.tableOption.gridSpan|| span"
                :sm="crud.tableOption.gridSpan|| span"
                :xs="crud.tableOption.gridXsSpan|| xsSpan"
                :class="getRowClass(c,column)"
                :key="p">
          <div :class="b('content')"
               :style="getGradientColor()">
            <div v-for="(item,index) in column"
                 :class="[b('item'),(item.type || item.prop),getClass(item)]"
                 @click="handleCellClick(c,item)"
                 @dblclick="handleCellDblClick(c,item)"
                 :key="index">
              <span v-if="item.type=='selection'">
                <el-checkbox :label="p">&nbsp;</el-checkbox>
              </span>
              <template v-else>
                <row-item :content="item.header"
                          :row="c"
                          :column="item"
                          :index="p"
                          :class="[b('label'),item.labelClassName]"></row-item>
                <row-item :content="item.default"
                          :row="c"
                          :column="item"
                          :index="p"
                          :class="[b('value'),item.className]"></row-item>
              </template>
            </div>
          </div>
        </el-col>

      </el-row>
    </el-checkbox-group>
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
    cellClassName: Function,
    rowClassName: Function,
    height: [String, Number],
    data: Array
  },
  data () {
    return {
      checkList: [],
      span: 8,
      xsSpan: 12,
      id: 'crud-grid',
      column: []
    }
  },
  computed: {
    styleName () {
      return {
        height: this.crud.tableHeight + 'px'
      }
    }
  },
  methods: {
    clearSelection () {
      this.checkList = []
      this.checkListChange(this.checkList)
    },
    toggleAllSelection () {
      if (this.checkList.length === this.crud.data.length) {
        this.checkList = []
      } else {
        this.checkList = this.crud.data.map((ele, index) => index)
      }
      this.checkListChange(this.checkList)
    },
    toggleRowSelection (data, selected) {
      let index = this.crud.data.findIndex(ele => JSON.stringify(ele) == JSON.stringify(data))
      if (selected && index != -1) {
        this.checkList.push(index)
      } else {
        let checkIndex = this.checkList.findIndex(ele => ele == index);
        this.checkList.splice(checkIndex, 1)
      }
      this.checkListChange(this.checkList)
    },
    checkListChange (val) {
      let result = [];
      const data = this.crud.data
      val.forEach(ele => {
        result.push(data[ele])
      });
      this.$emit('selection-change', result)
    },
    handleRowDblClick (row, index) {
      this.$emit('row-dblclick', row, index)
    },
    handleRowClick (row, index) {
      this.$emit('row-click', row, index)
    },
    handleCellDblClick (row, column) {
      this.$emit('cell-dblclick', row, column)
    },
    handleCellClick (row, column) {
      this.$emit('cell-click', row, column)
    },
    getGradientColor () {
      let styles = {}
      if (this.crud.tableOption.gridBackgroundImage) {
        styles.backgroundImage = `url(${this.crud.tableOption.gridBackgroundImage})`
      } else {
        styles.background = this.crud.tableOption.gridBackground || 'linear-gradient(to bottom, rgba(88, 159, 248, 0.1), white)'
      }
      return styles
    },
    getRowClass (row, column) {
      let list = []
      if (this.rowClassName) list.push(this.rowClassName(row, column))
      return list;
    },
    getClass (item) {
      let list = []
      const columnOption = this.crud.columnOption || []
      if (this.cellClassName) list.push(this.cellClassName(item, column))
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