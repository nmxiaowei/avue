<template>
  <div>
    <el-table-column width="1px"></el-table-column>
    <!-- 折叠面板  -->
    <el-table-column type="expand"
                     :width="crud.tableOption.expandWidth || config.expandWidth"
                     :fixed="validData(crud.tableOption.expandFixed,config.expandFixed)"
                     align="center"
                     v-if="crud.tableOption.expand">
      <template #="{row}">
        <slot :row="row"
              :index="row.$index"
              name="expand"></slot>
      </template>
    </el-table-column>

    <!-- 选择框 -->
    <el-table-column v-if="crud.tableOption.selection"
                     :fixed="validData(crud.tableOption.selectionFixed,config.selectionFixed)"
                     type="selection"
                     :selectable="crud.tableOption.selectable"
                     :reserve-selection="validData(crud.tableOption.reserveSelection)"
                     :width="crud.tableOption.selectionWidth || config.selectionWidth"
                     align="center"></el-table-column>
    <!-- 序号 -->
    <el-table-column v-if="validData(crud.tableOption.index)"
                     :fixed="validData(crud.tableOption.indexFixed,config.indexFixed)"
                     :label="crud.tableOption.indexLabel || config.indexLabel"
                     type="index"
                     :width="crud.tableOption.indexWidth || config.indexWidth"
                     :index="indexMethod"
                     align="center"></el-table-column>
  </div>
</template>

<script>

import create from "core/create";
import locale from "core/locale";
import packages from "core/packages";
import permission from 'common/directive/permission';
import config from "../config.js";
export default create({
  name: "crud",
  data () {
    return {
      config: config,
    }
  },
  mixins: [locale],
  inject: ["crud"],
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
      // this.columnDrop()
    },
    rowDrop () {
      const el = this.crud.$refs.table.$el.querySelectorAll(this.config.dropRowClass)[0]
      this.crud.tableDrop(el, evt => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;
        const targetRow = this.crud.list.splice(oldIndex, 1)[0]
        this.crud.list.splice(newIndex, 0, targetRow)
        this.crud.$emit('sortable-change', oldIndex, newIndex, targetRow, this.crud.list)
      })
    },
    columnDrop () {
      let el = this.crud.$refs.table.$el.querySelector(this.config.dropColClass);
      let headerLen = el.children.length
      headerLen = headerLen - this.crud.columnOption.length - 2;
      this.crud.tableDrop(el, evt => {
        const oldIndex = evt.oldIndex - headerLen;
        const newIndex = evt.newIndex - headerLen;
        this.crud.headerSort(oldIndex, newIndex)
      })
    },
  }
})
</script>