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
      {{ $index+1 }}
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
    }
  },
  components: {
    tableItemCard
  },
  mixins: [locale],
  inject: ["crud"],
  mounted () {
    this.setSort()
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
    setSort () {
      this.rowDrop()
      this.columnDrop()
    },
    rowDrop () {
      if (!this.crud.$refs.table.$el) return
      const el = this.crud.$refs.table.$el.querySelectorAll(this.config.dropRowClass)[0]
      this.crud.tableDrop('row', el, evt => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;
        const targetRow = this.crud.list.splice(oldIndex, 1)[0]
        this.crud.list.splice(newIndex, 0, targetRow)
        this.crud.$emit('sortable-change', oldIndex, newIndex)
        this.crud.refreshTable(() => this.rowDrop())

      })
    },
    columnDrop () {
      if (!this.crud.$refs.table.$el) return
      const el = this.crud.$refs.table.$el.querySelector(this.config.dropColClass);
      let noIndexCount = 0;
      ['selection', 'index', 'expand'].forEach(ele => {
        if (this.crud.tableOption[ele]) { noIndexCount += 1 }
      })
      this.crud.tableDrop('column', el, evt => {
        this.crud.headerSort(evt.oldIndex - noIndexCount, evt.newIndex - noIndexCount)
        this.columnDrop()
      })
    },
  }
})
</script>