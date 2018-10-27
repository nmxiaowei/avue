<template>
  <el-table :data="formatData"
            :class="b()"
            :stripe="option.stripe"
            :row-style="showRow"
            :row-class-name="rowClassName"
            v-bind="$attrs"
            :border="border">
    <el-table-column v-if="columns.length===0"
                     width="150">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level"
              class="ms-tree-space"
              :key="space"></span>
        <span class="tree-ctrl"
              v-if="iconShow(0,scope.row)"
              @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded"
             class="el-icon-plus"></i>
          <i v-else
             class="el-icon-minus"></i>
        </span>
        {{scope.$index}}
      </template>
    </el-table-column>
    <el-table-column v-else
                     v-for="(column, index) in columns"
                     :key="column.value"
                     :label="column.text"
                     :width="column.width">
      <template slot-scope="scope">
        <span v-if="index === 0"
              v-for="space in scope.row._level"
              class="ms-tree-space"
              :key="space"></span>
        <span class="tree-ctrl"
              v-if="iconShow(index,scope.row)"
              @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded"
             class="el-icon-plus"></i>
          <i v-else
             class="el-icon-minus"></i>
        </span>
        {{detail(scope.row,column)}}
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script>
import create from '../../utils/create';
import treeToArray from './eval';
import crud from '../../mixins/crud.js';
import column from '../../mixins/column.js';
export default create({
  name: 'tree-table',
  mixins: [crud(), column()],
  props: {
    option: {
      type: Object,
      required: true
    },
    rowClassName: Function,
    evalFunc: Function,
    evalArgs: Array
  },
  data () {
    return {};
  },
  created () { },
  computed: {
    columnOption () {
      return this.option.columns || [];
    },
    data: function () {
      return this.option.data || [];
    },
    columns: function () {
      return this.option.columns || [];
    },
    expandAll: function () {
      return this.option.expandAll;
    },
    border: function () {
      return this.option.border || true;
    },
    // 格式化数据源
    formatData: function () {
      let tmp;
      if (!Array.isArray(this.data)) {
        tmp = [this.data];
      } else {
        tmp = this.data;
      }
      const func = this.evalFunc || treeToArray;
      const args = this.evalArgs
        ? Array.concat([tmp, this.expandAll], this.evalArgs)
        : [tmp, this.expandAll];
      return func.apply(null, args);
    }
  },
  methods: {
    rulesInit () {

    },
    formInit () {

    },
    showRow: function (row) {
      const show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true;
      row.row._show = show;
      return show
        ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;'
        : 'display:none;';
    },
    // 切换下级是否展开
    toggleExpanded: function (trIndex) {
      const record = this.formatData[trIndex];
      record._expanded = !record._expanded;
    },
    // 图标显示
    iconShow (index, record) {
      return index === 0 && record.children && record.children.length > 0;
    }
  }
});
</script>
