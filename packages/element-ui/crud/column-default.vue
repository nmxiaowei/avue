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
    <!-- 拖动排序  -->
    <el-table-column v-if="tableOption.sortable && tableOption.dragHandler"
                     :width="tableOption.sortableWidth || config.sortableWidth"
                     :fixed="vaildData(tableOption.sortableFixed,config.sortableFixed)"
                     align="center">
      <template slot="header"
                slot-scope="{}">
        <i class="el-icon-sort" />
      </template>
      <template slot-scope="{}">
        <span class="avue-crud__drag-handler">
          <i class="el-icon-rank" />
        </span>
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
  computed: {
    isSortable () {
      return this.tableOption.sortable;
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
      if (this.isSortable) {
        if (!window.Sortable) {
          packages.logs("Sortable")
          return
        }
        this.rowDrop()
        this.columnDrop()
      }
    },
    //行排序
    rowDrop () {
      const el = this.crud.$refs.table.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = window.Sortable.create(el, {
        ghostClass: 'avue-crud__sortable',
        animation: 180,
        delay: 0,
        handle: this.tableOption.dragHandler ? '.avue-crud__drag-handler' : undefined,
        onEnd: evt => {
          const oldindex = evt.oldIndex;
          const newindex = evt.newIndex;
          const targetRow = this.crud.list.splice(oldindex, 1)[0]
          this.crud.list.splice(newindex, 0, targetRow)
          this.crud.$emit('sortable-change', oldindex, newindex, targetRow, this.crud.list)
        }
      })
    },
    //列排序
    columnDrop () {
      let headerLen = this.crud.$refs.table.$el.querySelector('.el-table__header-wrapper tr');
      headerLen = headerLen.children.length
      headerLen = headerLen - this.crud.columnOption.length - 2;
      const wrapperTr = this.crud.$refs.table.$el.querySelector('.el-table__header-wrapper tr');
      window.Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const oldIndex = evt.oldIndex - headerLen;
          const newIndex = evt.newIndex - headerLen;
          this.crud.headerSort(oldIndex, newIndex)
        }
      });
    },
  }
})
</script>