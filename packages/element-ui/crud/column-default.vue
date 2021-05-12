<template>
  <div>
    <el-table-column width="1px"></el-table-column>
    <!-- 折叠面板  -->
    <el-table-column type="expand"
                     :width="tableOption.expandWidth || config.expandWidth"
                     :fixed="vaildData(tableOption.expandFixed,config.expandFixed)"
                     align="center"
                     v-if="tableOption.expand">
      <template slot-scope="{row}">
        <slot :row="row"
              :index="row.$index"
              name="expand"></slot>
      </template>
    </el-table-column>

    <!-- 选择框 -->
    <el-table-column v-if="tableOption.selection"
                     :fixed="vaildData(tableOption.selectionFixed,config.selectionFixed)"
                     type="selection"
                     :selectable="tableOption.selectable"
                     :reserve-selection="vaildData(tableOption.reserveSelection)"
                     :width="tableOption.selectionWidth || config.selectionWidth"
                     align="center"></el-table-column>
    <!-- 序号 -->
    <el-table-column v-if="vaildData(tableOption.index)"
                     :fixed="vaildData(tableOption.indexFixed,config.indexFixed)"
                     :label="tableOption.indexLabel || config.indexLabel"
                     type="index"
                     :width="tableOption.indexWidth || config.indexWidth"
                     :index="indexMethod"
                     align="center"></el-table-column>
  </div>
</template>

<script>

import create from "core/create";
import config from "./config.js";
import packages from "core/packages";
import locale from "../../core/common/locale";
import permission from '../../core/directive/permission';
export default create({
  name: "crud",
  data () {
    return {
      config: config,
    }
  },
  mixins: [locale],
  inject: ["crud"],
  props: {
    tableOption: {
      type: Object,
      default: () => {
        return {};
      }
    }
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