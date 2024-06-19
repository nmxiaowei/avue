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
        <el-col v-for="(row,index) in data"
                @click.stop="handleRowClick(row,index)"
                @dblclick.stop="handleRowDblClick(row,index)"
                :span="crud.tableOption.gridSpan || span"
                :md="crud.tableOption.gridSpan|| span"
                :sm="crud.tableOption.gridSpan|| span"
                :xs="crud.tableOption.gridXsSpan|| xsSpan"
                :class="getRowClass(row,index)"
                :key="index">
          <div :class="b('content')"
               :style="[getGradientColor(row,index),getRowStyle(row,index)]">
            <div v-for="(item,columnIndex) in column"
                 :class="[b('item'),(item.type || item.prop),getClass(row,index,item)]"
                 :style="getCellStyle(row,index,item,columnIndex)"
                 @click="handleCellClick(row,item)"
                 @dblclick="handleCellDblClick(row,item)"
                 :key="columnIndex">
              <span v-if="item.type=='selection'">
                <el-checkbox :label="index">&nbsp;</el-checkbox>
              </span>
              <template v-else>
                <row-item :content="item.header"
                          :row="row"
                          :column="item"
                          :index="index"
                          :class="[b('label'),item.labelClassName]"></row-item>
                <row-item :content="item.default"
                          :row="row"
                          :column="item"
                          :index="index"
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
    doLayout () {

    },
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
    getGradientColor (row, index) {
      let styles = {}
      if (typeof this.crud.tableOption.gridBackground == 'function') {
        styles.background = this.crud.tableOption.gridBackground(row, index)
      } else if (this.crud.tableOption.gridBackgroundImage) {
        styles.backgroundImage = `url(${this.crud.tableOption.gridBackgroundImage})`
      } else {
        styles.background = this.crud.tableOption.gridBackground || 'linear-gradient(to bottom, rgba(88, 159, 248, 0.1), white)'
      }
      return styles
    },
    getCellStyle (row, index, column, columnIndex) {
      if (this.cellStyle) return this.cellStyle({ row, rowIndex: index, column, columnIndex })
    },
    getRowStyle (row, index) {
      if (this.rowStyle) return this.rowStyle({ row, rowIndex: index })
    },
    getRowClass (row, index) {
      if (this.rowClassName) return this.rowClassName({ row, rowIndex: index });
    },
    getClass (row, index, column) {
      let list = []
      const columnOption = this.crud.columnOption || []
      if (this.cellClassName) list.push(this.cellClassName({ row, rowIndex: index, column }))
      if (column.prop == (columnOption[0] || {}).prop) list.push('title')
      if (column.row) list.push('row')
      if (column.showOverflowTooltip) list.push('overHidden')
      return list;
    }
  }
})
</script>

<style>
</style>