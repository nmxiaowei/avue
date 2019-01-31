<template>
  <el-table :data="list"
            :class="b()"
            @row-click="rowClick"
            @row-dblclick="rowDblclick"
            @current-change="currentRowChange"
            :stripe="option.stripe"
            :highlight-current-row="parentOption.highlightCurrentRow"
            :size="controlSize"
            :width="setPx(parentOption.width,'100%')"
            v-loading="tableLoading"
            :row-style="showRow"
            :row-class-name="rowClassName"
            :border="parentOption.border"
            :default-sort="parentOption.defaultSort"
            @sort-change="sortChange">
    <!-- 序号 -->
    <el-table-column v-if="parentOption.index"
                     :label="parentOption.indexLabel || '序号'"
                     type="index"
                     width="50"
                     fixed="left"
                     align="center"></el-table-column>
    <el-table-column v-for="(column, index) in columnOption"
                     :key="column.prop"
                     :sortable="column.sortable"
                     :show-overflow-tooltip="column.overHidden"
                     :align="column.align || parentOption.align"
                     :header-align="column.headerAlign || parentOption.headerAlign"
                     :label="column.label"
                     :width="column.width">
      <template slot-scope="scope">
        <span v-if="index === 0"
              v-for="space in scope.row._level"
              class="ms-tree-space"
              :key="space"></span>
        <span class="tree-ctrl"
              v-if="iconShow(index,scope.row)"
              @click="toggleExpanded(scope.row,scope.$index)">
          <i v-if="!scope.row._expanded"
             class="el-icon-plus"></i>
          <i v-else
             class="el-icon-minus"></i>
        </span>
        <slot :row="scope.row"
              :dic="DIC[column.prop]"
              :size="isMediumSize"
              :label="scope.row['$'+column.prop]"
              :name="column.prop"
              v-if="column.slot && index!==0"></slot>
        <span v-else
              class="ms-tree-title">{{handleDetail(scope.row,column,DIC[column.prop])}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作"
                     fixed="right"
                     v-if="vaildData(tableOption.menu,true)"
                     :width="isMobile?80:( tableOption.menuWidth || '200')"
                     :align="tableOption.menuAlign || 'center'"
                     :header-align="tableOption.menuheaderAlign">
      <template slot-scope="scope">
        <slot name="menu"
              :row="scope.row"
              :size="isMediumSize"
              :index="scope.$index"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import create from "core/create";
import init from "../../core/crud/init.js";
import treeToArray from "./eval";
export default create({
  name: "tree-table",
  mixins: [init()],
  props: {
    tableLoading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
      required: true
    },
    rowClassName: Function,
    evalFunc: Function,
    evalArgs: Array
  },
  data() {
    return {
      list: []
    };
  },
  watch: {
    data: {
      handler() {
        this.formatData();
      },
      immediate: true
    }
  },
  created() {
    //初始化字典
    this.handleLoadDic(this.tableOption);
  },
  computed: {
    parentOption() {
      return this.tableOption || [];
    },
    columnOption() {
      return this.option.column || [];
    },
    expandLevel() {
      return this.option.expandLevel;
    },
    expandAll() {
      return this.option.expandAll;
    },
    border() {
      return this.option.border || true;
    }
  },
  methods: {
    // 格式化数据源
    formatData() {
      let tmp = Array.isArray(this.data) ? this.data : [this.data];
      const func = this.evalFunc || treeToArray;
      const args = this.evalArgs
        ? Array.concat([this.expandLevel, tmp, this.expandAll], this.evalArgs)
        : [this.expandLevel, tmp, this.expandAll];
      this.list = [...func.apply(null, args)];
    },
    handleDetail(row, column, DIC) {
      if (!this.validatenull(DIC)) {
        const result = this.detail(row, column, this.tableOption, DIC);
        row["$" + column.prop] = result;
        return result;
      }
      return row[column.prop];
    },
    showRow(row) {
      const index = row.rowIndex;
      const show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true;
      row.row._show = show;
      return show
        ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
        : "display:none;";
    },
    // 切换下级是否展开
    toggleExpanded(row, index) {
      row._expanded = !row._expanded;
      this.$set(this.list, index, row);
    },
    // 图标显示
    iconShow(index, record) {
      return index === 0 && record.children && record.children.length > 0;
    },
    // 行双击
    rowDblclick(row, event) {
      this.$emit("row-dblclick", row, event);
    },
    // 行单机
    rowClick(row, event, column) {
      this.$emit("row-click", row, event, column);
    },
    // 排序回调
    sortChange(val) {
      this.$emit("sort-change", val);
    },
    //设置单选
    currentRowChange(val) {
      this.$emit("current-row-change", val);
    }
  }
});
</script>