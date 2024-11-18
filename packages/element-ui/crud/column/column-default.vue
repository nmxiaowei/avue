<template>
  <!-- 折叠面板  -->
  <component :is="crud.tableColumnName"
             v-if="crud.tableOption.expand"
             type="expand"
             :class-name="crud.tableOption.expandClassName"
             :label-class-name="crud.tableOption.expandLabelClassName"
             :width="crud.tableOption.expandWidth || config.expandWidth"
             :fixed="validData(crud.tableOption.expandFixed,config.expandFixed)"
             align="center">
    <template #="{row}">
      <slot :row="row"
            :index="row.$index"
            name="expand"></slot>
    </template>
  </component>

  <!-- 选择框 -->
  <component :is="crud.tableColumnName"
             v-if="crud.tableOption.selection"
             :fixed="validData(crud.tableOption.selectionFixed,config.selectionFixed)"
             type="selection"
             :class-name="crud.tableOption.selectionClassName"
             :label-class-name="crud.tableOption.selectionLabelClassName"
             :selectable="crud.tableOption.selectable"
             :reserve-selection="validData(crud.tableOption.reserveSelection)"
             :width="crud.tableOption.selectionWidth || config.selectionWidth"
             align="center"></component>
  <!-- 序号 -->
  <component :is="crud.tableColumnName"
             v-if="validData(crud.tableOption.index)"
             :fixed="validData(crud.tableOption.indexFixed,config.indexFixed)"
             :label="crud.tableOption.indexLabel || config.indexLabel"
             type="index"
             :class-name="crud.tableOption.indexClassName"
             :label-class-name="crud.tableOption.indexLabelClassName"
             :width="crud.tableOption.indexWidth || config.indexWidth"
             :index="indexMethod"
             align="center">
    <template #="{$index}">
      {{ indexMethod($index)}}
    </template>
  </component>
</template>

<script>

import create from "core/create";
import locale from "core/locale";
import config from "../config.js";
import tableItemCard from '../grid/item'
export default create({
  name: "crud",
  data () {
    return {
      config: config,
      rowSortable: null,
      columnSortable: null,
    }
  },
  components: {
    tableItemCard
  },
  mixins: [locale],
  inject: ["crud"],
  watch: {
    'crud.isSortable' (val) {
      this.rowDrop(val)
      this.columnDrop(val)
    },
    'crud.isRowSort' (val) {
      this.rowDrop(val)
    },
    'crud.isColumnSort' (val) {
      this.columnDrop(val)
    }
  },
  mounted () {
    this.rowDrop()
    this.columnDrop()
  },
  methods: {
    indexMethod (index) {
      return (
        index +
        1 +
        ((this.crud.page.currentPage || 1) - 1) *
        (this.crud.page.pageSize || 10)
      );
    },
    rowDrop (flag) {
      this.$nextTick(() => {
        if (flag == false) {
          this.rowSortable && this.rowSortable.destroy();
          return
        }
        if (!this.crud.$refs.table.$el) return
        const el = this.crud.$refs.table.$el.querySelectorAll(this.config.dropRowClass)[0]
        this.rowSortable = this.crud.tableDrop('row', el, evt => {
          const oldIndex = evt.oldIndex;
          const newIndex = evt.newIndex;
          this.crud.$emit('sortable-change', oldIndex, newIndex)
        })
      })
    },
    columnDrop (flag) {
      this.$nextTick(() => {
        if (flag == false) {
          this.columnSortable && this.columnSortable.destroy();
          return
        }
        if (!this.crud.$refs.table.$el) return
        const el = this.crud.$refs.table.$el.querySelector(this.config.dropColClass);
        let noIndexCount = 0;
        ['selection', 'index', 'expand'].forEach(ele => {
          if (this.crud.tableOption[ele]) { noIndexCount += 1 }
        })
        this.columnSortable = this.crud.tableDrop('column', el, evt => {
          const newIndex = evt.newIndex - noIndexCount
          const oldIndex = evt.oldIndex - noIndexCount
          this.crud.headerSort(oldIndex, newIndex)
          this.crud.$emit('column-sortable-change', oldIndex, newIndex)
        })
      })
    },
  }
})
</script>