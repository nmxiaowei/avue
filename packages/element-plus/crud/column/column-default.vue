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

import { unref } from 'vue';
import create from "core/create";
import locale from "core/locale";
import config from "../config";
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
  beforeUnmount () {
    this.rowSortable && this.rowSortable.destroy();
    this.rowSortable = null;
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
        this.rowSortable && this.rowSortable.destroy();
        this.rowSortable = null;
        if (flag == false) {
          return
        }
        if (!this.crud.$refs.table?.$el) return
        const el = this.crud.$refs.table.$el.querySelectorAll(this.config.dropRowClass)[0]
        if (!el) return
        this.rowSortable = this.crud.tableDrop('row', el, evt => {
          const oldIndex = evt.oldIndex;
          const newIndex = evt.newIndex;
          if (oldIndex === newIndex || !Number.isInteger(oldIndex) || !Number.isInteger(newIndex) || oldIndex < 0 || newIndex < 0) return
          if (!evt.from || evt.item?.parentNode !== evt.from) return
          // 先还原 Sortable 移动的 DOM，再由 Vue 根据数据更新顺序。
          evt.from.removeChild(evt.item);
          evt.from.insertBefore(evt.item, evt.from.children[oldIndex] || null);
          const list = this.crud.data;
          if (oldIndex >= list.length || newIndex >= list.length) return
          const tableState = this.crud.$refs.table?.store?.states;
          const visibleRows = unref(tableState?.data);
          // 筛选、列排序或展开行后，DOM 行号可能不再对应绑定数组。
          if ((unref(tableState?.sortingColumn) && unref(tableState?.sortOrder)) ||
            evt.from.children.length !== list.length || !Array.isArray(visibleRows) ||
            visibleRows.length !== list.length || visibleRows.some((row, index) => row !== list[index])) return
          const original = list.slice();
          const sorted = list.slice();
          const row = sorted.splice(oldIndex, 1)[0];
          sorted.splice(newIndex, 0, row);
          const sortable = this.rowSortable;
          this.crud.$emit('sortable-change', oldIndex, newIndex, row, sorted)
          this.$nextTick(() => {
            // 等待父组件同步新数组，兼容回调内的替换数组或原地换序。
            if (this.rowSortable !== sortable || this.crud.data !== list) return
            if (list.length === original.length && list.every((item, index) => item === original[index])) {
              list.splice(oldIndex, 1);
              list.splice(newIndex, 0, row);
            }
          })
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
